"use client"
import { AuthContext } from '@/app/context/AuthContext'
import LayoutPage from '@/app/layouts/Layout'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Login = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirectUrl")
  // const [redirect, setRedirect] = useState(null)
  const { login, user } = useContext(AuthContext);

  // useEffect(() => {
  //   const redirectUrl = localStorage.getItem("redirectUrl")
  //   if (redirectUrl) {
  //     setRedirect(redirectUrl)
  //   }
  // })

  const [isValid, setIsValid] = useState(true)
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    contacts: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
     // Validation des champs
     if (!formData.contacts || !formData.password ) {
      setIsValid(false); // Affichez un message d'erreur à l'utilisateur
      setMessage("Veuillez remplir les champs!")
      return;
    }

    
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URI}/auth/login`,formData);
      if(response.status == 200){
        const {token , userId , userName } = response.data
        login( userName, token , userId);
        router.push(redirectUrl || "/")
        // localStorage.removeItem("redirectUrl")
      }
    }catch(e){
      console.error(e.response.data.message || "erreur d'authentification",  )
    }

    // login(user, new Date(), formData.contact)
    // console.log(formData)
    // router.push(redirect || "/")
    // localStorage.removeItem("redirectUrl")
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
            <h1>Se connecter à votre compte client</h1>
          </section>

          <label htmlFor='numero'>Numéro or email</label>
          <input id='numero' className={!isValid && !formData.contacts && "error"} type='text' name='contacts' value={formData.contacts} onChange={handleChange} placeholder='numero / email' />
          {(!isValid && !formData.contacts) && <p className="errorMessage">{message}</p>}
          <label htmlFor='userpassword'>Mot de passe</label>
          <input id='userpassword' className={!isValid && !formData.password && "error"} type='password' name='password' value={formData.password} onChange={handleChange} placeholder='mot de passe' />

          {(!isValid && !formData.password) && <p className="errorMessage">{message}</p>}
          <section className='avertissement'>
            <Link className='forget-pass' href="/reset" >Mot de passe oublié.</Link>
          </section>
          <button type='submit' className='btnSend'>Se connecter</button>

          <section className='status-auth'>
            <p>Vous n'avez pas de compte ?</p> <Link href="/registre"> créer un compte</Link>
          </section>
        </form>
      </main>
    </LayoutPage>
  )
}

export default Login
