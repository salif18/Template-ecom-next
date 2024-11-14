"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const Carousel = ({ data }) => {
  const autoScroll = true;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems ,setVisibleItems] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Créer une nouvelle liste avec les éléments dupliqués au début et à la fin
  const duplicatedData = [
    ...data.slice(-visibleItems), // Derniers éléments ajoutés au début
    ...data,
    ...data.slice(0, visibleItems), // Premiers éléments ajoutés à la fin
  ];

  const totalItems = duplicatedData.length;

  
  // Fonction pour changer de direction
  const handleChangeDirection = (direction) => {
    if (isTransitioning) return; // Éviter d'appeler pendant une transition
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      (prevIndex + direction + totalItems) % totalItems
    );
  };

// Changer le nombre a afficher en mode responsive
  useEffect(() => {
    const updateItemVisible = () => {
        setVisibleItems(window.innerWidth < 768 ? 2 : 5);
    };
    updateItemVisible();

    window.addEventListener('resize', updateItemVisible);

    return () => window.removeEventListener('resize', updateItemVisible);
}, []);

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => handleChangeDirection(1), 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, autoScroll]);


  useEffect(() => {
    // Réinitialiser l'index sans transition en cas de dépassement (loop effect)
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(data.length); // Repositionner à la fin
      }, 500);
    } else if (currentIndex === totalItems - visibleItems) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(visibleItems); // Repositionner au début
      }, 500);
    } else {
      setIsTransitioning(false);
    }
  }, [currentIndex, totalItems, data.length, visibleItems]);

  return (
    <div className="carousel-container">
      <button className="nav-button prev" onClick={() => handleChangeDirection(-1)}>
        ❮
      </button>
      <button className="nav-button next" onClick={() => handleChangeDirection(1)}>
        ❯
      </button>

      {/* Conteneur des éléments */}
      <div
        className="carousel"
        style={{
          transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`,
        }}
      >
        {duplicatedData.map((item, index) => (
          <div key={index} className="carousel-item"
           style={{ minWidth: `${100 / visibleItems}%` }} 
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
