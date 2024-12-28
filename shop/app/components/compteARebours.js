"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/app/styles/_reboure.module.scss"

const CompteARebours = () => {
    const [promotion, setPromotion] = useState(null);
    const [timeLeft, setTimeLeft] = useState({});
  
    useEffect(() => {
      const fetchPromotion = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URI}/active-rebourse`);
          if(response.status === 200){
            setPromotion(response.data);
          }
          
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchPromotion();
    }, []);
  
    useEffect(() => {
      if (promotion) {
        const calculateTimeLeft = () => {
          const now = new Date();
          const endTime = new Date(promotion.endTime);
          const difference = endTime - now;
  
          if (difference > 0) {
            return {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / (1000 * 60)) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
          } else {
            return null;
          }
        };
  
        setTimeLeft(calculateTimeLeft());
  
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
  
        return () => clearInterval(timer);
      }
    }, [promotion]);
  
    if (!promotion) return <p>Aucune promotion active.</p>;
  
    if (!timeLeft) return <p>Promotion terminée.</p>;
  
    return (
      <section className={styles.reboure}>
        <h2 className={styles.title}>{promotion.name}</h2>
        <div className={styles.reboureContainer}>

          <div className={styles.card}>
            <p>{timeLeft.days}</p>
            <h1>Jours</h1>
          </div>
          <div className={styles.card}>
            <p>{timeLeft.hours}</p>
            <h1>Heures</h1>
          </div>
          <div className={styles.card}>
            <p>{timeLeft.minutes}</p>
            <h1>Minutes</h1>
          </div>
          <div className={styles.card}>
            <p>{timeLeft.seconds}</p>
            <h1>Sécondes</h1>
          </div>

        </div>
        {/* <p style={{color:"white", fontFamily:"Roboto"}}>
          Temps restant : {timeLeft.days} jours, {timeLeft.hours} heures,{" "}
          {timeLeft.minutes} minutes, {timeLeft.seconds} secondes
        </p> */}
      </section>
    );
  };

export default CompteARebours
