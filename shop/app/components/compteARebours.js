"use client"
import axios from "axios";
import { useState, useEffect } from "react";

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
      <section style={{margin:"20px 0" ,zIndex:555}}>
        <h2 style={{color:"white", fontFamily:"Roboto"}}>{promotion.name}</h2>
        <p style={{color:"white", fontFamily:"Roboto"}}>
          Temps restant : {timeLeft.days} jours, {timeLeft.hours} heures,{" "}
          {timeLeft.minutes} minutes, {timeLeft.seconds} secondes
        </p>
      </section>
    );
  };

export default CompteARebours
