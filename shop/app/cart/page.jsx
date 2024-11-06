"use client"
import React from 'react'
import LayoutPage from '../layouts/Layout'
import styles from "../styles/_cart.module.scss"
import { useRouter } from 'next/navigation'

const Cart = () => {
    const router = useRouter();
    const handleGotoAddress=()=>{
        router.push("/cart/address")
    }
  return (
    <LayoutPage>
      <main className={styles.cart}>
      <section className={styles.title}>
        <h2>Votre panier d'achat</h2>
      </section>
      <section className={styles.cartContainer}>
        <div className={styles.left}>
          <div className={styles.cartItems}>
             <div className={styles.itemsInfos}>
                <figure>
                    <img src=''  alt=''/>
                </figure>
                <div className={styles.details}>
                  <h2>Sac</h2>
                  <p>25</p>
                </div>
             </div>
             <div className={styles.btns}>
                <button>-</button>
                 <span>1</span>
                <button>+</button>
             </div>
          </div>
          <div className={styles.cartItems}>
             <div className={styles.itemsInfos}>
                <figure>
                    <img src=''  alt=''/>
                </figure>
                <div className={styles.details}>
                  <h2>Sac</h2>
                  <p>25</p>
                </div>
             </div>
             <div className={styles.btns}>
                <button>-</button>
                 <span>1</span>
                <button>+</button>
             </div>
          </div>
          <div className={styles.cartItems}>
             <div className={styles.itemsInfos}>
                <figure>
                    <img src=''  alt=''/>
                </figure>
                <div className={styles.details}>
                  <h2>Sac</h2>
                  <p>25 FCFA</p>
                </div>
             </div>
             <div className={styles.btns}>
                <button>-</button>
                 <span>1</span>
                <button>+</button>
             </div>
          </div>
        </div>
        <div className={styles.right}>
        <div className={styles.title}>
        <h2>Récapitulatif de votre commande</h2>
        </div>
          
           <div className={styles.infos}>
            <h1>Nombre d'articles</h1>
            <span>5</span>
           </div>
           <div className={styles.infos}>
             <h1>Totaux du panier</h1>
             <span>52369Fcfa</span>
           </div>
           <button className={styles.btnCheckout} onClick={handleGotoAddress}>Passer à la caisse</button>
        </div>
      </section>

      </main>
    </LayoutPage>
  )
}

export default Cart
