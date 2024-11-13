"use client"
import React, { useEffect, useState } from 'react'

const MySlide = ({ data }) => {
    //AUTO SCROLL
    const autoScroll = true;

    // ETAT D'INDEX DU ITEMS
    const [currentIndex, setCurrentIndex] = useState(0);

    // LA LONGUEUR DU TABLEAU
    const slidersTotal = data.length;

    // FONCTION CHANGER DIRECTION
    const handleChangeDirection = (direction) => {
        setCurrentIndex(prevIndex => (prevIndex + direction + slidersTotal) % slidersTotal)
    }

    // DEFFILEMENT AUTOMATIQUE
    useEffect(() => {
        if (autoScroll) {
            const timeSlide = setInterval(() => handleChangeDirection(1), 3000)
            return () => clearInterval(timeSlide)
        }
    }, [currentIndex])

    return (
        <section className='my-slider-container'>
            <button className='prev' onClick={() => handleChangeDirection(-1)}>
              ❮ 
            </button>
            <section className='slides' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {
                    data.map((slide, index) =>
                        <div key={index} className="slide" >
                            {slide}
                        </div>
                    )
                }
            </section>
            <button className='next' onClick={() => handleChangeDirection(1)}> 
              ❯
            </button>
            <section className='indicators'>
                {
                    data.map((_, index) =>
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`${currentIndex === index ? "active" : ""}`}
                        >
                        </button>
                    )
                }
            </section>
        </section>
    )
}

export default MySlide
