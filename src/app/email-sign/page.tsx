
import styles from "../page.module.css";

export default function EmailSign() {

    return(
        <div className={styles.page}>
            <h3>Thank you for your interest!</h3>
            <p>Please submit your email before proceeding to the last stage of this exercise.</p>
            <form>
                <input type="email" placeholder="honggildong@naver.co.kr" required/>
                <button type="submit">Submit Email</button>
            </form>
        </div>
    )
}