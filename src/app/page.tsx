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
  const [userData, setUserData] = useState<{ id: string; startTime: number }>({id: "DEFAULTBUG", startTime: Date.now()});
  const router = useRouter();
  
  useEffect(() => {
    // Get values from search params and update state
    // ?p=h&a=qr
    const prodVal = searchParams.get('p');
    const accVal = searchParams.get('a');
    if (prodVal !== null) setProdType(prodVal);
    if (accVal !== null) setAccessType(accVal);
    

    console.log("accesses: ", prodVal);
  }, [searchParams]); 

  useEffect(()=>{ //start counter the moment component is mounted.
    setTicker((prev)=>[Date.now(), prev[1]])

    async function fetchLocalData(){
      const existingData = localStorage.getItem('thesisBottle')
      if (existingData){
        setUserData(JSON.parse(existingData))
        alert("Existing user. Updating session...")
        //⚠️createUser or at least UpdateUser should be called, if they are say, restarting the session.
      } else {
        const newUserData = {
          id: uuidv4(),
          startTime: Date.now() 
        }
        setUserData(newUserData)
        localStorage.setItem('thesisBottle', JSON.stringify(newUserData))
        const endTime = Date.now()//provisional timing until the user actually leaves the page.
        const startTime = newUserData.startTime
        const totalTime = (endTime - startTime) / 1000;
        console.log("!!total time format: ", totalTime)
        createUser({id: newUserData.id, access: accessType, product: prodType, startTime: startTime, endTime: endTime, totalTime: totalTime})
      }
    }

    fetchLocalData()

  },[searchParams]) //this could cause vercel server issues again.

  function clickBtn(_interest:boolean){
    setTicker((prev)=>[prev[0], Date.now()]) //back-up setup
    console.log(`User stayed ${(ticker[1]-ticker[0])/1000} seconds on the page before moving on`)
    userUpdate({ id: userData.id, endTime: Date.now(), startTime: ticker[0]}) //update user time
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
        <button onClick={() => { clickBtn(true) }} className={styles.buttonEnv}>Interested</button>
        <button onClick={() => { clickBtn(false) }} className={styles.buttonEnv}>Not Interested</button>
      </footer>
    </div>
  );
}
