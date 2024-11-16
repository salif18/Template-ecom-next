"use client"

import LayoutPage from '@/app/layouts/Layout'
import { useParams } from 'next/navigation'
import React, { useContext, useRef, useState } from 'react'
import styles from "../../../styles/_single.module.scss"
import data from "../../../lib/data"
import GeneredStarRating from '@/app/utils/generatedStars'
import { CartContext } from '@/app/context/CartContext'
import { FaCheck } from 'react-icons/fa'; // Import de l'icône FaCheck
import MyCarousel from '@/app/components/MyCarousel'

const SingleProduct = () => {
    const { addToCart, isAdded } = useContext(CartContext);
    const { id } = useParams()


    const product = data.find(item => item.id == id);
    const otherColors = product.othersColors ? product.othersColors : []
    const firstImage = product.othersColors[0]

    // Liste des termes à vérifier dans le nom du produit
    const searchTerms = product.name.split(" "); // Diviser le nom du produit en mots individuels

    const recommandations = data.filter(item =>
        item.category.includes(product.category) &&
        item.subCategory.includes(product.subCategory) &&
        searchTerms.some(term =>
            item.name.toLowerCase().includes(term.toLowerCase())
        )
    );

    // const relatedCategory = data.filter(item => item.category.includes(product.category))

    const [mainImage, setMainImage] = useState(firstImage.images);

    // Fonction pour changer l'image principale
    const changeImage = (imgSrc) => {
        setMainImage(imgSrc);
    };

    // Etat de choix de size et color
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleChangeProduct = (index, element) => {
        setSelectedColor(element.color);
        setMainImage(element.images)
        setSelectedColorIndex(index);
    }

    // RECUPERER UNIQUEMENT LES SIZE DU PRODUIT SELECTIONNER PAR SON INDEX
    const currentColor = product.othersColors[selectedColorIndex];


    // États pour les menudrop cacher
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');

    const commentsRef = useRef(null);
    const reviewsRef = useRef(null);

    // Fonctions pour ouvrir ou fermer chaque menu
    const toggleCommentsMenu = () => {
        setIsCommentsOpen((prev) => !prev);
        setIsReviewsOpen(false); // Ferme le menu Avis si ouvert
        setActiveTab('comments');
    };

    const toggleReviewsMenu = () => {
        setIsReviewsOpen((prev) => !prev);
        setIsCommentsOpen(false); // Ferme le menu Commentaires si ouvert
        setActiveTab('reviews');
    };

    // etat pour la notation
    const [rating, setRating] = useState(0);

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
                                    otherColors.map((photo, index) =>
                                        <li key={index}>
                                            <img src={photo.images} onClick={() => changeImage(photo.images)} />
                                        </li>
                                    )
                                }</ul>
                        </div>
                        <img src={mainImage} alt='' />
                    </div>
                    <div className={styles.right}>
                        <span>{product.subCategory}</span>
                        <h1>{product.name}</h1>
                        <h2>{product.price} fcfa</h2>
                        <p>{product.description}</p>

                        <div className={styles.selectedOptions}>
                            {/* Options de couleur */}
                            {otherColors.length > 0 && (
                                <div className={styles.options}>
                                    <label>Couleurs disponibles </label>
                                    <div className={styles.colorContainer}>
                                        {otherColors.map((element, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.colorSwatch} ${selectedColor === element.color ? styles.selected : ''
                                                    }`}
                                                style={{ backgroundColor: element.color }}
                                                onClick={() => handleChangeProduct(index, element)}
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
                                        <label htmlFor="vetement-size">Tailles disponibles</label>
                                        <select
                                            id="vetement-size"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            {currentColor.sizes.length > 0 &&
                                                currentColor.sizes.map((size, index) => (
                                                    <option key={index} value={size.size}>
                                                        {size.size}
                                                    </option>
                                                ))}
                                        </select>
                                    </>
                                )}

                                {product.category === "Chaussures" && (
                                    <>
                                        <label htmlFor="chaussure-size">Pointures disponibles</label>
                                        <select
                                            id="chaussure-size"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            {currentColor.sizes.length > 0 &&
                                                currentColor.sizes.map((size, index) => (
                                                    <option key={index} value={size.size}>
                                                        {size.size}
                                                    </option>
                                                ))}
                                        </select>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className={styles.btnContainer}>
                            <button className={`${styles.btnAdd} ${isAdded ? styles.added : ''}`} onClick={() => addToCart(product, mainImage, selectedSize, selectedColor)}>{isAdded ? <>Ajouté <FaCheck /> </> : 'Ajouter au panier'}</button>
                        </div>

                        <p>categorie: <span>{product.category}</span></p>
                        <span className={styles.rating}><GeneredStarRating rating={product.rating} /></span>
                    </div>
                </div>
                <div className={styles.row2}>

                    <nav>
                        <h2
                            onClick={toggleCommentsMenu}
                            className={activeTab === 'comments' ? styles.active : ''}
                        >
                            Donner une note
                        </h2>
                        <h2
                            className={activeTab === 'reviews' ? styles.active : ''}
                            onClick={toggleReviewsMenu}
                        >
                            Voir les commentaires
                        </h2>
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
                                                    className={`${styles.star} ${value <= rating ? styles.active : ''}`}
                                                    data-value={value}
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
                                <h1>Les avis</h1>
                                <div className={styles.commentaireContainer}>
                                    <di className={styles.avisCard}>
                                        <h2>★★★★</h2>
                                        <p className={styles.date}>02/11/2024</p>
                                        <p className={styles.text}>parfait , bon rapport qualité/prix</p>
                                    </di>
                                    <di className={styles.avisCard}>
                                        <h2>★★★</h2>
                                        <p className={styles.date}>02/11/2024</p>
                                        <p className={styles.text}>parfait , bon rapport qualité/prix</p>
                                    </di>
                                    <di className={styles.avisCard}>
                                        <h2>★★★★★</h2>
                                        <p className={styles.date}>02/11/2024</p>
                                        <p className={styles.text}>parfait , bon rapport qualité/prix</p>
                                    </di>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
                <div className={styles.row3}>
                    <h2 className={styles.h2}>Vous aimerez aussi</h2>
                    <ul className={styles.productList}>
                        <MyCarousel data={recommandations} />
                    </ul>
                </div>

            </main>
        </LayoutPage>
    )
}

export default SingleProduct
