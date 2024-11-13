"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const MyCarousel = ({ data }) => {
    const slideData = data.reverse().slice(0, 5);
    const dataLength = slideData.length;
    const [currentIndex, setCurrentIndex] = useState(0);

    const [itemVisible, setItemVisible] = useState(4);


    useEffect(() => {
        const updateItemVisible = () => {
            setItemVisible(window.innerWidth < 768 ? 1 : 4);
        };
        updateItemVisible();

        window.addEventListener('resize', updateItemVisible);

        return () => window.removeEventListener('resize', updateItemVisible);
    }, []);

    // Changer la direction
    const handleChangeDirection = (direction) => {
        setCurrentIndex((prevIndex) => (prevIndex + direction + dataLength) % dataLength);
    };

    // Obtenir les éléments visibles
    const visibles = () => {
        const items = [];
        for (let i = 0; i < itemVisible; i++) {
            items.push(data[(currentIndex + i) % dataLength]);
        }
        return items;
    };


    return (
        <section className="my-carousel-container">
            <button className="prev" onClick={() => handleChangeDirection(-1)}>
                ❮
            </button>
            <section className="carousels">
                {visibles().map((product, index) => (
                    <div key={index} className="carousel-item">
                        {product}
                    </div>
                ))}
            </section>
            <button className="next" onClick={() => handleChangeDirection(1)}>
                ❯
            </button>
        </section>
    );
};

export default MyCarousel;
