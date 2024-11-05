"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from "../styles/_floating.module.scss"


const Floatingbtn = () => {

const handlegoWathsapp=()=>{
    window.open("https://wa.me/+22378303208", "_blank", "noopener,noreferrer");
}
  return (
    <button className={styles.scrollToTopButton} onClick={handlegoWathsapp} > 
       <FontAwesomeIcon icon={faWhatsapp}  />
    </button>
  )
}

export default Floatingbtn
