import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';


export async function POST(req: Request) {
    try {
        const { userId, questions,} = await req.json();
        const pool = createPool()
        const client = await pool.connect()

        //🚧stuff
        await client.query(`
            INSERT INTO survey 
                (user_id, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [userId, questions[0], questions[1], questions[2], questions[3], questions[4], questions[5], questions[6], questions[7], questions[8], questions[9], questions[10]]
        )

        client.release()
        return NextResponse.json({ message: 'User for survey successfully' })
    } catch (error) {
        console.error('Error creating a new user:', error);
        return NextResponse.json({ message: 'Survey Database update failed', error }, { status: 500 })
    }
}
  