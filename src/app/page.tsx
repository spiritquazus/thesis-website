"use client"
import Image from "next/image";
import styles from "./page.module.css";
import ProductDesc from "./ui/product_desc"
import ProductImage from "./ui/product_image"
import { useState, useEffect, Suspense }  from "react"
//import LoadingFallback from "./components/LoadingFallback";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {userUpdate, createUser} from "./requests"


export default function Home() {
  const [prodType, setProdType] = useState<string | null>(null)
  const [accessType, setAccessType] = useState<string | null>(null)
  const [ticker, setTicker] = useState([0,0])
  const searchParams = useSearchParams()
  const [dataLoad, setDataLoad] = useState(false)
  const [userData, setUserData] = useState<{ id: string; startTime: number }>({id: "DEFAULTBUG", startTime: Date.now()});
  const [msg, setMsg] = useState("")
  const router = useRouter();
  
  useEffect(() => {
    // Get values from search params and update state
    // ?p=h&a=qr
    setTicker((prev)=>[Date.now(), prev[1]])
    const prodVal = searchParams.get('p');
    const accVal = searchParams.get('a');
    if (prodVal !== null) setProdType(prodVal);
    if (accVal !== null) setAccessType(accVal);
    

    console.log("accesses: ", prodVal, accVal);
    setDataLoad(true)
  }, [searchParams]); 

  useEffect(()=>{ //start counter the moment component is mounted.
    
    async function fetchLocalData(){
      const existingData = localStorage.getItem('thesisBottle')
      if (existingData) {
        alert("old session detected. removing and reloading. '확인' 눌러주세요.")
        localStorage.removeItem('thesisBottle');
        window.location.reload();
    } else {
        const newUserData = {
          id: uuidv4(),
          startTime: Date.now() 
        }
        setUserData(newUserData)
        setMsg("Welcome!")
        try {
          localStorage.setItem('thesisBottle', JSON.stringify(newUserData))
        } catch (error) {
          console.log("error: ", error)
          setMsg(String(error))
        }    
        const endTime = Date.now()//provisional timing until the user actually leaves the page.
        const startTime = newUserData.startTime
        const totalTime = Math.round((endTime - startTime) / 1000)
/*         console.log("!!total time format: ", totalTime)
        console.log("access Type:", accessType)
        console.log("product type: ", prodType) */
        const response = await createUser({id: newUserData.id, name: "anonymous", access: accessType, product: prodType, startTime: startTime, endTime: endTime, totalTime: totalTime})
        if (response.error) {
          console.error("Failed to enter user:", response.error || 'Unknown error')
          setMsg("Failed to enter user: " + response.error || 'Unknown error')
          if (response.type) alert("Please check if your URL is valid if you had to type it in. If you used QR, please inform the administrator.")
        }
      }
    }

    if (dataLoad){
      fetchLocalData()
    }
    
  },[dataLoad]) //this could cause vercel server issues again.

  function clickBtn(_interest:boolean){
    setTicker((prev)=>[prev[0], Date.now()]) //back-up setup
    console.log(`User stayed ${(Date.now() - ticker[0])/1000} seconds on the page before moving on`)
    console.log("userData.id: ", userData.id)
    userUpdate({ id: userData.id, endTime: Date.now(), startTime: ticker[0], email:null }) //update user time
    if (_interest){
      router.push('/email-sign')
      //sign up email then survey
    } else {
      router.push('/survey')
      //lead to survey
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback={<div>Loading, please wait.</div>}>
          
          {prodType ? (
            <>
              <div className={styles.prodImage}>
                <ProductImage accessType={prodType} />
              </div>
              <div className={styles.title}></div>
              <div className={styles.prodDesc}>
                <ProductDesc accessType={prodType} />
              </div>
            </>
          ) : (
            <div>Loading, please wait.</div>
          )}
        </Suspense>
      </main>
      <footer className={styles.footer}>
        <button onClick={() => { clickBtn(true) }} className={styles.buttonEnv}>Interested.</button>
        <button onClick={() => { clickBtn(false) }} className={styles.buttonEnv}>Not Interested.</button>
      </footer>
    </div>
  );
}
