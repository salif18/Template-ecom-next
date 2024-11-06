"use client"
import React, { useState } from 'react'
import styles from "../styles/_productCard.module.scss"
import GeneredStarRating from '../utils/generatedStars'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const handleGoToSingleProduct = (id) => {
    router.push(`/products/${id}`)
  }
  const [mainImage, setMainImage] = useState(product.img);
  const otherColors = product.otherColors ? product.otherColors : []
  // Fonction pour changer l'image principale
  const changeImage = (imgSrc) => {
    setMainImage(imgSrc);
  };
  return (
    <article className={styles.productCard} >
      <figure>
        <img src={mainImage} alt={product.name} onClick={() => handleGoToSingleProduct(product.id)} />
        <div onClick={() => handleGoToSingleProduct(product.id)}>
          <LocalMallOutlinedIcon className={styles.icon} />
          <span>Ajouter au panier</span>
        </div>
      </figure>
      <section className={styles.details}>
        <h2 onClick={() => handleGoToSingleProduct(product.id)}>{product.name}</h2>
        <p className={styles.categoName}>{product.category}</p>
        <p className={styles.subCategoName}>{product.sousCategory}</p>
        <h2 className={styles.price}>{product.price} FCFA</h2>
        {/* <GeneredStarRating rating={product.rating} /> */}
        <div className={styles.colory}>
          <ul>
            {otherColors.map(other => (
              <li key={other.color}>
                <div
                  style={{ backgroundColor: other.color }}
                  onClick={() => changeImage(other.image)}
                  className={styles.colorSwatch}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}

export default ProductCard
