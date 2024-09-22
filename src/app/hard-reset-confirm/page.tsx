import {HardReset} from "../lib/fetch"




export default async function Reset() {
    try {
        await HardReset()
        return (
        <div>
            <h1>Database Destroyed!</h1>
            <p>The tables have been removing from the database. Moving on</p>
        </div>
        )
    } catch (error: unknown) {
        console.error('Error modifying the database:', error)
    
        let errorMessage = 'Unknown error occurred'
        if (error instanceof Error) {
            errorMessage = error.message
        }
    
        return (
            <div>
            <h1>Error</h1>
            <p>There was an error removing the tables: {errorMessage}</p>
            </div>
        )
        }
    }