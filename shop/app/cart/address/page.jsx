"use client"

import LayoutPage from '@/app/layouts/Layout'
import React, { useContext } from 'react';
import styles from "../../styles/_address.module.scss"
import { CartContext } from '@/app/context/CartContext';

const AddressCheckOut = () => {
  const { cart, total } = useContext(CartContext);
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

              {
                cart.map(item => (
                  <div className={styles.row2} key={item.id} >  {/* Utilise un div parent ou React.Fragment */}
                    <p>{item.name} x{item.qty}</p>
                    <p>{item.price * item.qty} FCFA</p>
                  </div>
                ))
              }

              <div className={styles.row2}>
                <p>Frais de livraison</p>
                <p>+1000 FCFA</p>
              </div>
              <div className={styles.row3}>
                <p>Total</p>
                <p>{total + 1000} FCFA</p>
              </div>
              <div className={styles.row4}>
                <ul>
                  <li><input type='radio' name='mode-payement' value="par orange money" /> Payer par orange money</li>
                  <li><input type='radio' name='mode-payement' value="à la livraison" /> Payer à la livraison </li>
                  <li><input type='radio' name='mode-payement' value="passer à la boutique" /> Passer à la boutique</li>
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
