
"use client"
import styles from "../page.module.css";
import "./style.css"
import {useState, useRef} from "react"
import { useRouter } from 'next/navigation';
import { userUpdate } from "../requests"

export default function EmailSign() {
    const [msg, setMsg] = useState<string | null>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    
        const userEmail = emailRef.current?.value;
    
        if (!userEmail?.includes("@") || userEmail.length < 4) {
            setMsg("Email format is incorrect.")
        } else {
            try {
                const jsonString = localStorage.getItem('thesisBottle');
                const id = jsonString ? JSON.parse(jsonString).id : undefined;
                if (id == undefined) {
                    setMsg("Email add failed due to unchecked ID. Please restart the website..");
                    return
                }
                const response = await userUpdate({ id: id, email: userEmail });
                if (response.ok) {
                    setMsg("Moving to survey page..")
                    setTimeout(() => {
                        router.push('/survey');
                    }, 500);
                } else {
                    setMsg("Error submitting email.");
                }
            } catch (error) {
                setMsg("Connection to server failed!.");
            }
        }
    }

    return(
        <div className={styles.page}>
            <div className="emailCont">
                <h3>Thank you for your interest in the product!</h3>
                <br/>
                <p>Before moving on to the last part of this experiment, please submit an email address..</p>
                <form className="emailForm">
                    <p>{msg}</p>
                    <br/>
                    <input type="email" placeholder="honggildong@naver.co.kr" required ref={emailRef}/>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}