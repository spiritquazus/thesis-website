

require('dotenv').config(); // Add this at the top of the file

const connectionString = process.env.POSTGRES_URL;
import { db } from '@vercel/postgres';
import {CreateUserParams,UpdateUserParams,createSurveyParams} from '../types'

const client = await db.connect();
console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
console.log({
      POSTGRES_URL: process.env.POSTGRES_URL,
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
    });
/* 
export async function createUser({
    id,
    access,
    product,
    startTime,
    endTime
}: CreateUserParams): Promise<void> {
    if (!endTime) endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    await client.sql`
        INSERT INTO survey_users (id, access, product, start_time, end_time, total_time)
        VALUES (${id}, ${access}, ${product}, ${startTime}, ${endTime}, ${totalTime})
    `;
}

export async function updateUser({
    id,
    endTime,
    email,
    startTime
}: UpdateUserParams): Promise<void> {
    if (endTime && startTime) {
        const totalTime = (endTime - startTime) / 1000;
        await client.sql`
            UPDATE survey_users 
            SET end_time = ${endTime}, total_time = ${totalTime}
            WHERE id = ${id}
        `;
    }
    if (email) {
        await client.sql`
            UPDATE survey_users 
            SET email = ${email}
            WHERE id = ${id}
        `;
    }
}

export async function completeSurvey({
    userId,
    questions,
}: createSurveyParams): Promise<void> {
    if (questions.length !== 10) {
        throw new Error('Some questions were unanswered. polluted sample')
    }

    await client.sql`
        UPDATE survey
        SET 
            question1 = ${questions[0]},
            question2 = ${questions[1]},
            question3 = ${questions[2]},
            question4 = ${questions[3]},
            question5 = ${questions[4]},
            question6 = ${questions[5]},
            question7 = ${questions[6]},
            question8 = ${questions[7]},
            question9 = ${questions[8]},
            question10 = ${questions[9]}
        WHERE user_id = ${userId}
    `
}
 */
export async function HardReset(){
    await client.sql`
    DROP TABLE survey`
    await client.sql`
    DROP TABLE survey_users`
}

export async function Seed(){


    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS survey_users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT UNIQUE,
            access TEXT NOT NULL,
            product TEXT NOT NULL,
            start_time BIGINT NOT NULL,
            end_time BIGINT NOT NULL,
            total_time BIGINT NOT NULL
        )
    `
    await client.sql`
        CREATE TABLE IF NOT EXISTS survey (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            question1 INTEGER,
            question2 INTEGER,
            question3 INTEGER,
            question4 INTEGER,
            question5 INTEGER,
            question6 INTEGER,
            question7 INTEGER,
            question8 INTEGER,
            question9 INTEGER,
            question10 INTEGER
        )
    `

}

