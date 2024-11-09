"use client"

import LayoutPage from '@/app/layouts/Layout'
import { useRouter } from 'next/navigation';
import React from 'react'

const Reset = () => {
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/reset/confirm");
  };
 
  return (
    <LayoutPage>
      <main className='auth'>
      
      <form onSubmit={handleSubmit}>
      <section className='title'>
         <h1>Remplissez bien ces informations</h1>
      </section>   
        <label htmlFor='numero'>Numéro</label>
        <input id='numero' type='number' name='numero' placeholder='numero' />
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' name='email' placeholder='email' />
        <button type='submit' className='btnSend' >Envoyer</button>
      </form>
     </main>
    </LayoutPage>
  )
}

export default Reset
