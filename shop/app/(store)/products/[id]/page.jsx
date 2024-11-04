"use client"

import LayoutPage from '@/app/layouts/Layout'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import styles from "../../../styles/_single.module.scss"
import Image from 'next/image'
import data from "../../../lib/fakedata"
import GeneredStarRating from '@/app/utils/generatedStars'

const SingleProduct = () => {
    const { id } = useParams()

    const product = data.find(item => item.id == id)

   
    // États pour les menus
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);
    
    const commentsRef = useRef(null);
    const reviewsRef = useRef(null);

    // Fonctions pour ouvrir ou fermer chaque menu
    const toggleCommentsMenu = () => {
        setIsCommentsOpen((prev) => !prev);
        setIsReviewsOpen(false); // Ferme le menu Avis si ouvert
    };

    const toggleReviewsMenu = () => {
        setIsReviewsOpen((prev) => !prev);
        setIsCommentsOpen(false); // Ferme le menu Commentaires si ouvert
    };


    return (
        <LayoutPage>
            <main className={styles.singlePage}>
                <div className={styles.row1}>
                    <div className={styles.left}>

                        <div className={styles.galleries}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <img src={product.img} alt='' />

                        <div className={styles.colory}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <span>{product.sousCategory}</span>
                        <h1>{product.name}</h1>
                        <h2>{product.price} fcfa</h2>
                        <p>{product.description}</p>
                        <div></div>
                        <div className={styles.btnContainer}>
                            <button className={styles.btnAdd}>Ajouter au panier</button>
                        </div>

                        <p>categorie: <span>{product.category}</span></p>
                        <span className={styles.rating}><GeneredStarRating rating={product.rating} /></span>
                    </div>
                </div>
                <div className={styles.row2}>

                    <nav>
                    <h2 onClick={toggleCommentsMenu}>Commentaires</h2>
                    <h2 onClick={toggleReviewsMenu}>Avis</h2>
                    </nav>

                    <div className={styles.drops}>

                        {isCommentsOpen && (
                            <div className={styles.dropdowncontent} ref={commentsRef}>
                            <div className={styles.formCommenter}>
                               <h1>Soyez le premier à laisser votre avis </h1>
                                <p>Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont marqués d’un *</p>

                                <h2>Votre évaluation *</h2>
                                <h2>Votre nom*</h2>
                                <input type='text' placeholder='Nom' />
                                <h2>Votre avis *</h2>
                                <textarea type='text' placeholder='votre commentaaire'></textarea>
                                <button className={styles.btnCommenter}>Commenter</button>
                               </div>
                            </div>
                        )}

                        {isReviewsOpen && (
                            <div className={styles.dropdowncontent} ref={reviewsRef}>
                                <a href="#">Avis 1</a>
                                <a href="#">Avis 2</a>
                                <a href="#">Avis 3</a>
                            </div>
                        )}
                       
                    </div>
                </div>
                <div>
                    <h2>Autres recommandations du produit</h2>
                </div>
                <div>
                    <h2>Les produits liés à cette catégorie</h2>
                </div>
            </main>
        </LayoutPage>
    )
}

export default SingleProduct
