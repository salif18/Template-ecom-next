"use client"
import React, { useState } from 'react'
import styles from "../styles/_productCard.module.scss"
import GeneredStarRating from '../utils/generatedStars'
import { BiCartDownload } from "react-icons/bi";
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const handleGoToSingleProduct = (id) => {
    router.push(`/products/${id}`)
  }

  const firstImage = product.othersColors[0]
  const [mainImage, setMainImage] = useState(firstImage.images);
  const otherColors = product.othersColors ? product.othersColors : []
  // Fonction pour changer l'image principale
  const changeImage = (imgSrc) => {
    setMainImage(imgSrc);
  };
  return (
    <article className={styles.productCard} >
      <figure>
        <img src={mainImage} alt={product.name} onClick={() => handleGoToSingleProduct(product.id)} />
        <div onClick={() => handleGoToSingleProduct(product.id)}>
          <BiCartDownload className={styles.icon} />
          <span>Ajouter au panier</span>
        </div>
      </figure>
      <section className={styles.details}>
      <div className={styles.colory}>
          <ul>
            {otherColors.map(other => (
              <li key={other.color}>
                <div
                  style={{ backgroundColor: other.color }}
                  onClick={() => changeImage(other.images)}
                  className={styles.colorSwatch}
                ></div>
              </li>
            ))}
          </ul>
        </div>
        <h2 onClick={() => handleGoToSingleProduct(product.id)}>{product.name}</h2>
        <p className={styles.categoName}>{product.category}</p>
        <p className={styles.subCategoName}>{product.subCategory}</p>
        <GeneredStarRating rating={product.rating} />  
        <h2 className={styles.price}>{product.price} FCFA</h2>
        
      </section>
    </article>
  )
}

export default ProductCard
