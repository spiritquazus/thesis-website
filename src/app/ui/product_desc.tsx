"use client"
import styles from "./product.module.css";
import {useState,useEffect} from "react"

type Product = {
    price: string;
    description: string;
  };

export default function ProductDesc({ accessType }: { accessType: string | null }){

    const productL:Product ={

        price: "18,000원",
        description: `이 제품은 하루 종일 수분을 유지할 수 있도록 설계되었습니다. 가볍고 내구성이 뛰어나며 몇 시간 동안 음료의 온도를 유지할 수 있도록 제작되어 일상적인 사용에 완벽합니다.

        세련되고 현대적인 디자인으로 사무실, 체육관 또는 야외로 쉽게 휴대할 수 있습니다. 안전한 뚜껑과 누수 방지 구조로 누수에 대해 걱정할 필요가 없습니다.
        
        이 물병은 친환경 BPA 무함유 소재로 제작되어 환경을 생각하는 사용자에게 지속 가능한 옵션을 제공합니다.`,

    }

    const productH:Product ={
        price: "18,000원",
        description: `이 고품질 물병은 하루 종일 수분을 유지할 수 있도록 설계되었습니다. 가볍고 내구성이 뛰어나며 몇 시간 동안 음료의 온도를 유지할 수 있도록 제작되어 일상적인 사용에 완벽합니다. 

        세련되고 현대적인 디자인으로 사무실, 체육관 또는 야외로 쉽게 휴대할 수 있습니다. 안전한 뚜껑과 누수 방지 구조로 유출에 대해 걱정할 필요가 없습니다.
        
        또한 이 물병은 모바일 앱에 연결되어 수분 섭취량을 추적하고 더 건강한 라이프스타일을 위해 수분 알림 수신이 가능합니다.`,
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