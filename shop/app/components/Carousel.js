import { useState, useEffect } from "react";

const Carousel = ({ items, autoScroll = true, intervalTime = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
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
      {/* Boutons de navigation */}
      <button className="nav-button prev" onClick={goToPrevious}>
        ❮
      </button>
      <button className="nav-button next" onClick={goToNext}>
        ❯
      </button>

      {/* Conteneur des éléments */}
      <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            {item}
          </div>
        ))}
      </div>

      {/* Indicateurs */}
      <div className="indicators">
        {items.map((_, index) => (
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
