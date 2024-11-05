import Image from "next/image";
import styles from "./styles/_home.module.scss";
import LayoutPage from "./layouts/Layout";
import data from "../../shop/app/lib/fakedata";
import marques from "../../shop/app/lib/fakemarque";
import ProductCard from "./components/ProductCard";
import globe from "./assets/images/globe-free-img.png";
import lock from "./assets/images/lock-free-img.png"
import quality from "./assets/images/quality-free-img.png"
import tag from "./assets/images/tag-free-img.png"

export default function Home() {
 
  return (
    <LayoutPage>
      <main className={styles.page}>
        <section className={styles.banner1}>
          <div className={styles.backColor}></div>
          <div className={styles.left}>
            <h2>Spécial offre de la semaine !</h2>
            <p>25% de réduction sur tous les produits</p>
            <section className={styles.btnOptions}>
              <button className={styles.btnBuy}>Achetez maintenant</button>
              <button className={styles.btnMore}>En savoir plus</button>
            </section>
          </div>
        </section>
        <section className={styles.newArrival}>
          <h2 className={styles.title}>Nos catégories</h2>
          <ul className={styles.productList}>
            {
              data.slice(0, 5).map((product) =>
                <li key={product.id}><ProductCard product={product} /></li>
              )
            }
          </ul>
        </section>
        <section className={styles.newArrival}>
          <h2 className={styles.title}>Les nouveaux arrivages</h2>
          <ul className={styles.productList}>
            {
              data.slice(0, 5).map((product) =>
                <li key={product.id}><ProductCard product={product} /></li>
              )
            }
          </ul>
        </section>
        <section className={styles.newArrival}>
          <h2 className={styles.title}>Les plus populaires</h2>
          <ul className={styles.productList}>
            {
              data.slice(0, 5).map((product) =>
                <li key={product.id}><ProductCard product={product} /></li>
              )
            }
          </ul>
        </section>
        <section className={styles.newArrival}>
          <h2 className={styles.title}>Nos meilleurs offres</h2>
          <ul className={styles.productList}>
            {
              data.slice(0, 3).map((product) =>
                <li key={product.id}><ProductCard product={product} /></li>
              )
            }
          </ul>
        </section>
        <section className={styles.newArrival}>
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
    </LayoutPage>
  );
}
