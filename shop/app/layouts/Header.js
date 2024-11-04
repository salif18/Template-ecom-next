"use client";

import React, { useState } from 'react';
import styles from "../styles/_header.module.scss";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleView = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <section className={styles.logo}>
                <h1>Line-Store</h1>
            </section>
            <div className={styles.headerLeft}>
                <nav className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ""}`}>
                    <ul>
                        <CloseOutlinedIcon className={styles.menuClose} onClick={handleView} />
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Boutique</Link></li>
                        <li><Link href="/a-propos">A propos</Link></li>
                        <li><Link href="/contact">Nous contacter</Link></li>
                    </ul>
                </nav>

                <li><Link href="/panier"><LocalMallOutlinedIcon className={styles.icon} ></LocalMallOutlinedIcon></Link></li>
                <li><Link href="/profil"><PersonOutlineOutlinedIcon className={styles.icon}></PersonOutlineOutlinedIcon></Link></li>
                <MenuOutlinedIcon className={styles.menuToggle} onClick={handleView} />
            </div>

        </header>
    );
}

export default Header;

