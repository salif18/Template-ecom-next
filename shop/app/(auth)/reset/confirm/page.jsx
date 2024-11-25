"use client"
import LayoutPage from '@/app/layouts/Layout'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Confirmation = () => {
  const router = useRouter()
  const [isValid , setIsValid ] = useState(true)
  const [message, setMessage] = useState("");
  const [formData ,setFormData ] = useState({
    reset_token:"", 
    new_password:"", 
    confirm_password:""
  })

  const handleChange=(e)=>{
    const { name , value } = e.target;
     setFormData((prev)=>({...prev , [name]:value}))
   }

   const handleSubmit=async(e)=>{
    e.preventDefault();
    // Validation des champs
    if (!formData.reset_token ||  !formData.confirm_password || !formData.new_password ) {
      setIsValid(false); // Affichez un message d'erreur à l'utilisateur
      setMessage("Veuillez remplir les champs!")
      return;
    }

    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URI}/reset/reset_valid`,formData);
      if(response.status == 200){
        router.push("/login")
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
            <h1>Réinitialiser votre mot de passe</h1>
          </section>

          <label htmlFor='password'>Nouveau mot de passe</label>
          <input id='password' type='password' name='new_password' onChange={handleChange} placeholder='nouveau mot de passe' />
          {(!isValid && !formData.new_password) && <p className="errorMessage">{message}</p>}
          <label htmlFor='confirm'>Confirmation</label>
          <input id='confrim' type='text' name='confirm_password' onChange={handleChange} placeholder='retaper le mot de passe' />
          {(!isValid && !formData.confirm_password) && <p className="errorMessage">{message}</p>}
          <label htmlFor='resettoken'>Code de validation à 4 chiffres</label>
          <input id='resettoken' type='text' name='reset_token' onChange={handleChange} placeholder='entrez les 4 chiffres envoyés sur votre email' />
          {(!isValid && !formData.reset_token) && <p className="errorMessage">{message}</p>}
          <button type='submit' className='btnSend'>Envoyer</button>

        </form>
      </main>
    </LayoutPage>
  )
}

export default Confirmation
