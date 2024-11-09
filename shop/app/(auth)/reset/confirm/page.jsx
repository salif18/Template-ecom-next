import LayoutPage from '@/app/layouts/Layout'
import React from 'react'

const Confirmation = () => {
  return (
    <LayoutPage>
      <main className='auth'>

        <form>
          <section className='title'>
            <h1>Réinitialiser votre mot de passe</h1>
          </section>

          <label htmlFor='password'>Nouveau mot de passe</label>
          <input id='password' type='password' name='newpassword' placeholder='nouveau mot de passe' />
          <label htmlFor='confirm'>Confirmation</label>
          <input id='confrim' type='text' name='confirmpassword' placeholder='retaper le mot de passe' />
          <label htmlFor='resettoken'>Code de validation à 4 chiffres</label>
          <input id='resettoken' type='text' name='resettoken' placeholder='entrez les 4 chiffres envoyés sur votre email' />
          <button type='submit' className='btnSend'>Envoyer</button>

        </form>
      </main>
    </LayoutPage>
  )
}

export default Confirmation
