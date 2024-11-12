"use client"
import React, { useState } from 'react'
import styles from "../styles/_categoryCard.module.scss"
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useRouter } from 'next/navigation';
import { BiSolidCategory } from "react-icons/bi";

const CategoryCard = ({ product }) => {
  const router = useRouter();

  const handleGoToSingleProduct = () => {
    localStorage.setItem("categorie",product.category);
    router.push(`/products`);
    // router.push(`/products?category=${product.category}`);
  }
  

  const firstImage = product.othersColors[2]
  const [mainImage] = useState(firstImage.images);
 
  return (
    <article className={styles.categoryCard} >
      <figure>
        <img src={mainImage} alt={product.name} onClick={handleGoToSingleProduct} />
        <div onClick={handleGoToSingleProduct}>
          <BiSolidCategory  className={styles.icon} />
          <span>Categorie {product.category}</span>
        </div>
      </figure>
      <section className={styles.details}>
        <p className={styles.categoName}>{product.category}</p>
      </section>
    </article>
  )
}

export default CategoryCard
