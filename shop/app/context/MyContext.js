"use client";

import { createContext, useState, useEffect } from "react";



// Création de mon context
export const MyStore = createContext();

// La fonction provider
export const MyStoreProvider = (props) => {

    // États de mes données
    const [cart, setCart] = useState([]);

    const addToCart = (item, size, color) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((itemExist) => itemExist.id === item.id);

            if (existingItem) {
                return prevCart.map((itemExist) =>
                    itemExist.id === item.id ? { ...itemExist, qty: itemExist.qty + 1, selectedSize: size, selectedColor: color } : itemExist
                );
            } else {
                return [...prevCart, { ...item, qty: 1, selectedSize: size, selectedColor: color }];
            }
        });
    };

    useEffect(() => {
        console.log("Contenu du panier après mise à jour:", cart);
    }, [cart]);



    const contextValue = {
        cart: cart,
        setCart: setCart,
        addToCart: addToCart
    };

    return (
        <MyStore.Provider value={contextValue}>
            {props.children}
        </MyStore.Provider>
    );
}