import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

const pool = createPool();

export async function GET() {
  try {
    // Fetch data from both `survey_users` and `survey` tables
    const usersQuery = await pool.query('SELECT * FROM survey_users');
    const surveysQuery = await pool.query('SELECT * FROM survey');

    const users = usersQuery.rows;
    const surveys = surveysQuery.rows;

    // Combine the data from both tables (flattening survey fields)
    const combinedData = users.map((user) => {
      const survey = surveys.find((survey) => survey.user_id === user.id) || {};
      return {
        ...user,
        ...survey, // Flatten survey data into the main user object
      };
    });

    // Generate CSV header row
    const headers = Object.keys(combinedData[0]);
    const csvContent = [
      headers.join(','), // Add headers to CSV
      ...combinedData.map((row) =>
        headers.map((header) => JSON.stringify(row[header] || '')).join(',')
      ),
    ].join('\n');

    // Set headers and return CSV content
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="survey_data.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data.' },
      { status: 500 }
    );
  }
}
