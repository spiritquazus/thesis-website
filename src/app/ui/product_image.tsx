"use client";
import styles from "./product.module.css";
import { useState, useRef } from "react"


export default function ProductImage({ accessType }: { accessType: string | null }){
    
    const [currentImg, setCurrentImg] = useState("./img/bottleMain.webp")
    const mainImgRef = useRef(null)

    function handleClick(event: React.MouseEvent<HTMLImageElement>){
        setCurrentImg(event.currentTarget.src)
    }

    return (
        <div className={styles.prodImage}>
            <img ref={mainImgRef} src={currentImg} alt="bottle, big image" className={styles.imageMain}></img>
            <div className={styles.imgGallery}>
                <img onClick = {handleClick} src={`./img/bottleMain.webp`}></img>
                <img onClick = {handleClick} src={`./img/BOTTLE_BEIGE.webp`}></img>
                <img onClick = {handleClick} src={`./img/BOTTLE_PINK.webp`}></img>
                <img onClick = {handleClick} src={`./img/BOTTLE_GREEN.webp`}></img>
                <img onClick = {handleClick} src={`./img/BOTTLE_PURPLE.webp`}></img>
            </div>
        </div>
            
    )
}