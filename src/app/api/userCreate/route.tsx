import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

export async function POST(req: Request) {
    try {
        const { id, name, access, product, startTime, endTime, totalTime} = await req.json();
        const pool = createPool()
        const client = await pool.connect()

        //🚧stuff
        await client.query(
            `INSERT INTO survey_users (id, name, access, product, start_time, end_time, total_time)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id, name, access, product, startTime, endTime, totalTime]
        );

        client.release()
        return NextResponse.json({ message: 'User created successfully' })
    } catch (error) {
        console.error('Error creating a new user:', error);
        return NextResponse.json({ message: 'Database update failed', error }, { status: 500 })
    }
}
  
