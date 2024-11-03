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
                <h1>Survey</h1>
                <p>Questions regarding the product and this website</p>
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
                    } else if (response.msg){
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
            setMsg("Please respond to every questions before moving on.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="surveyForm">
            {things.map((thing) => {
                if (thing.num != 11) {return (
                    <div key={thing.num}  className="qDiv">
                        <div className="qDivTitle">
                            <h3>Question {thing.num}</h3>
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
                                <h3>Question {thing.num}</h3>
                                <span>{thing.title}</span>
                            </div>
                            <div className="qBtns">
                                {["Male", "Female", "Other"].map((gender) => (
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
            <button type="submit" className="finalSubmit">Submit Survey</button>
        </form>
    )
}


let questions = [
    {
        num: 1,
        title: "How much effort did it take for you to access and navigate the website? (1 = Very Little Effort, 7 = A Great Deal of Effort)"
    },
    {
        num: 2,
        title: "To what extent did you feel like you had to invest time and effort to find the information you were looking for? (1 = Very Little, 7 = A Lot)"
    },
    {
        num: 3,
        title: "How challenging was it to engage with the product on the website?(1 = Not Challenging at All, 7 = Very Challenging)"
    },
    {
        num: 4,
        title: "How technologically advanced do you consider this product to be? (1 = Not Tech-Savvy, 7 = Very High-Tech)"
    },
    {
        num: 5,
        title: "Do you believe this product incorporates advanced technology? (1 = Strongly Disagree, 7 = Strongly Agree)"
    },
    {
        num: 6,
        title: "How innovative do you think this product is? (1 = Not Innovative at All, 7 = Very Innovative)"
    },
    {
        num: 7,
        title: "How likely are you to purchase this product in the future? (1 = Not Likely, 7 = Very Likely)"
    },
    {
        num: 8,
        title: "How much do you like the brand after viewing the website? (1 = Strongly Dislike, 7 = Strongly Like)"
    },
    {
        num: 9,
        title: "How often do you use tech-based products (e.g., smart devices, apps)? (1 = Never, 7 = Very Often)"
    },
    {
        num: 10,
        title: "How familiar are you with water bottles similar to the one you viewed on the website? (1 = Not Familiar at All, 7 = Very Familiar)"
    },
    {
        num: 11,
        title: "Gender:"
    },
];
