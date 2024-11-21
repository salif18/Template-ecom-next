"use client"
import React, { useEffect, useState } from 'react'
import styles from "../styles/_productCard.module.scss"
import GeneredStarRating from '../utils/generatedStars'
import { BiCartDownload } from "react-icons/bi";
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [otherColors , setOthersColors] = useState([])
  const [mainImage , setMainImage] = useState(null)

     
 // Met à jour les autres états liés au produit
 useEffect(() => {
  if (product) {
      setMainImage(product.image || null);
      setOthersColors(product?.othersColors || []);
  }
}, [product]);

  const handleGoToSingleProduct = (id) => {
    router.push(`/products/${id}`)
  }

 
  // const [mainImage, setMainImage] = useState(product?.image);
  // const otherColors = product.othersColors ? product.othersColors : []
  // Fonction pour changer l'image principale
  const changeImage = (imgSrc) => {
    setMainImage(imgSrc);
  };
  return (
    <article className={styles.productCard} >
      <figure>
        <img src={mainImage} alt={product.name} onClick={() => handleGoToSingleProduct(product._id)} />
        <div onClick={() => handleGoToSingleProduct(product._id)}>
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
        <h2 onClick={() => handleGoToSingleProduct(product._id)}>{product.name}</h2>
        <p className={styles.categoName}>{product.category}</p>
        <p className={styles.subCategoName}>{product.subCategory}</p>
        <GeneredStarRating rating={product.rating} />  
        <div style={{display:"flex", gap:"10px", fontSize:"0.8em"}}>
        <h2 className={styles.price} style={{textDecoration: product.is_promo && "line-through", color: product.is_promo && "#999999"}}>{product.price} FCFA</h2>
        {product.is_promo && <h2 className={styles.price}>{product.promo_price} FCFA</h2>}
        </div>
      </section>
    </article>
  )
}

export default ProductCard
