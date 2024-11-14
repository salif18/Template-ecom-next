"use client"
import Image from "next/image";
import styles from "./styles/_home.module.scss";
import LayoutPage from "./layouts/Layout";
import data from "../../shop/app/lib/data";
import marques from "../../shop/app/lib/fakemarque";
import globe from "./assets/images/globe-free-img.png";
import lock from "./assets/images/lock-free-img.png"
import quality from "./assets/images/quality-free-img.png"
import tag from "./assets/images/tag-free-img.png"
import Floatingbtn from "./components/floatingbtn";
import Slider from "./components/Slider";
import { useRouter } from "next/navigation";
import CategoryCard from "./components/categoryCard";
import OffreCard from "./components/OffreCard";
import { BiSolidCategory } from "react-icons/bi";
import Carousel from "./components/Carousel";
import PopulairCard from "./components/PopulairCard";

export default function Home() {
  // produit en promo
  const promodata = data[1]

  const router = useRouter()

  // nos categories
  const uniqueCategoryProducts = Array.from(
    data.reduce((map, item) => {
      if (!map.has(item.category)) {     // Vérifie si la catégorie est déjà dans le Map
        map.set(item.category, item);     // Si non, ajoute la catégorie avec le produit
      }
      return map;                         // Renvoie le Map mis à jour pour la prochaine itération
    }, new Map()).values()                // À la fin, .values() donne les produits uniques dans chaque catégorie
  );


  return (
    <LayoutPage>
      <main className={styles.page}>
      {/* SECTION BANNIERE */}
        <section className={styles.banner1}>
          <div className={styles.backColor}></div>
          <div className={styles.left}>
            <h2>Spécial offre de la semaine !</h2>
            <p>25% de réduction sur tous les produits</p>
            <section className={styles.btnOptions}>
              <button className={styles.btnBuy} onClick={() => router.push(`/products/${promodata.id}`)} >Achetez maintenant</button>
              {/* <button className={styles.btnMore} onClick={()=>router.push(`/products`)}>En savoir plus</button> */}
            </section>
          </div>
          <div className={styles.right}>
            <Slider />
          </div>
        </section>
        {/* SECTION CATEGORIES */}
        <section className={styles.categoriesContainer}>
          <h2 className={styles.title}>Nos catégories vendues  <BiSolidCategory  className={styles.icon} /></h2>
          <ul className={styles.productList}>
            {
              uniqueCategoryProducts.map((product) =>
                <li key={product.id}><CategoryCard product={product} /></li>
              )
            }
          </ul>
        </section>
        {/* SECTION NEW ARRIVAL */}
        <section className={styles.newArrival}>
          <h2 className={styles.title}>Nouveaux arrivants</h2>
          <Carousel data={data.reverse().slice(0, 8)} />
        </section>
        {/* SECTION POPULAIRE */}
        <section className={styles.populaireContainer}>
          <h2 className={styles.title}>Les plus populaires</h2>
          <ul className={styles.productList}>
            {
              data.reverse().slice(0, 5).map((product) =>
                <li key={product.id}><PopulairCard product={product} /></li>
              )
            }
          </ul>
        </section>
        {/* SECTION PROMOTION */}
        <section className={styles.promotion}>
          <div className={styles.back}></div>
          <h2 className={styles.title}>Nos meilleurs offres</h2>
          <div className={styles.containerPromo}>
            <div className={styles.infoPromo}>
              <h2 className={styles.h2}>Promos jusq’à <span>-15% </span><br />sur ces articles de mode</h2>
            </div>
            <ul className={styles.productList}>
              {
                data.slice(0, 3).map((product) =>
                  <li key={product.id}><OffreCard product={product} /></li>
                )
              }
            </ul>
          </div>
        </section>
        {/* SECTION MARQUES */}
        <section className={styles.marquesContainer}>
          <h2 className={styles.title}>Nos marques vendues</h2>
          <ul className={styles.productList}>
            {
              marques.map((product) =>
                <li key={product.id}>
                  <img className={styles.markImg} src={product.img} />
                </li>
              )
            }
          </ul>
        </section>
        {/* SECTION SERVICES */}
        <section className={styles.services}>
          <div className={styles.colonnes}>
            <Image src={globe} alt="" />
            <h2>Expédition dans le monde entier</h2>
            <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div className={styles.colonnes}>
            <Image src={lock} alt="" />
            <h2>Meilleure qualité</h2>
            <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div className={styles.colonnes}>
            <Image src={quality} alt="" />
            <h2>Meilleures offres</h2>
            <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div className={styles.colonnes}>
            <Image src={tag} alt="" />
            <h2>Paiements sécurisés</h2>
            <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
        </section>
      </main>
      <Floatingbtn />
    </LayoutPage>
  );
}
