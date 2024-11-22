import React from 'react';
import styles from "../styles/_rating.module.scss"

const GeneredStarUser=({ rating })=>{
  const maxStars = 5;
  const starRating = Math.round(rating / 1); // Utiliser la prop `rating` pour calculer correctement la note

  const generateStars = () => {
    const stars = [];
    for (let note = 1; note <= maxStars; note++) {
      stars.push(
        <span key={note} className={`${styles.star} ${note <= starRating ? styles.filled : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.rating}>
      {generateStars()}
    </div>
  );
}

export default GeneredStarUser;