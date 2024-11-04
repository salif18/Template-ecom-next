"use client"

import LayoutPage from '@/app/layouts/Layout'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import styles from "../../../styles/_single.module.scss"
import data from "../../../lib/fakedata"
import GeneredStarRating from '@/app/utils/generatedStars'
import ProductCard from '@/app/components/ProductCard'

const SingleProduct = () => {
    const { id } = useParams()


    const product = data.find(item => item.id == id);
    const productGallery = product.gallery ? product.gallery : [];
    const otherColors = product.otherColors ? product.otherColors : []
    const recommandations = data.filter(item => item.name.includes(product.name))
    const relatedCategory = data.filter(item => item.category.includes(product.category))

    const [mainImage, setMainImage] = useState(product.img);

    // Fonction pour changer l'image principale
    const changeImage = (imgSrc) => {
        setMainImage(imgSrc);
    };

    // Etat de choix de size et color
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');


    // États pour les menudrop cacher
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

    // etat pour la notation
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    // quand le souris survol
    const handleMouseEnter = (value) => {
        setHoveredRating(value);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    // quand on clik
    const handleClick = (value) => {
        setRating(value);
    };



    return (
        <LayoutPage>
            <main className={styles.singlePage}>
                <div className={styles.row1}>
                    <div className={styles.left}>

                        <div className={styles.galleries}>
                            <ul>
                                {
                                    productGallery.map(photo =>
                                        <li key={photo}>
                                            <img src={photo} onClick={() => changeImage(photo)} />
                                        </li>
                                    )
                                }</ul>
                        </div>

                        <img src={mainImage} alt='' />

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
                    </div>
                    <div className={styles.right}>
                        <span>{product.sousCategory}</span>
                        <h1>{product.name}</h1>
                        <h2>{product.price} fcfa</h2>
                        <p>{product.description}</p>

                        <div className={styles.selectedOptions}>
                            {/* Options de couleur */}
                            {product.otherColors.length > 0 && (
                                <div className={styles.options}>
                                    <label>Couleur </label>
                                    <div className={styles.colorContainer}>
                                        {otherColors.map((element, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.colorSwatch} ${selectedColor === element.color ? styles.selected : ''
                                                    }`}
                                                style={{ backgroundColor: element.color }}
                                                onClick={() => setSelectedColor(element.color)}
                                            >
                                                {/* Optionnel : Ajoutez un indicateur pour la couleur sélectionnée */}
                                                {selectedColor === element.color && <span className={styles.checkmark}>✔</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Options de taille */}
                            <div className={styles.options}>
                                {product.category === "Vetements" && (
                                    <>
                                        <label htmlFor="vetement-size">Taille</label>
                                        <select
                                            id="vetement-size"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            {product.sizes.map((size, index) => (
                                                <option key={index} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                )}

                                {product.category === "Chaussures" && (
                                    <>
                                        <label htmlFor="chaussure-size">Pointure</label>
                                        <select
                                            id="chaussure-size"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            {product.sizes.map((size, index) => (
                                                <option key={index} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                )}
                            </div>
                        </div>

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

                                    <section className={styles.ratingSection}>
                                        <h2>Votre évaluation *</h2>
                                        <section className={styles.stars} id="stars">
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    className={`${styles.star} ${value <= (hoveredRating || rating) ? styles.active : ''}`}
                                                    data-value={value}
                                                    onMouseEnter={() => handleMouseEnter(value)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={() => handleClick(value)}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </section>
                                        <span className={styles.ratingMessage}>
                                            {rating > 0 ? `Vous avez donné une note de ${rating} étoile(s).` : 'Sélectionnez une note.'}
                                        </span>
                                    </section>
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
                <div className={styles.row3}>
                    <h2>Autres recommandations du produit</h2>
                    <ul className={styles.productList}>
                        {
                            recommandations.map((product) =>
                                <li key={product.id}><ProductCard product={product} /></li>
                            )
                        }
                    </ul>
                </div>
                <div className={styles.row4}>
                    <h2>Les produits liés à cette catégorie</h2>
                    <ul className={styles.productList}>
                        {
                            relatedCategory.map((product) =>
                                <li key={product.id}><ProductCard product={product} /></li>
                            )
                        }
                    </ul>
                </div>
            </main>
        </LayoutPage>
    )
}

export default SingleProduct
