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

export async function connectDB(): Promise<typeof mongoose | null> {
  if (cache.conn) return cache.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI is not set. Add it in Vercel / .env.local to enable database.');
    return null;
  }

  try {
    if (!cache.promise) {
      cache.promise = mongoose.connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      });
    }

    cache.conn = await cache.promise;
    return cache.conn;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    cache.promise = null;
    return null;
  }
}
