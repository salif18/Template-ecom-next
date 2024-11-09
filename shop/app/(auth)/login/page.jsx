import LayoutPage from '@/app/layouts/Layout'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <LayoutPage>
       <main className='auth'>
      
      <form>
      <section className='title'>
         <h1>Se connecter à votre compte client</h1>
      </section>
       
        <label htmlFor='numero'>Numéro or email</label>
        <input id='numero' type='text' name='contact' placeholder='numero / email' />
        <label htmlFor='userpassword'>Mot de passe</label>
        <input id='userpassword' type='password' name='password' placeholder='mot de passe' />
       

        <section className='avertissement'>
           <p className='forget-pass'>Mot de passe oublié.</p>
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
