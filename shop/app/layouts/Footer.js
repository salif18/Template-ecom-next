"use client"

import React, { useEffect, useState } from 'react'
import styles from "../styles/_footer.module.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useRouter } from 'next/navigation';
import { FaOpencart } from "react-icons/fa";
import axios from 'axios';
const Footer = () => {
  const router = useRouter()

  const handleGoToSingleProduct = (category, subCategory) => {
    localStorage.setItem("categorie",category);
    localStorage.setItem("subcategorie",subCategory);
    router.push(`/products`);
  }

  // abonnement
  const [abonment ,setAbonment] = useState("");
 const [isValid ,setIsValid] = useState(true);
 const [message ,setMessage ] = useState("");

  const handleSubmit =async(e)=>{
    e.preventDefault();
     // Validation des champs
     if (!abonment) {
      setIsValid(false); // Affichez un message d'erreur à l'utilisateur
      setMessage("Veuillez rentrer votre email !.")
      return;
    }

    const abonnee ={
      email:abonment
    }

    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URI}/newletter`,abonnee,{
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer `, // Ajoutez le token si nécessaire
          },
      });
        if(res.status === 201){
          setMessage(response?.data?.message);
          setAbonment("")
        }
    }catch(e){
      setMessage(e?.response?.data?.message )
       console.log(e?.response?.data?.message || "error")
    }
   
  }

  // Réinitialisation du message d'erreur après un certain temps
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <footer className={styles.footer}>
    <section className={styles.row1}>
       <h2>Promos jusq’à -5% sur tous les vetements & articles de mode, sur toutes les marques.</h2>
    </section>
    <section className={styles.row2}>
      <div className={styles.columns}>
          <h2 className={styles.colLogo}><FaOpencart style={{fontSize:"2.2em"}} /> Fashion</h2>
          <p className={styles.h2}>Le meilleur look à tout moment, n’importe où.</p>
      </div>
      <div className={styles.columns}>
      <h2>Pour elle</h2>
        <p onClick={()=>handleGoToSingleProduct("Accessoires","Femmes")}>Accessoires femmes</p>
        <p onClick={()=>handleGoToSingleProduct("Chaussures","Femmes")}>Chaussures femmes</p>
        <p onClick={()=>handleGoToSingleProduct("Vetements","Femmes")}>Vetements femmes</p>
        <p onClick={()=>handleGoToSingleProduct("Sacs","Femmes")}>Sacs femmes</p>
      </div>
      <div className={styles.columns}>
      <h2>Pour lui</h2>
      <p onClick={()=>handleGoToSingleProduct("Accessoires","Hommes")}>Accessoires hommes</p>
      <p onClick={()=>handleGoToSingleProduct("Chaussures","Hommes")}>Chaussures hommes</p>
      <p onClick={()=>handleGoToSingleProduct("Vetements","Hommes")}>Vetements hommes</p>
      <p onClick={()=>handleGoToSingleProduct("Sacs","Hommes")}>Sacs hommes</p>
      </div>
      <div className={styles.columns}>
      <h2>Newsletter</h2>
      <input type='text' name='abonment' value={abonment} style={{border:!isValid && "1px solid red"}} onChange={(e)=>setAbonment(e.target.value)} placeholder='example@gmail.com' />
      {(!isValid && !abonment) && <p style={{color: !isValid && "red" , fontSize:"0.8em"}} >{message}</p>}
      <button className={styles.btnAbonner} onClick={(e)=>handleSubmit(e)} >{message || "S'abonner" }</button>
      </div>
    </section>
    <section className={styles.row3}>
     <p>Droits d’auteur © 2024 devsoft. Propulsé par Salif Moctar Konaté .</p>
     <div className={styles.socials}>
      <span><FacebookIcon className={styles.icon} /></span>
      <span><InstagramIcon className={styles.icon}  /></span>
     </div>
    </section>
    </footer>
  )
}

export default Footer
