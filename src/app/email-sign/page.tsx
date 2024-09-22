
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
            setMsg("이메일이 유효하지 않습니다.")
        } else {
            try {
                const jsonString = localStorage.getItem('thesisBottle');
                const id = jsonString ? JSON.parse(jsonString).id : undefined;
                if (id == undefined) {
                    setMsg("Email add failed due to unchecked ID. 웹사이트를 처음부터 다시 시작해주세요.");
                    return
                }
                const response = await userUpdate({ id: id, email: userEmail });
                if (response.ok) {
                    setMsg("성공! 설문조사 페이지로 이동해드립니다.")
                    setTimeout(() => {
                        router.push('/survey');
                    }, 500);
                } else {
                    setMsg("서버 오류. 다시 시도해 주세요.");
                }
            } catch (error) {
                setMsg("서버와의 연결에 실패했습니다. 다시 시도해 주세요.");
            }
        }
    }

    return(
        <div className={styles.page}>
            <div className="emailCont">
                <h3>관심 가져주셔서 감사합니다!</h3>
                <br/>
                <p>마지막 단계로 진행하기 전에 이메일 제출 부탁드립니다.</p>
                <form className="emailForm">
                    <p>{msg}</p>
                    <br/>
                    <input type="email" placeholder="honggildong@naver.co.kr" required ref={emailRef}/>
                    <button type="submit" onClick={handleSubmit}>제출하기</button>
                </form>
            </div>
        </div>
    )
}