"use client"

import LayoutPage from '@/app/layouts/Layout'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "../../../styles/_single.module.scss"
import GeneredStarRating from '@/app/utils/generatedStars'
import { CartContext } from '@/app/context/CartContext'
import { FaCheck } from 'react-icons/fa'; // Import de l'icône FaCheck
import MyCarousel from '@/app/components/MyCarousel'
import axios from 'axios'
import { AuthContext } from '@/app/context/AuthContext'
import GeneredStarUser from '@/app/utils/generedStarUser'

const SingleProduct = () => {
    const { id } = useParams()
    const { addToCart, isAdded } = useContext(CartContext);
    const { userId } = useContext(AuthContext)
    const [product, setProduct] = useState(null)
    const [recommandations, setRecommandations] = useState([])
    const [commentaires, setCommentaires] = useState([]);
    const [otherColors, setOthersColors] = useState([])
    const [mainImage, setMainImage] = useState(null)


    //recuperer le produit et les recommandations
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_URI}/products/single/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `, // Ajoutez le token si nécessaire
                    },
                });
                if (res.status === 200) {
                    setProduct(res.data.produit);
                    setRecommandations(res.data.recommandations);
                    console.log(res.data.produit)
                }

            } catch (err) {
                console.error("Erreur lors de la récupération du produit :", err);
            }
        };

        getProducts();
    }, [id]);


    // Met à jour les autres états liés au produit
    useEffect(() => {
        if (product) {
            setMainImage(product.image || null);
            setOthersColors(product?.othersColors || []);
        }
    }, [product]);


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
    const currentColor = otherColors[selectedColorIndex] || {};

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
    const [comment, setComment] = useState("");
    const [userName, setUserName] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState("");

    const handleClick = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation des champs
        if (!comment || !userName) {
            setIsValid(false); // Affichez un message d'erreur à l'utilisateur
            setMessage("Veuillez rentrer tous les champs!.")
            return;
        }

        const avis = {
            userId: userId,
            user: userName,
            rating: rating,
            commentaires: comment
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URI}/commentaires/${id}`, avis, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer `,
                },
            });
            if (response.status === 200) {
                setProduct(response?.data?.produit)
            }
        } catch (e) {
            console.error(e.response?.data?.message || "error")
        }
    }

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

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
                        <span>{product?.subCategory}</span>
                        <h1>{product?.name}</h1>

                        <div style={{ display: "flex", gap: "10px", fontSize: "0.8em" }}>
                            <h2 style={{ textDecoration: product?.is_promo && "line-through", color: product?.is_promo && "#999999" }}>{product?.price} FCFA</h2>
                            {product?.is_promo && <h2 className={styles.price}>{product?.promo_price} FCFA</h2>}
                        </div>
                        <p>{product?.description}</p>

                        <div className={styles.selectedOptions}>
                            {/* Options de couleur */}
                            {otherColors?.length > 0 && (
                                <div className={styles.options}>
                                    <label>Couleurs disponibles </label>
                                    <div className={styles.colorContainer}>
                                        {otherColors?.map((element, index) => (
                                            element.stock > 0 &&
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
                                {product?.category === "Vêtements" && (
                                    <>
                                        <label htmlFor="vetement-size">Tailles disponibles</label>
                                        <select
                                            id="vetement-size"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            {currentColor?.sizes?.length > 0 &&
                                                currentColor?.sizes?.map((size, index) => (
                                                    <>
                                                        {size.stock > 0 && <option key={index} value={size.size}>
                                                            {size.size}
                                                        </option>}
                                                    </>
                                                ))}
                                        </select>
                                    </>
                                )}

                                {product?.category === "Chaussures" && (
                                    <>
                                        <label htmlFor="chaussure-size">Pointures disponibles</label>
                                        <select
                                            id="chaussure-size"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            {currentColor?.sizes?.length > 0 &&
                                                currentColor?.sizes?.map((size, index) => (
                                                    <>
                                                        {size.stock > 0 && <option key={index} value={size.size}>
                                                            {size.size}
                                                        </option>}
                                                    </>
                                                ))}
                                        </select>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className={styles.btnContainer}>
                            <button className={`${styles.btnAdd} ${isAdded ? styles.added : ''}`} onClick={() => addToCart(product, mainImage, selectedSize, selectedColor)}>{isAdded ? <>Ajouté <FaCheck /> </> : 'Ajouter au panier'}</button>
                        </div>

                        <p>categorie: <span>{product?.category}</span></p>
                        <span className={styles.rating}><GeneredStarRating rating={product?.rating} /></span>
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
                                    <input type='text' name='userName' value={userName} style={{ border: !isValid && !userName && "1px solid red" }} onChange={(e) => setUserName(e.target.value)} placeholder='Nom' />
                                    {(!isValid && !userName) && <p style={{ color: !isValid && "red", fontSize: "0.8em" }} >{message}</p>}
                                    <h2>Votre avis *</h2>
                                    <textarea type='text' value={comment} style={{ border: !isValid && !comment && "1px solid red" }} onChange={(e) => setComment(e.target.value)} placeholder='votre commentaaire'></textarea>
                                    {(!isValid && !comment) && <p style={{ color: !isValid && "red", fontSize: "0.8em" }} >{message}</p>}
                                    <button className={styles.btnCommenter} onClick={(e) => handleSubmit(e)}>Commenter</button>
                                </div>
                            </div>
                        )}

                        {isReviewsOpen && (
                            <div className={styles.dropdowncontent} ref={reviewsRef}>
                                <h1>Les avis</h1>
                                <div className={styles.commentaireContainer}>
                                    {product?.commentaires?.map((item) =>
                                        <div className={styles.avisCard}>
                                            <p className={styles.date}>{item.name}</p>
                                            <h2><GeneredStarUser rating={item.rating} /></h2>
                                            <p className={styles.date}>{new Date(item?.date).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                            <p className={styles.text}>{item.avis}</p>
                                        </div>
                                    )}
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
