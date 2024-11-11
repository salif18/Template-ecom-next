"use client"
import { useState, useEffect } from "react";
import data from "../lib/data";

const Slider = () => {
  const intervalTime = 3000;
  const autoScroll = true;
  const images = data[1]?.othersColors || [];
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    if (autoScroll) {
      const slideInterval = setInterval(goToNext, intervalTime);
      return () => clearInterval(slideInterval);
    }
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <button className="nav-button prev" onClick={goToPrevious}>
        ❮
      </button>

      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image.images} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>

      <button className="nav-button next" onClick={goToNext}>
        ❯
      </button>

      <div className="indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
