import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';


export async function POST(req: Request) {
    try {
        const { userId, questions } = await req.json();
        const pool = createPool();
        const client = await pool.connect();

        // Check if a survey for this user already exists
        const existingSurvey = await client.query('SELECT * FROM survey WHERE user_id = $1', [userId]);
        
        if (existingSurvey.rows.length > 0) {
            // Update the existing survey
            await client.query(`
                UPDATE survey
                SET question1 = $1, question2 = $2, question3 = $3, question4 = $4, 
                    question5 = $5, question6 = $6, question7 = $7, 
                    question8 = $8, question9 = $9, question10 = $10, question11 = $11
                WHERE user_id = $12`,
                [...questions, userId]
            );
            return NextResponse.json({ message: 'Survey updated successfully.' });
        } else {
            // Insert the new survey
            await client.query(`
                INSERT INTO survey 
                    (user_id, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [userId, ...questions]
            );
            return NextResponse.json({ message: 'Survey submitted successfully.' });
        }

        client.release();
    } catch (error) {
        console.error('Error processing survey:', error);
        return NextResponse.json({ message: 'Survey Database update failed', error }, { status: 500 });
    }
}
  