import {HardReset} from "../lib/fetch"


export default async function Reset() {
    try {
            await HardReset()
            return (
                <>
                    <h1 style={{color:"red"}}>You dropped the tables!</h1>
                </>
            )
        } catch (error: unknown) {
            console.error('Error seeding the database:', error)
        }
    }