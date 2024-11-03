"use client"
import styles from "./product.module.css";
import {useState,useEffect} from "react"

type Product = {
    price: string;
    description: string;
  };

export default function ProductDesc({ accessType }: { accessType: string | null }){

    const productL:Product ={

        price: "18,000KRW",
        description: ` This water bottlwe is designed to keep you hydrated throughout the day. Lightweight and durable, it’s crafted to maintain your drink’s temperature for hours, making it perfect for daily use. With a sleek, modern design, it’s easy to carry to the office, gym, or outdoors. The secure lid and leak-proof construction eliminate any concerns about spills. This water bottle is made from eco-friendly, BPA-free materials, offering a sustainable option for environmentally-conscious users.`,

    }

    const productH:Product ={
        price: "18,000KRW",
        description: ` This water bottle is designed to keep you hydrated throughout the day. Lightweight and durable, it’s crafted to maintain your drink’s temperature for hours, making it perfect for daily use. With a sleek, modern design, it’s easy to carry to the office, gym, or outdoors. The secure lid and leak-proof construction eliminate any concerns about spills. This water bottle features a connection to a mobile app that allows you to track your hydration intake and receive reminders for a healthier lifestyle.`,
    }

    const [currProd, setCurrProd] = useState<null | Product>(null)

    useEffect(()=>{
        setCurrProd(accessType=="h"?productH:productL)
        console.log("detected access sublevel: ", currProd)
        console.log("sublevel access acceptance prop: ", accessType)
    },[accessType])

    return (
      <>
          {currProd ? (
            <>
              <div>
                <p style={{fontWeight: 600}}>{currProd.price}</p>
                <br />
                <span>{currProd.description}</span>
                <br /><br />
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
      </>
      )
}