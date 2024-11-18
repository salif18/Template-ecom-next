"use client"
import { useState, useEffect } from "react";


const Slider = ({data}) => {
  const autoScroll = true;
 
  // Vérifie si othersColors existe et est un tableau
  const imagesSlider = Array.isArray(data.othersColors) ? data.othersColors : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // FONCTION CHANGER DIRECTION
  const handleChangeDirection = (direction) => {
    setCurrentIndex(prevIndex => (prevIndex + direction + imagesSlider.length) % imagesSlider.length)
}

  useEffect(() => {
    if (autoScroll) {
      const slideInterval = setInterval(()=>handleChangeDirection(1), 3000);
      return () => clearInterval(slideInterval);
    }
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <button className="nav-button prev" onClick={()=>handleChangeDirection(1)}>
        ❮
      </button>

      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {imagesSlider.map((image, index) => (
          <div key={index} className="slide">
            <img src={image.images} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>

      <button className="nav-button next" onClick={()=>handleChangeDirection(-1)}>
        ❯
      </button>

      <div className="indicators">
        {imagesSlider.map((_, index) => (
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
