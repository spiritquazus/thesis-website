"use client"
import Image from "next/image";
import styles from "./page.module.css";
import ProductDesc from "./ui/product_desc"
import ProductImage from "./ui/product_image"
import { useState, useEffect, Suspense }  from "react"
//import LoadingFallback from "./components/LoadingFallback";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [prodType, setProdType] = useState<string | null>(null)
  const [accessType, setAccessType] = useState<string | null>(null)
  const [ticker, setTicker] = useState([0,0])
  const searchParams = useSearchParams()
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
  },[])

  function clickBtn(_interest:boolean){
    setTicker((prev)=>[prev[0], Date.now()])
    console.log(`User stayed ${(ticker[1]-ticker[0])/1000} seconds on the page before moving on`)

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
        {prodType ? (
            <Suspense>
              <div className={styles.prodDesc}>
                <ProductDesc accessType={prodType} />
              </div>
              <div className={styles.prodImage}>
                <ProductImage accessType={prodType} />
              </div>
            </Suspense>
          ) : (
            <div>Loading, please wait.</div>
          )}
      </main>
      <footer className={styles.footer}>
        <button onClick={()=>{clickBtn(true)}} className={styles.buttonEnv}>Interested</button>
        <button onClick={()=>{clickBtn(false)}} className={styles.buttonEnv}>Not Interested</button>
      </footer>
    </div>
  );
}
