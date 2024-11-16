"use client"
import { AuthContext } from '@/app/context/AuthContext'
import LayoutPage from '@/app/layouts/Layout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Login = () => {
  const router = useRouter()
  const [redirect, setRedirect] = useState(null)
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    const redirectUrl = localStorage.getItem("redirectUrl")
    if (redirectUrl) {
      setRedirect(redirectUrl)
    }
  })

  const [isValid, setIsValid] = useState(true)
  const [formData, setFormData] = useState({
    contact: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user, new Date(), formData.contact)
    console.log(formData)
    router.push(redirect || "/")
    localStorage.removeItem("redirectUrl")
  }

  return (
    <LayoutPage>
      <main className='auth'>

        <form onSubmit={handleSubmit}>
          <section className='title'>
            <h1>Se connecter à votre compte client</h1>
          </section>

          <label htmlFor='numero'>Numéro or email</label>
          <input id='numero' type='text' name='contact' value={formData.contact} onChange={handleChange} placeholder='numero / email' />
          <label htmlFor='userpassword'>Mot de passe</label>
          <input id='userpassword' type='password' name='password' value={formData.password} onChange={handleChange} placeholder='mot de passe' />


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
