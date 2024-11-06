"use client"

import LayoutPage from '@/app/layouts/Layout'
import React from 'react';
import styles from "../../styles/_address.module.scss"

const AddressCheckOut = () => {
  return (
    <LayoutPage>
      <main className={styles.address}>
        <section className={styles.title}>
            <h2>La caisse</h2>
        </section>
        <section className={styles.details}>
          <div className={styles.left}>
            <h2>Détails de livraison</h2>
            <form>
                <label htmlFor='nom'>Nom</label>
                <input type='text' name='nom' />
                <label htmlFor='numero'>Numéro</label>
                <input type='number' name='numero' />
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' />
                <label htmlFor='ville'>Ville/Quartier</label>
                <input type='text' name='ville' />
                <label htmlFor='rue'>Rue</label>
                <input type='number' name='rue' />
                <label htmlFor='logt'>Logts</label>
                <input type='number' name='logt' />
            </form>
          </div>
          <div className={styles.right}>
          <h2>Détails de commande</h2>
            <div className={styles.orderDetails}>
              <div className={styles.row1}>
               <h2>Produits</h2>
               <h2>Sous-total</h2>
              </div>
              <div className={styles.row2}>
               <p>sac x2</p>
               <p>25x2</p>
              </div>
              <div className={styles.row2}>
               <p>sac</p>
               <p>25</p>
              </div>
              <div className={styles.row2}>
               <p>Frais de livraison</p>
               <p>1000</p>
              </div>
              <div className={styles.row3}>
               <p>Total</p>
               <p>2555</p>
              </div>
              <div className={styles.row4}>
               <ul>
                 <li><input type='radio' name='mode-payement' value="par orange money" /> Payer par orange money</li>
                 <li><input type='radio' name='mode-payement' value="à la livraison"/> Payer à la livraison </li>
               </ul>
              </div>
              <button className={styles.btnCommande}>Passer commande</button>
            </div>
          </div>
        </section>
      </main>
    </LayoutPage>
  )
}

export default AddressCheckOut
