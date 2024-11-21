"use client"

import React, { useState } from 'react';
import styles from "../styles/_newCard.module.scss"
import { useRouter } from 'next/navigation';

const NewCard = ({product}) => {
    const router = useRouter();
    const handleGoToSingleProduct = (id) => {
      router.push(`/products/${id}`)
    }

    const [mainImage] = useState(product?.image);

  return (
    <article className={styles.newCard} >
      <figure>
        <img src={mainImage} alt={product.name} onClick={() => handleGoToSingleProduct(product._id)} />
      </figure>
      <section className={styles.details}>
        <h2 onClick={() => handleGoToSingleProduct(product._id)}>{product.name}</h2>
        <p className={styles.subCategoName}>{product.subCategory}</p>  
      </section>
    </article>
  )
}

export default NewCard
