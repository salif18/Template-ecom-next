"use client"
import React, { useState } from 'react'
import styles from "../styles/_offreCard.module.scss"
import { useRouter } from 'next/navigation';

const OffreCard = ({ product }) => {
  const router = useRouter();

  const handleGoToSingleProduct = (id) => {
    router.push(`/products/${id}`);
  }
  

  const [mainImage] = useState(product?.image);
 
  return (
    <article className={styles.OffreCard} >
      <figure>
        <img src={mainImage} alt={product.name} onClick={()=>handleGoToSingleProduct(product._id)} />
      </figure>
      <section className={styles.details}>
        <h2>{product.name}</h2>
        <button  onClick={()=>handleGoToSingleProduct(product._id)}>Achetez maintenant</button>
      </section>
    </article>
  )
}

export default OffreCard
