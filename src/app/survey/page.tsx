"use client"
import styles from "../page.module.css";
import "./style.css"
import {useState, useRef} from "react"
import { useRouter } from 'next/navigation';
import { userSurvey } from "../requests"

export default function Survey() {

    return(
        <div className={`${styles.page} surveyPage`}>
            <div className="surveyTop">
                <h1>설문 조사</h1>
                <p>본 웹사이트와 제품에 대한 질문 몇 가지에 응답 부탁드립니다.</p>
            </div>
            < CreateSurvey things={questions}/>
        </div>
    )

}

const CreateSurvey: React.FC<{things: { num: number; title: string }[]}> = ({ things }) =>{

    const [selectVal, setSelectVal] = useState<{ [key: number]: number | string | null }>({})
    const [msg, setMsg] = useState<string | null>(null)
    const router = useRouter();

    const handleSelect = (questionNum: number, value: number | string) => {
        setSelectVal((prev) => ({
            ...prev,
            [questionNum]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (things.every((thing) => selectVal[thing.num] !== undefined && selectVal[thing.num] !== null)) {
            console.log('All questions answered!', selectVal);
    
            const sortedVals = Object.keys(selectVal)
                .map(key => parseInt(key))
                .sort((a, b) => a - b)
                .map(key => selectVal[key]);
    
            const jsonString = localStorage.getItem('thesisBottle');
            const id = jsonString ? JSON.parse(jsonString).id : undefined;
    
            if (id != undefined) {
                try {
                    const response = await userSurvey({ userId: id, questions: sortedVals })
                    if (response.ok) {
                        console.log('Survey submitted successfully.')
                        router.push('/thank-you')
                    } else {
                        console.error(`Failed to submit survey: ${response.msg || 'Unknown error'}`)
                        setMsg(`Failed to submit survey: ${response.msg || 'Unknown error'}`)
                    }
                } catch (error) {
                    console.error('Error submitting survey! ', error)
                    setMsg(`Failure to submit survey: ${error}`)
                }
            } else {
                console.log("Failure to find user ID. Check localStorage information.")
            }
        } else {
            setMsg("모든 질문에 응답 부탁드립니다.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="surveyForm">
            {things.map((thing) => {
                if (thing.num != 11) {return (
                    <div key={thing.num}  className="qDiv">
                        <div className="qDivTitle">
                            <h3>{thing.num}번 질문</h3>
                            <span>{thing.title}</span>
                        </div>
                        <div className="qBtns">
                            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                                <label key={`q${thing.num}_${value}`}>
                                    {value}
                                    <input
                                        type="radio"
                                        name={`q${thing.num}`}
                                        value={value}
                                        checked={selectVal[thing.num] === value}
                                        onChange={() => handleSelect(thing.num, value)}
                                    />       
                                </label>
                            ))}
                        </div>
                    </div>
                )} else {
                    return (
                        <div key={thing.num}  className="qDiv">
                            <div className="qDivTitle">
                                <h3>{thing.num}번 질문</h3>
                                <span>{thing.title}</span>
                            </div>
                            <div className="qBtns">
                                {["남", "여", "기타"].map((gender) => (
                                    <label key={`q${thing.num}_${gender}`}>
                                        <input
                                            type="radio"
                                            name={`q${thing.num}`}
                                            value={gender}
                                            checked={selectVal[thing.num] === gender}
                                            onChange={() => handleSelect(thing.num, gender)}
                                        />
                                        {gender}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )
                }
            })}
                
            <p style={{color:"red"}}>{msg}</p>
            <button type="submit" className="finalSubmit">제출 하기</button>
        </form>
    )
}


let questions = [
    {
        num: 1,
        title: "웹사이트에 접근하고 탐색하는 데 얼마나 많은 노력이 필요하셨나요?(1 = 아주 적은 노력, 7 = 아주 많은 노력)"
    },
    {
        num: 2,
        title: "원하는 정보를 찾기 위해 어느 정도까지 시간과 노력을 투자해야 한다고 느꼈나요? (1 = 아주 적음, 7 = 아주 많음)"
    },
    {
        num: 3,
        title: "웹사이트에 접근하는 것이 얼마나 어려웠나요? (1 = 전혀 어렵지 않음, 7 = 매우 어려움)"
    },
    {
        num: 4,
        title: "이 제품이 얼마나 기술적으로 집약되어 있다고 생각하시나요? (1 = 매우 낮은 기술, 7 = 매우 높은 기술)"
    },
    {
        num: 5,
        title: "이 제품에 첨단 기술이 포함되어 있다고 생각하시나요? (1 = 전혀 아니다, 7 = 매우 그렇다)"
    },
    {
        num: 6,
        title: "이 제품이 얼마나 혁신적이라고 생각하시나요? (1 = 전혀 아니다, 7 = 매우 그렇다)"
    },
    {
        num: 7,
        title: "향후 이 제품을 구매할 가능성은 얼마나 되나요? (1 = 전혀 가능성 없음, 7 = 매우 가능성 높음)"
    },
    {
        num: 8,
        title: "웹사이트를 본 후 브랜드가 얼마나 마음에 드시나요? (1 = 전혀 선호하지 않음, 7 = 매우 선호함)"
    },
    {
        num: 9,
        title: "기술 기반의 제품(예: 스마트 기기, 어플)을 얼마나 자주 사용하시나요? (1 = 전혀 사용하지 않음, 7 = 매우 자주 사용함)"
    },
    {
        num: 10,
        title: "웹사이트에서 본 물병과 비슷한 물병에 대해 얼마나 친숙하신가요? (1 = 전혀 친숙하지 않음, 7 = 매우 친숙함)"
    },
    {
        num: 11,
        title: "성별이 어떻게 되세요?"
    },
];
