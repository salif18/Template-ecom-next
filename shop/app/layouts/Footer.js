import React from 'react'
import styles from "../styles/_footer.module.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
  return (
    <footer className={styles.footer}>
    <section className={styles.row1}>
       <h2>Promos jusq’à -70% sur tous les vetements & articles de mode, sur toutes les marques.</h2>
    </section>
    <section className={styles.row2}>
      <div className={styles.columns}>
          <h2>Line-Store</h2>
          <p className={styles.h2}>Le meilleur look à tout moment, n’importe où.</p>
      </div>
      <div className={styles.columns}>
      <h2>Pour elle</h2>
        <p>Accessoires femmes</p>
        <p>Accessoires femmes</p>
        <p>Accessoires femmes</p>
        <p>Accessoires femmes</p>
      </div>
      <div className={styles.columns}>
      <h2>Pour lui</h2>
      <p>Accessoires hommes</p>
      <p>Accessoires hommes</p>
      <p>Accessoires hommes</p>
      <p>Accessoires hommes</p>
      </div>
      <div className={styles.columns}>
      <h2>Newsletter</h2>
      <input type='text' placeholder='example@gmail.com' />
      <button className={styles.btnAbonner}>S'abonner</button>
      </div>
    </section>
    <section className={styles.row3}>
     <p>Droits d’auteur © 2024 devsoft. Propulsé par Salif Moctar Konaté .</p>
     <div className={styles.socials}>
      <span><FacebookIcon className={styles.icon} /></span>
      <span><InstagramIcon className={styles.icon}  /></span>
     </div>
    </section>
    </footer>
  )
}

export default Footer
