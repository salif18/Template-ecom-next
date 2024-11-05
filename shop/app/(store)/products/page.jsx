"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import LayoutPage from '../../layouts/Layout';
import styles from "../../styles/_products.module.scss"
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ProductCard from '@/app/components/ProductCard';
import data from "../../lib/fakedata";
import Floatingbtn from '@/app/components/floatingbtn';

const PRODUCTS_PER_PAGE = 12; // Nombre de produits par page

const Boutique = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleView = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [filters, setFilters] = useState({
    selectedCategories: [],
    maxPrice: 100000,
    selectedRating: '',
    searchQuery: ''
  });


  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === "checkbox") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        selectedCategories: checked
          ? [...prevFilters.selectedCategories, value]
          : prevFilters.selectedCategories.filter((category) => category !== value),
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

 
  //CREATION DE LA PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Mettre à jour les produits affichés à chaque changement de page
  useEffect(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(data.slice(startIndex, endIndex));
  }, [currentPage, data]);

  const totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);

  const filteredProducts = displayedProducts.filter((product) => {
    const matchesCategory = filters.selectedCategories.length === 0 ||
      filters.selectedCategories.includes(product.category) ||
      filters.selectedCategories.includes(product.sousCategory);
    const matchesPrice = product.price <= filters.maxPrice;
    const matchesRating = filters.selectedRating === '' || product.rating >= filters.selectedRating;
    const matchesSearch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || product.category.toLowerCase().includes(filters.searchQuery.toLowerCase()) || product.sousCategory.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });



  return (
    <LayoutPage>
      {/* NAVBAR */}
      <nav className={styles.nav}>
        <ul>
          <li><Link href="/boutique">Homme</Link>
            <div className={styles.menuDropdown}>
              <Link href="#" className={styles.popupLink}>Accessoires</Link>
              <Link href="#" className={styles.popupLink}>Vetements</Link>
              <Link href="#" className={styles.popupLink}>Chaussures</Link>
            </div>
          </li>
          <li><Link href="/a-propos">Femme</Link>
            <div className={styles.menuDropdown}>
              <Link href="#" className={styles.popupLink}>Accessoires</Link>
              <Link href="#" className={styles.popupLink}>Vetements</Link>
              <Link href="#" className={styles.popupLink}>Chaussures</Link>
            </div>
          </li>
          <li><Link href="/contact">Enfant</Link>
            <div className={styles.menuDropdown}>
              <Link href="#" className={styles.popupLink}>Accessoires</Link>
              <Link href="#" className={styles.popupLink}>Vetements</Link>
              <Link href="#" className={styles.popupLink}>Chaussures</Link>
            </div>
          </li>
          <li><Link href="/contact">Fille</Link>
            <div className={styles.menuDropdown}>
              <Link href="#" className={styles.popupLink}>Accessoires</Link>
              <Link href="#" className={styles.popupLink}>Vetements</Link>
              <Link href="#" className={styles.popupLink}>Chaussures</Link>
            </div>
          </li>
          <li><Link href="/contact">Garcon</Link>
            <div className={styles.menuDropdown}>
              <Link href="#" className={styles.popupLink}>Accessoires</Link>
              <Link href="#" className={styles.popupLink}>Vetements</Link>
              <Link href="#" className={styles.popupLink}>Chaussures</Link>
            </div>
          </li>
          <li><Link href="/boutique">Marques</Link>
            <div className={styles.menuDropdown}>
              <Link href="#" className={styles.popupLink}>Nike</Link>
              <Link href="#" className={styles.popupLink}>Addidas</Link>
              <Link href="#" className={styles.popupLink}>Burberry</Link>
              <Link href="#" className={styles.popupLink}>Fashion</Link>
              <Link href="#" className={styles.popupLink}>Lacos</Link>
              <Link href="#" className={styles.popupLink}>Calvin Klein</Link>
              <Link href="#" className={styles.popupLink}>Rolex</Link>
              <Link href="#" className={styles.popupLink}>Louis vuitton</Link>
              <Link href="#" className={styles.popupLink}>Casio</Link>
              <Link href="#" className={styles.popupLink}>Jordan</Link>
            </div>
          </li>
        </ul>
      </nav>
      {/* MAIN */}
      <div className={styles.container}>
        <div className={styles.actionFilter}><FilterListOutlinedIcon className={styles.menuToggle} onClick={handleView} /> <span>Filtrer</span></div>
        <aside className={`${styles.aside} ${isMenuOpen ? styles.open : ""}`}>
          <form>
            <label>
              <input type='text' name='searchQuery' value={filters.searchQuery} onChange={handleFilterChange} placeholder='Que voulez-vous ?' />
              <SearchOutlinedIcon className={styles.icon} />
            </label>
            <CloseOutlinedIcon className={styles.menuClose} onClick={handleView} />
          </form>
          <section className={styles.asideMenu}>
            <h3>Filtrer par Prix</h3>
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="10000"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
            <p>Price: <span>{filters.maxPrice} FCFA</span></p>
            <h3>Categories</h3>
            <ul>
              <li>
                <input
                  type="checkbox"
                  value="Accessoires"
                  onChange={handleFilterChange}
                /> Accessoires
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Vetements"
                  onChange={handleFilterChange}
                /> Vetements
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Chaussures"
                  onChange={handleFilterChange}
                /> Chaussures
              </li>
            </ul>

            <h3>Par meuilleures notes</h3>
            <input
              type="radio"
              name="selectedRating"
              value="100"
              onChange={handleFilterChange}
            /> ★★★★★<br />
            <input
              type="radio"
              name="selectedRating"
              value="80"
              onChange={handleFilterChange}
            /> ★★★★<br />
            <input
              type="radio"
              name="selectedRating"
              value="60"
              onChange={handleFilterChange}
            /> ★★★<br />
            <input
              type="radio"
              name="selectedRating"
              value="40"
              onChange={handleFilterChange}
            /> ★★<br />
            <input
              type="radio"
              name="selectedRating"
              value="20"
              onChange={handleFilterChange}
            /> ★<br />
          </section>
        </aside>
        <main className={styles.main}>
          <h1>Store gallerie</h1>
          <section className={styles.productContainer}>
            <ul className={styles.productList}>
              {
                filteredProducts.map((product) =>
                  <li key={product.id}><ProductCard product={product} /></li>
                )
              }
            </ul>
          </section>
          {/* Pagination */}
          <div className={styles.paginationContainer}>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1}>
              &#8592;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? styles.actives : ''}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}

            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages}>
              &#8594;
            </button>
          </div>
        </main>
        <Floatingbtn />
      </div>
    </LayoutPage>
  )
}

export default Boutique
