"use client";
import { useState, useEffect } from "react";
import data from "../lib/data";
import ProductCard from "./ProductCard";

const Carousel = () => {
  const intervalTime = 3000;
  const autoScroll = true;
  const visibleItems = 4;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calcul du nombre de groupes
  const totalItems = data.slice(0, 6).length;
  const maxIndex = Math.ceil(totalItems / visibleItems) - 1;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(goToNext, intervalTime);
      return () => clearInterval(interval);
    }
  }, [currentIndex, autoScroll, intervalTime]);

  return (
    <div className="carousel-container">
      <button className="nav-button prev" onClick={goToPrevious}>
        ❮
      </button>
      <button className="nav-button next" onClick={goToNext}>
        ❯
      </button>

      {/* Conteneur des éléments */}
      <div
        className="carousel"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
        }}
      >
        {data.slice(0, 6).map((item, index) => (
          <div key={index} className="carousel-item">
            <ProductCard product={item} />
          </div>
        ))}
      </div>

      {/* Indicateurs */}
      <div className="indicators">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
