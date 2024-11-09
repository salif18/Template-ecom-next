import LayoutPage from '@/app/layouts/Layout'
import Link from 'next/link'
import React from 'react'

const Registre = () => {
  return (
    <LayoutPage>
      <main className='auth'>
      
       <form>
       <section className='title'>
          <h1>Création de compte client</h1>
       </section>
         <label htmlFor='username'>Prenom & nom</label>
         <input id='username' type='text' name='username' placeholder='prénom et nom' />
         <label htmlFor='numero'>Numéro</label>
         <input id='numero' type='number' name='numero' placeholder='numéro' />
         <label htmlFor='useremail'>Email</label>
         <input id='useremail' type='email' name='email' placeholder='email' />
         <label htmlFor='userpassword'>Mot de passe</label>
         <input id='userpassword' type='password' name='password' placeholder='mot de passe' />
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
