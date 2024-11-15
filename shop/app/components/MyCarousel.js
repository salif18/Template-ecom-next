"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const MyCarousel = ({ data }) => {
  const autoScroll = true;
  const totalItems = data.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems ,setVisibleItems] = useState(5);
  const [direction, setDirection] = useState(1); // 1 pour suivant, -1 pour précédent

  
  // Fonction pour changer d'image en suivant la direction
  const handleChangeDirection = (manualDirection = null) => {
    const actualDirection = manualDirection !== null ? manualDirection : direction;

    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + actualDirection;

      // Si on atteint la fin ou le début, inverse la direction
      if (newIndex >= totalItems - visibleItems) {
        setDirection(-1); // Inverser pour aller dans la direction opposée
        return totalItems - visibleItems;
      }
      if (newIndex < 0) {
        setDirection(1); // Inverser pour aller dans la direction opposée
        return 0;
      }

      return newIndex;
    });
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
      const interval = setInterval(() => handleChangeDirection(), 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, autoScroll]);


  return (
    <div className="Mycarousel-container">
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
        {data.map((item, index) => (
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

export default MyCarousel;
