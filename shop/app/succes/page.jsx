"use client"
import React, { useContext } from 'react'
import LayoutPage from '../layouts/Layout';
import styles from "../styles/_confirmOrder.module.scss"
import { CartContext } from '../context/CartContext';

const ConfirmOrder = () => {
    const { total, cart } = useContext(CartContext)
    return (
        <LayoutPage>
            <main className={styles.confirmOrder}>
                <section className={styles.title}>
                    <h1>Confirmation de commande</h1>
                </section>
                <section className={styles.column}>
                    <p>Merci. Votre commande a été reçue.</p>
                    <section className={styles.row}>
                        <div className={styles.rowCol}>
                            <p>Date</p>
                            <h2>07/11/2024</h2>
                        </div>
                        <div className={styles.rowCol}>
                            <p>Total</p>
                            <h2>{total} FCFA</h2>
                        </div>
                        <div className={styles.rowCol}>
                            <p>Mode de paiement</p>
                            <h2>à la livraison par espèce</h2>
                        </div>
                    </section>
                </section>

                <section className={styles.details}>
                    <div className={styles.title}>
                        <h2>Details de la commande</h2>
                    </div>
                    <div className={styles.productTitle}>
                        <h2>Produits</h2>
                        <h2>Total</h2>
                    </div>
                    <div className={styles.products}>
                        <div className={styles.productsDiv}><p>Produits</p></div>
                        <div className={styles.productsDiv}><p>Total</p></div>
                    </div>

                    {
                        cart.map(item =>
                            <div className={styles.products}>
                                <div className={styles.productsDiv}><p>{item.name} x{item.qty}</p></div>
                                <div className={styles.productsDiv}><p>{item.price * item.qty}</p></div>
                            </div>
                        )
                    }

                    <div className={styles.products}>
                        <div className={styles.productsDiv}><p>Mode de paiement</p></div>
                        <div className={styles.productsDiv}><p>a la livraison</p></div>
                    </div>
                    <div className={styles.products}>
                        <div className={styles.productsDiv}><p>Total</p></div>
                        <div className={styles.productsDiv}><p>{total} Fcfa</p></div>
                    </div>
                </section>

                <section className={styles.address}>
                    <div className={styles.title}>
                        <h2>Addresse</h2>
                    </div>
                    <section className={styles.addressData}>


                        <p>Moussa</p>


                        <p>89665544</p>


                        <p>Moussa@gmail.com</p>


                        <p>Bamako</p>


                        <p>589</p>


                        <p>52</p>

                    </section>
                </section>
            </main>
        </LayoutPage>
    )
}

export default ConfirmOrder
