"use client";

import React, { useContext, useEffect, useState } from 'react';
import styles from "../styles/_header.module.scss";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { BsHandbag } from "react-icons/bs";

import { FaOpencart } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { MdOutlineContactSupport } from "react-icons/md";
import { GrContact } from "react-icons/gr";

const Header = () => {
    const router = useRouter()
    const { cart, nombreArticles } = useContext(CartContext)
    const {token} = useContext(AuthContext)
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleView = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    //scroller et fixer le navbar
  const [isFixed, setIsFixed] = useState(false)
  useEffect(() => {
    const scrolling = () => {
      if (document.documentElement.scrollTop > 20) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }
    window.addEventListener('scroll', scrolling)
    return (() => {
      window.removeEventListener('scroll', scrolling)
    })
  }, [])


    return (
        <header className={isFixed ? styles.headerFixed : styles.header}>
            <section className={styles.logo}>
                <h1 onClick={()=> router.push("/")}> <FaOpencart style={{fontSize:"2.2em"}} /> Fashion</h1>
            </section>
            <div className={styles.headerLeft}>
                <nav className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ""}`}>
                    <ul>
                        <CloseOutlinedIcon className={styles.menuClose} onClick={handleView} />
                        <li><Link href="/"><GoHome className={styles.icons} /> Home</Link></li>
                        <li><Link href="/products"><FaOpencart className={styles.icons} /> Boutique</Link></li>
                        <li><Link href="/about"><MdOutlineContactSupport  className={styles.icons} /> A propos</Link></li>
                        <li><Link href="/contact"><GrContact className={styles.icons} /> Nous contacter</Link></li>
                    </ul>
                </nav>

                <li><Link href="/cart"><LocalMallOutlinedIcon className={styles.icon} />{cart.length > 0 && <span>{nombreArticles}</span>}</Link></li>
                <li className={styles.profilZone}>
                <p className={styles.profil}><PersonOutlineOutlinedIcon className={styles.icon}/></p>
                <div className={styles.profilDropdown}>
                   <div className={styles.user}>
                    <p>UserName</p>
                   </div>
                   <Link href="/achats" ><BsHandbag style={{fontSize:"24px"}} /> Mes achats</Link>
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

