import {Seed} from "../lib/fetch"


export default async function SeedPage() {
    try {
      await Seed()
      return (
        <div>
          <h1>Database Generated!</h1>
          <p>The tables have been created in the database. Moving on</p>
        </div>
      )
    } catch (error: unknown) {
        console.error('Error seeding the database:', error)
    
        let errorMessage = 'Unknown error occurred'
        if (error instanceof Error) {
          errorMessage = error.message
        }
    
        return (
          <div>
            <h1>Error</h1>
            <p>There was an error creating the tables: {errorMessage}</p>
          </div>
        )
      }
    }