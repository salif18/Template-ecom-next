"use client"
import React, { useContext } from 'react'
import LayoutPage from '../layouts/Layout'
import styles from "../styles/_cart.module.scss"
import { useRouter } from 'next/navigation'
import { CartContext } from '@/app/context/CartContext';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
const Cart = () => {
  const { cart, decrementQuantity, incrementQuantity, total, nombreArticles } = useContext(CartContext)
  const router = useRouter();
  const handleGotoAddress = () => {
    router.push("/cart/address")
  }
  return (
    <LayoutPage>
      <main className={styles.cart}>
        <section className={styles.title}>
          <h2>Votre panier d'achat</h2>
        </section>
        <section className={styles.cartContainer}>
          <ul className={styles.left}>

            {
              cart.map(item =>
                <li key={item.id}>
                  <div className={styles.cartItems}>
                    <div className={styles.itemsInfos}>
                      <figure>
                        <img src={item.img} alt={item.name} />
                      </figure>
                      <div className={styles.details}>
                        <h2>{item.name}</h2>
                        <p>{item.category}</p>
                        <div className={styles.row}>
                          <p>Color</p>
                          <div style={{ backgroundColor: item.selectedColor }} className={styles.colordiv} ></div>
                        </div>
                        {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                        <p>{item.price} FCFA</p>
                      </div>
                    </div>
                    <div className={styles.btns}>
                      <button onClick={() => decrementQuantity(item.id, item.selectedSize, item.selectedColor)}>{item.qty > 1 ? "-" : <DeleteOutlineRoundedIcon style={{ fontSize: "18px" }} />}</button>
                      <span>{item.qty}</span>
                      <button onClick={() => incrementQuantity(item.id, item.selectedSize, item.selectedColor)}>+</button>
                    </div>
                  </div>
                </li>
              )

            }
          </ul>
          <div className={styles.right}>
            <div className={styles.title}>
              <h2>Récapitulatif de votre commande</h2>
            </div>

            <div className={styles.infos}>
              <h1>Nombre d'articles</h1>
              <span>{nombreArticles}</span>
            </div>
            <div className={styles.infos}>
              <h1>Totaux du panier</h1>
              <span>{total} FCFA</span>
            </div>
            <button className={styles.btnCheckout} onClick={handleGotoAddress}>Passer à la caisse</button>
          </div>
        </section>

      </main>
    </LayoutPage>
  )
}

export default Cart
