"use client"
import styles from "../page.module.css";
import "./style.css"

export default function ThankYou(){

    return (
        <div className={styles.page}>
            <h1>감사합니다.</h1>
            <br/>
            <p>본 설문 조사에 참여해주셔서 감사합니다.</p>
            <br/>
            <p>좋은 하루 되세요.</p>

            <div className="dxmSpecial">
                <p>Website by DXM</p>
                <a href="https://github.com/spiritquazus">https://github.com/spiritquazus</a>
                <br/>
                <p>Powered by Next.js</p>
            </div>
        </div>
        
    )
}