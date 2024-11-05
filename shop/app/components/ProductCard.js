"use client"
import React from 'react'
import styles from "../styles/_productCard.module.scss"
import GeneredStarRating from '../utils/generatedStars'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const handleGoToSingleProduct=(id)=>{
    router.push(`/products/${id}`)
  }
  return (
    <article className={styles.productCard} onClick={()=>handleGoToSingleProduct(product.id)}>
      <figure>
        <img src={product.img} alt={product.name} />
        <div>
         <LocalMallOutlinedIcon className={styles.icon} />
         <span>Ajouter au panier</span>
        </div>
      </figure>
      <section className={styles.details}>
        <h2>{product.name}</h2>
        <p className={styles.categoName}>{product.category}</p>
        <p className={styles.subCategoName}>{product.sousCategory}</p>
        <h2 className={styles.price}>{product.price} FCFA</h2>
        {/* <GeneredStarRating rating={product.rating} /> */}
      </section>
    </article>
  )
}

export default ProductCard
