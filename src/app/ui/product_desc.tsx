"use client"
import styles from "./product.module.css";
import {useState,useEffect} from "react"

type Product = {
    name: string;
    price: string;
    description: string;
    bullets: string[];
  };

export default function ProductDesc({ accessType }: { accessType: string | null }){

    const productL:Product ={
        name: "Klevin - Camelbak",
        price: "18.000KRW",
        description: `Practical, durable, and eco-friendly. Our Regular Water Bottle offers everything you need for everyday hydration. Built from high-quality, 
        BPA-free materials, this bottle is designed to keep your drinks cold or hot for hours, making it the perfect choice for daily use. Its simple, 
        ergonomic design, it's easy to carry to work, class, or the gym.`,
        bullets: [
            `Insulated design: Keeps drinks hot or cold for up to 12 hours.`,
            `Eco-friendly: Made from BPA-free, recyclable materials.`,
            `Leak-proof: Secure lid to prevent spills and leaks.`,
            `Portable: Lightweight and easy to carry.`
        ]
    }

    const productH:Product ={
        name: "Osmosis - VadaTech",
        price: "25.000KRW",
        description: `Stay hydrated with cutting-edge technology! Our Smart Water Bottle connects seamlessly to a mobile app to track your daily water intake 
        and send hydration reminders. Whether you’re working out or studying, this bottle ensures you stay on track.`,
        bullets: [
            `App connectivity: Track water intake and receive hydration reminders.`,
            `Temperature control: Keeps beverages hot or cold for hours.`,
            `Long battery life: Designed to last up to a week on a single charge.`,
            `Ergonomic design: Easy to carry, perfect for on-the-go.`
        ]
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
                <h2 style={{fontWeight: 1000}}>{currProd.name}</h2>
                <p style={{fontWeight: 600}}>{currProd.price}</p>
                <br />
                <span>{currProd.description}</span>
                <br /><br />
              </div>
              <div style={{gridColumn: 2}}>
                <ul>
                  {currProd.bullets.map((li, i) => {
                    const arr = li.split(":")
                    return (<li key={i}><span style={{ fontWeight: 700 }}>{arr[0] + ":"}</span>{arr[1]}</li>)
                  })}
                </ul>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
      </>
      )
}