import { useState, useEffect } from "react";

const Slider = ({ images, autoScroll = true, intervalTime = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonctions pour passer à l'image précédente et suivante
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fonction pour aller directement à un slide spécifique (quand on clique sur un indicateur)
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Défilement automatique
  useEffect(() => {
    if (autoScroll) {
      const slideInterval = setInterval(goToNext, intervalTime);
      return () => clearInterval(slideInterval);
    }
  }, [currentIndex, autoScroll, intervalTime]);

  return (
    <div className="slider-container">
      {/* Boutons de navigation */}
      <button className="nav-button prev" onClick={goToPrevious}>
        ❮
      </button>
      <button className="nav-button next" onClick={goToNext}>
        ❯
      </button>

      {/* Conteneur des slides */}
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>

      {/* Indicateurs */}
      <div className="indicators">
        {images.map((_, index) => (
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

export default Slider;
