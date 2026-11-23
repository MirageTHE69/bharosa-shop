import mongoose from 'mongoose';

// Standard Next.js + Mongoose pattern: cache the connection on the global
// object so hot-reload in dev doesn't open a new connection on every request.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

// Thrown when MONGODB_URI is set but the cluster can't be reached. Public data
// readers rethrow it so pages show the (shop) error screen with a retry button
// instead of silently rendering "no products".
export class DatabaseUnavailableError extends Error {
  constructor(cause: unknown) {
    super('Database is temporarily unavailable', { cause });
    this.name = 'DatabaseUnavailableError';
  }
}

export function rethrowIfDatabaseDown(err: unknown): void {
  if (err instanceof DatabaseUnavailableError) throw err;
}

// Serverless cold starts can take several seconds to reach Atlas, so allow a
// generous selection timeout and retry once before giving up.
const CONNECT_OPTIONS = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 12000,
  connectTimeoutMS: 12000,
  maxPoolSize: 10,
};
const MAX_ATTEMPTS = 2;

export async function connectDB(): Promise<typeof mongoose | null> {
  if (cache.conn) return cache.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI is not set. Add it in Vercel / .env.local to enable database.');
    return null;
  }

  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      if (!cache.promise) {
        cache.promise = mongoose.connect(uri, CONNECT_OPTIONS);
      }
      cache.conn = await cache.promise;
      return cache.conn;
    } catch (err) {
      lastError = err;
      cache.promise = null;
      cache.conn = null;
      console.error(`Failed to connect to MongoDB (attempt ${attempt}/${MAX_ATTEMPTS}):`, err);
    }
  }

  throw new DatabaseUnavailableError(lastError);
}
