"use client";

import { createContext, useState, useEffect, useMemo } from "react";

// Création de mon context
export const CartContext = createContext();

// La fonction provider
export const CartProvider = (props) => {

    // États de mes données
    const [cart, setCart] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    const addToCart = (item, mainImage, size, color) => {
        setCart((prevCart) => {
            // Vérifier l'existence d'un produit avec le même id, size et color dans le panier
            const existingItem = prevCart.find((itemExist) =>
                itemExist._id === item._id &&
                itemExist.selectedSize === size &&
                itemExist.selectedColor === color
            );

            if (existingItem) {
                // Si le même produit avec la même taille et couleur existe, augmenter seulement la quantité
                return prevCart.map((itemExist) =>
                    itemExist._id === item._id &&
                        itemExist.selectedSize === size &&
                        itemExist.selectedColor === color
                        ? { ...itemExist, qty: itemExist.qty + 1 }
                        : itemExist
                );
            } else {
                // Sinon, ajouter le produit comme un nouvel élément dans le panier
                return [
                    ...prevCart,
                    { ...item, img:mainImage, name:item.name, promotion:item.is_promo, price:item.is_promo ? item.promo_price : item.price, qty: 1, selectedSize: size, selectedColor: color }
                ];
            }
        });
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 1000); // Durée de l'animation
    };



    useEffect(() => {
        // Récupère le contenu du panier depuis localStorage lors du montage
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);


    useEffect(() => {
        // Sauvegarde le panier dans localStorage à chaque modification
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const removeFromCart = (itemId, size, color) => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) =>
                    item._id !== itemId ||
                    item.selectedSize !== size ||
                    item.selectedColor !== color
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        console.log("Contenu du panier après mise à jour:", cart);
    }, [cart]);


    const incrementQuantity = (itemId, size, color) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === itemId &&
                    item.selectedSize === size &&
                    item.selectedColor === color
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (itemId, size, color) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item._id === itemId &&
                        item.selectedSize === size &&
                        item.selectedColor === color
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter((item) => item.qty > 0) // Supprime les articles avec une quantité de 0
        );
    };


    const total = useMemo(() => {
        return cart.reduce((total, item) => total + item.price * item.qty, 0);
    }, [cart]);

    const nombreArticles = useMemo(() => {
        return cart.reduce((count, item) => count + item.qty, 0);
    }, [cart]);


    const contextValue = {
        cart,
        setCart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
        total,
        nombreArticles,
        isAdded
    };

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
}