"use client"
import React, { useEffect, useState } from 'react'
import LayoutPage from '../../layouts/Layout';
import styles from "../../styles/_products.module.scss"
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ProductCard from '@/app/components/ProductCard';
import Floatingbtn from '@/app/components/floatingbtn';
import { IoMdArrowDropdown } from "react-icons/io";
import axios from 'axios';

const PRODUCTS_PER_PAGE = 10; // Nombre de produits par page

const Boutique = () => {
  const [data ,setData] = useState([]);
  const [categoryLocal, setCategoryLocal] = useState("");

// RECUPERER LES PRODUITS
  useEffect(()=>{
     const getProducts =async()=>{
       try{
         const response = await axios.get(`${process.env.NEXT_PUBLIC_URI}/products`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer `,
        },
         });
         if(response.status === 200){
         setData(response.data.produits)
         console.log(response.data.produits)
        }
       }catch(e){
        console.error( e.response.data.message || "erreur ")
       }
     }

     getProducts()
  },[])

  // ETAT DAFFICHAGE DE SIDE BAR EN RESPONSIVE
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleView = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ZONE DE FILTRAGES LES VALEUR A FILTRER
  const [subCategoryFilter, setSubCategoryFilter] = useState("")
  const [marqueFilter, setMarqueFilter] = useState("")

  const [filters, setFilters] = useState({
    selectedCategories: [],
    maxPrice: 100000,
    selectedRating: '',
    searchQuery: ''
  });

  //CREATION DE LA PAGINATION
  const [currentPage, setCurrentPage] = useState(1);


  // Récupérer la catégorie du localStorage au chargement
  useEffect(() => {
    const storedCategory = localStorage.getItem("categorie");
    const storedSubCategory = localStorage.getItem("subcategorie")

    if (storedCategory) setCategoryLocal(storedCategory);
    if (storedSubCategory) setSubCategoryFilter(storedSubCategory);
  }, []);



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
    setCurrentPage(1); // Réinitialiser la page à 1 lors de la modification d'un filtre
  };
  // FIN DE ZONE DE FILTRAGE

  const filteredProducts = data.filter((product) => {
    const matchesCategory =
      (filters.selectedCategories.length === 0 || filters.selectedCategories.includes(product.category)) &&
      (categoryLocal ? product.category === categoryLocal : true);
    const matchesPrice = product.price <= filters.maxPrice;
    const matchesRating = filters.selectedRating === '' || product.rating >= filters.selectedRating;
    const matchesSearch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || product.category.toLowerCase().includes(filters.searchQuery.toLowerCase()) || product.subCategory.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesMarques = product.brand.includes(marqueFilter);
    const matchesSubCategory = product.subCategory.includes(subCategoryFilter)
    return matchesCategory && matchesPrice && matchesRating && matchesSearch && matchesMarques && matchesSubCategory;
  });

  // Pagination sur les produits filtrés
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const marques = [
    "Nike",
    "Addidas",
    "Burberry",
    "Fashion",
    "Lacoste",
    "Calvin Klein",
    "Rolex",
    "Louis Vuitton",
    "Casio",
    "Jordan"
  ]

  const categories = [
    "Hommes",
    "Femmes",
    "Enfants",
  ]

  const handleDefault = () => {
    setSubCategoryFilter("");
    setMarqueFilter("");
    setCategoryLocal("");
    localStorage.removeItem("categorie");
    localStorage.removeItem("subcategorie");
    setFilters({
      selectedCategories: [],
      maxPrice: 100000,
      selectedRating: '',
      searchQuery: '',
    });
    setCurrentPage(1); // Réinitialiser la page
  };

  return (
    <LayoutPage>
      {/* NAVBAR */}

      <nav className={styles.nav}>
        <ul>
          <li><p onClick={handleDefault}>Tout</p></li>
          {
            categories.map(categorie =>
              <li key={categorie}><p onClick={() => setSubCategoryFilter(categorie)} >{categorie}</p></li>
            )
          }

          <li><p>Marques <IoMdArrowDropdown style={{ fontSize: "2em" }} /> </p>
            <div className={styles.menuDropdown}>
              {marques.map(marque =>
                <p key={marque} className={styles.popupLink} onClick={() => setMarqueFilter(marque)} >{marque}</p>
              )}
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
              <SearchOutlinedIcon className={styles.icon} onClick={handleView} />
            </label>
            <CloseOutlinedIcon className={styles.menuClose} onClick={handleView} />
          </form>
          <section className={styles.asideMenu}>
            <h3>Filtrer par Prix</h3>
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="100000"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              onClick={handleView}
            />
            <p>Price: <span>{filters.maxPrice} FCFA</span></p>
            <h3>Categories</h3>
            <ul>
              <li>
                <input
                  type="checkbox"
                  value="Accessoires"
                  onChange={handleFilterChange}
                  onClick={handleView}
                /> Accessoires
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Chaussures"
                  onChange={handleFilterChange}
                  onClick={handleView}
                /> Chaussures
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Vêtements"
                  onChange={handleFilterChange}
                  onClick={handleView}
                /> Vêtements
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Sacs"
                  onChange={handleFilterChange}
                  onClick={handleView}
                /> Sacs
              </li>
            </ul>

            <h3>Par meilleures notes</h3>
            <input

              type="radio"
              name="selectedRating"
              value="100"
              onChange={handleFilterChange}
              onClick={handleView}
            /> <span className={styles.ratingColor}>★★★★★</span> ( 5 étoiles )<br />
            <input
              type="radio"
              name="selectedRating"
              value="80"
              onChange={handleFilterChange}
              onClick={handleView}
            /> <span className={styles.ratingColor}>★★★★</span>( 4 étoiles )<br />
            <input

              type="radio"
              name="selectedRating"
              value="60"
              onChange={handleFilterChange}
              onClick={handleView}
            /> <span className={styles.ratingColor}>★★★</span> ( 3 étoiles )<br />
            <input

              type="radio"
              name="selectedRating"
              value="40"
              onChange={handleFilterChange}
              onClick={handleView}
            /> <span className={styles.ratingColor}>★★</span> ( 2 étoiles )<br />
            <input

              type="radio"
              name="selectedRating"
              value="20"
              onChange={handleFilterChange}
              onClick={handleView}
            /> <span className={styles.ratingColor}>★</span> ( 1 étoile )<br />
          </section>
        </aside>
        <main className={styles.main}>
          <h1>Store gallerie / {subCategoryFilter ? subCategoryFilter : "All products"}</h1>
          <section className={styles.productContainer}>
            <ul className={styles.productList}>
              {
                displayedProducts.length > 0 ?
                  displayedProducts.map((product) =>
                    <li key={product._id}><ProductCard product={product} /></li>
                  )
                  : <p className={styles.empty}>Aucuns resultat  </p>
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
                style={{
                  backgroundColor: currentPage === i + 1 ? 'black' : 'white',
                  color: currentPage === i + 1 ? 'white' : 'black',
                }}
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
