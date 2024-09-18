import {HardReset} from "../lib/fetch"


export default async function Reset() {
    
    
    async function handleClick(){
        try {
                await HardReset()
            } catch (error: unknown) {
                console.error('Error seeding the database:', error)
            }
    }

    return (
        <>
            <h1>Are you certain you wish to drop the entirety of the database for this website?</h1>
            <br/><br/><br/>
            <button onClick={handleClick}>Confirm</button>
        </>
    )
    }