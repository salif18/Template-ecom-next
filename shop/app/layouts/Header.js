"use client";

import React, { useContext, useState } from 'react';
import styles from "../styles/_header.module.scss";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter()
    const { cart, nombreArticles } = useContext(CartContext)
    const {token} = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleView = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <section className={styles.logo}>
                <h1>Hadja-Fashion</h1>
            </section>
            <div className={styles.headerLeft}>
                <nav className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ""}`}>
                    <ul>
                        <CloseOutlinedIcon className={styles.menuClose} onClick={handleView} />
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Boutique</Link></li>
                        <li><Link href="/about">A propos</Link></li>
                        <li><Link href="/contact">Nous contacter</Link></li>
                    </ul>
                </nav>

                <li><Link href="/cart"><LocalMallOutlinedIcon className={styles.icon} />{cart.length > 0 && <span>{nombreArticles}</span>}</Link></li>
                <li className={styles.profilZone}>
                <p className={styles.profil}><PersonOutlineOutlinedIcon className={styles.icon}/></p>
                <div className={styles.profilDropdown}>
                   <div className={styles.user}>
                    <p>Client</p>
                   </div>
                   <Link href="/achats" >Mes achats</Link>
                   <button className={styles.btnAuth}
                   onClick={()=>router.push("/login")}
                   >Se connecter</button>
                   {token && <button className={styles.btnlogout}>Se deconnecter</button>}
                 </div>
                
                </li>
                <MenuOutlinedIcon className={styles.menuToggle} onClick={handleView} />
            </div>

        </header>
    );
}

export default Header;

