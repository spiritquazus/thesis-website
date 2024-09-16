"use client"
import styles from "./product.module.css";

export default function ProductImage({ accessType }: { accessType: string | null }){
    
    

    return (
        <>
            <img src={`${accessType=="h"?"./img/bottleH.webp":"./img/bottleL.webp"}`} className={styles.imageMain}></img>
        </>
    )
}