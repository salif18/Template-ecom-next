"use client"
import { AuthContext } from '@/app/context/AuthContext'
import LayoutPage from '@/app/layouts/Layout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Registre = () => {
  
  const router = useRouter()

  const { login } = useContext(AuthContext);

  const [isValid , setIsValid ] = useState(true)
  const [message, setMessage] = useState("");
  const [formData ,setFormData ] = useState({
   username:"",
   numero:"",
   email:"",
   password:""
  })

  const handleChange=(e)=>{
   const { name , value } = e.target;
    setFormData((prev)=>({...prev , [name]:value}))
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    // Validation des champs
    if (!formData.username || !formData.numero || !formData.email || !formData.password ) {
      setIsValid(false); // Affichez un message d'erreur à l'utilisateur
      setMessage("Veuillez remplir les champs!")
      return;
    }

    login(formData ,new Date(),formData.numero)
    console.log(formData)
    router.push("/")
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
          <h1>Création de compte client</h1>
       </section>
         <label htmlFor='username'>Prenom & nom</label>
         <input id='username' className={!isValid && !formData.username && "error"}  type='text' name='username' value={formData.username} onChange={handleChange} placeholder='prénom et nom' />
         {(!isValid && !formData.username) && <p className="errorMessage">{message}</p>}
         <label htmlFor='numero'>Numéro</label>
         <input id='numero' className={!isValid && !formData.numero && "error"} type='number' name='numero' value={formData.numero} onChange={handleChange} placeholder='numéro' />
         {(!isValid && !formData.numero) && <p className="errorMessage">{message}</p>}
         <label htmlFor='useremail'>Email</label>
         <input id='useremail' className={!isValid && !formData.email && "error"} type='email' name='email' value={formData.email} onChange={handleChange} placeholder='email' />
         {(!isValid && !formData.email) && <p className="errorMessage">{message}</p>}
         <label htmlFor='userpassword'>Mot de passe</label>
         <input id='userpassword' className={!isValid && !formData.password && "error"} type='password' name='password' value={formData.password} onChange={handleChange} placeholder='mot de passe' />
         {(!isValid && !formData.password) && <p className="errorMessage">{message}</p>}
         <button type='submit' className='btnSend'>S'incrire</button>

         <section className='avertissement'>
            <p className='condition'>En créant un compte, vous acceptez les conditions d'utilisation . Consultez notre déclaration de confidentialité, notre politique relative aux cookies ainsi que notre politique relative aux publicités ciblées par centres d’intérêts.</p>
         </section>

         <section className='status-auth'>
            <p>Vous avez déjà un compte ?</p> <Link href="/login"> connectez-vous</Link>
         </section>
       </form>
      </main>
    </LayoutPage>
  )
}

export default Registre
