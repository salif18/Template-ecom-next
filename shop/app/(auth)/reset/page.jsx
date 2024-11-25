"use client"

import LayoutPage from '@/app/layouts/Layout'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Reset = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isValid , setIsValid ] = useState(true)
  const [formData ,setFormData ] = useState({
   
    numero:"",
    email:"",
  
   })

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   router.push("/reset/confirm");
  // };

  const handleChange=(e)=>{
    const { name , value } = e.target;
     setFormData((prev)=>({...prev , [name]:value}))
   }

   const handleSubmit=async(e)=>{
    e.preventDefault();
    // Validation des champs
    if (!formData.numero || !formData.email ) {
      setIsValid(false); // Affichez un message d'erreur à l'utilisateur
      setMessage("Veuillez remplir les champs!")
      return;
    }

    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URI}/reset/reset_token`,formData);
      if(response.status == 200){    
        router.push("/reset/confirm");
      }
    }catch(e){
      console.error(e.response.data.message || "erreur d'authentification",  )
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
    <LayoutPage>
      <main className='auth'>
      
      <form onSubmit={handleSubmit}>
      <section className='title'>
         <h1>Remplissez bien ces informations</h1>
      </section>   
        <label htmlFor='numero'>Numéro</label>
        <input id='numero' type='number' name='numero' placeholder='numero' onChange={handleChange} />
        {(!isValid && !formData.numero) && <p className="errorMessage">{message}</p>}
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' name='email' onChange={handleChange} placeholder='email' />
        {(!isValid && !formData.email) && <p className="errorMessage">{message}</p>}
        <button type='submit' className='btnSend' >Envoyer</button>
      </form>
     </main>
    </LayoutPage>
  )
}

export default Reset
