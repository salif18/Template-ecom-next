"use client"
import React, { useState } from 'react'
import styles from "../styles/_categoryCard.module.scss"
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useRouter } from 'next/navigation';

const CategoryCard = ({ product }) => {
  const router = useRouter();

  const handleGoToSingleProduct = () => {
    router.push(`/products?category=${product.category}`);
  }
  

  const firstImage = product.othersColors[2]
  const [mainImage] = useState(firstImage.images);
 
  return (
    <article className={styles.categoryCard} >
      <figure>
        <img src={mainImage} alt={product.name} onClick={handleGoToSingleProduct} />
        <div onClick={handleGoToSingleProduct}>
          <LocalMallOutlinedIcon className={styles.icon} />
          <span>Categorie {product.category}</span>
        </div>
      </figure>
      <section className={styles.details}>
        <h2 onClick={handleGoToSingleProduct}>{product.name}</h2>
        <p className={styles.categoName}>{product.category}</p>
      </section>
    </article>
  )
}

export default CategoryCard
