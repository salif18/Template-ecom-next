import React from 'react'
import LayoutPage from '../layouts/Layout'

const MyAchat = () => {
  return (
    <LayoutPage>
      <main className='achats'>
      <section className='title'>
         <h2>Mes achats</h2>
      </section>
      <section className='list-achat'>
       <p>Aucuns achats effectués pour le moments</p>
      </section>
       
      </main>
    </LayoutPage>
  )
}

export default MyAchat
