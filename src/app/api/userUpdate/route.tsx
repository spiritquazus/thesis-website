import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
      const { id, startTime, endTime, email } = await req.json();
      const pool = createPool();
      const client = await pool.connect();

      if (email!=null) {
          // Update email if present
          await client.query(
              'UPDATE survey_users SET email = $1 WHERE id = $2',
              [email, id]
          );
      }

      if (endTime && startTime) {
          // Update total_time and end_time if both are present
          const totalTime = Math.round((endTime - startTime) / 1000);
          await client.query(
              'UPDATE survey_users SET total_time = $1, end_time = $2 WHERE id = $3',
              [totalTime, endTime, id]
          );
      }

      client.release();
      return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ message: 'Database update failed', error }, { status: 500 });
  }
}


