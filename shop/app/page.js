"use client"
import Image from "next/image";
import styles from "./styles/_home.module.scss";
import LayoutPage from "./layouts/Layout";
// import data from "../../shop/app/lib/data";
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
import Carousel from "./components/Carousel";
import PopulairCard from "./components/PopulairCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // État pour les produits en promotion
  const [specialOffre, setSpecialOffre] = useState({});
  const [hasPromo, setHasPromo] = useState([]);
  const [data ,setData] = useState([]);

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
        setData(response?.data?.produits)
        console.log(response?.data?.produits)
       }
      }catch(e){
       console.error( e.response?.data?.message || "erreur ")
      }
    }

    getProducts()
 },[])

  useEffect(() => {
    // Filtrer les promotions
    const promodata = data.filter((item) => item.is_promo);

    if (promodata.length > 0) {
      // Trouver la promo max
      const maxPromo = promodata.reduce((max, item) =>
        item.discount_percentage > max.discount_percentage ? item : max
      );

      // Trouver toutes les autres promotions sauf le max
      const otherPromos = promodata.filter((item) => item._id !== maxPromo._id);

      // Mettre à jour l'état
      setSpecialOffre(maxPromo);
      setHasPromo(otherPromos);

    } else {
      console.log("Aucune promotion disponible.");
    }
  }, [data]);


  const router = useRouter()

  // nos categories
  const uniqueCategoryProducts = Array.from(
    data.reduce((map, item) => {
      if (!map.has(item.category)) {
        map.set(item.category, item);
      }
      return map;
    }, new Map()).values()
  );


  return (
    <LayoutPage>
      <main className={styles.page}>
        {/* SECTION BANNIERE */}
         { specialOffre &&
           <section className={styles.banner1}>
          <div className={styles.backColor}></div>
          <div className={styles.left}>
            <h2>Spécial offre de la semaine !</h2>
            <p>-{specialOffre.discount_percentage}% de réduction sur cet article</p>
            <section className={styles.btnOptions}>
              <button className={styles.btnBuy} onClick={() => router.push(`/products/${specialOffre._id}`)} >Achetez maintenant</button>
              {/* <button className={styles.btnMore} onClick={()=>router.push(`/products`)}>En savoir plus</button> */}
            </section>
          </div>
          <div className={styles.right}>
            <Slider data={specialOffre} />
          </div>
        </section>
         }
        {/* SECTION CATEGORIES */}
        <section className={styles.categoriesContainer}>
          <h2 className={styles.title}>Nos catégories vendues  </h2>
          <ul className={styles.productList}>
            {
              uniqueCategoryProducts.map((product) =>
                <li key={product._id}><CategoryCard product={product} /></li>
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
                <li key={product._id}><PopulairCard product={product} /></li>
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
              <h2 className={styles.h2}>Promos jusq’à <span>-{hasPromo[0]?.discount_percentage}% </span><br />sur ces articles de mode</h2>
            </div>
            <ul className={styles.productList}>
              {
                hasPromo.length > 0 &&
                hasPromo.map((product) =>
                  <li key={product._id}><OffreCard product={product} /></li>
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
