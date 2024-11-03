"use client"
import styles from "../page.module.css";
import "./style.css"

export default function ThankYou(){

    return (
        <div className={styles.page}>
            <div>
                <h1>Thank you.</h1>
                <br/>
                <p>This is the end of the experiment.</p>
                <br/>
                <p>Thank you dearly for your time and contribution!</p>
            </div>
            <div className="dxmSpecial">
                <p>Website by DXM</p>
                <a href="https://github.com/spiritquazus">https://github.com/spiritquazus</a>
                <br/>
                <p>Powered by Next.js</p>
            </div>
        </div>
        
    )
}