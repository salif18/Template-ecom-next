"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BiCartDownload } from "react-icons/bi";
import styles from "../styles/_populaireCard.module.scss"
import GeneredStarRating from '../utils/generatedStars'

const PopulairCard = ({product}) => {
    const router = useRouter();
    const handleGoToSingleProduct = (id) => {
      router.push(`/products/${id}`)
    }

  
    const [mainImage, setMainImage] = useState(product?.image);
    
    // Fonction pour changer l'image principale
    const changeImage = (imgSrc) => {
      setMainImage(imgSrc);
    };

  return (
    <article className={styles.populaireCard} >
    <figure>
      <img src={mainImage} alt={product.name} onClick={() => handleGoToSingleProduct(product._id)} />
      <div onClick={() => handleGoToSingleProduct(product._id)}>
        <BiCartDownload className={styles.icon} />
        <span>Ajouter au panier</span>
      </div>
    </figure>
    <section className={styles.details}>
      <h2 onClick={() => handleGoToSingleProduct(product._id)}>{product.name}</h2>
      <p className={styles.categoName}>{product.category}</p>
      <p className={styles.subCategoName}>{product.subCategory}</p>
      <h2 className={styles.price}>{product.price} FCFA</h2>
      {product.rating >= 20 && <GeneredStarRating rating={product.rating} />}
    </section>
  </article>
  )
}

export default PopulairCard
