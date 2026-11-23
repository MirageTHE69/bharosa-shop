import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';

export const dynamic = 'force-dynamic';

// Uptime check for monitors (e.g. UptimeRobot): 200 when the database answers
// a ping, 503 otherwise. Never exposes connection details.
export async function GET() {
  const started = Date.now();
  try {
    const conn = await connectDB();
    if (!conn?.connection.db) throw new Error('No database connection');
    await conn.connection.db.admin().ping();

    return NextResponse.json(
      { status: 'ok', database: 'up', latencyMs: Date.now() - started, checkedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('Health check failed:', err);
    return NextResponse.json(
      { status: 'error', database: 'down', latencyMs: Date.now() - started, checkedAt: new Date().toISOString() },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
