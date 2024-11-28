"use client";

import LayoutPage from '@/app/layouts/Layout'
import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/_address.module.scss"
import { CartContext } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import { MdOutlineMyLocation } from "react-icons/md";
import { MdOutlineLocationSearching } from "react-icons/md";
import axios from 'axios';
import MyMaps from '@/app/components/MyMaps';
import {  Marker, useMapEvents } from "react-leaflet";

const AddressCheckOut = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { token, userId } = useContext(AuthContext);
  const router = useRouter();

  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("")
  const [orderLocal, setOrderLocal] = useState({});
  const [position, setPosition] = useState(null);
  const [positionActive, setPositionActive] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    numero: "",
    email: "",
    ville: "",
    rue: "",
    logt: "",
    payementMode: "",
  });

  // Récupération de la commande locale au chargement de la page
  useEffect(() => {
    const storage = localStorage.getItem("order");
    if (storage) {
      const localOrder = JSON.parse(storage);
      setOrderLocal(localOrder);
      setFormData({
        nom: localOrder.user?.nom || "",
        numero: localOrder.user?.numero || "",
        email: localOrder.user?.email || "",
        ville: localOrder.address?.ville || "",
        rue: localOrder.address?.rue || "",
        logt: localOrder.address?.logt || "",
        payementMode: localOrder.payementMode || "",
      });
    }
  }, []);

  // Gestion des changements de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation et soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!formData.nom || !formData.numero || !formData.email || !formData.ville || !formData.rue || !formData.logt || !formData.payementMode) {
      setIsValid(false); // Affichez un message d'erreur à l'utilisateur
      setMessage("Veuillez remplir les champs!")
      return;
    }

    // Création de l'objet de commande
    const order = {
      userId: userId,
      user: {
        nom: formData.nom,
        numero: formData.numero,
        email: formData.email,
      },
      address: {
        ville: formData.ville,
        rue: formData.rue,
        logt: formData.logt,
      },
      payementMode: formData.payementMode,
      status: "En attente",
      cart: cart.map((item) => ({
        producId: item._id, image: item.img, name: item.name, promotion: item.promotion, price: item.price, qty: item.qty, size: item.selectedSize, color: item.selectedColor
      })),

      location: position ? { lat: position.lat, lng: position.lng } : null, // Ajoutez une vérification ici
      total: total,
    };

    console.log(order)

    try {
      // Enregistrement de la commande dans localStorage
      localStorage.setItem("order", JSON.stringify(order));
      localStorage.setItem('redirectUrl', "/cart/address")
      // Redirection en fonction de l'état de connexion
      if (token) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URI}/commandes`, order, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer `,
          },
        });
        if (response.status === 201) {

          router.push("/succes");
          // Enregistrement de la commande dans localStorage
          localStorage.setItem("order", JSON.stringify(response.data.order));
          clearCart();
        }

      } else {
        router.push("/login");
      }
    } catch (error) {
      setServerMessage(error?.response?.data?.message);
    }
  };


  // const getPosition = () => {
  //   if (!navigator.geolocation) {
  //     setPositionActive(false);
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setPosition({ latitude, longitude });
  //       console.log(latitude, longitude)
  //       setPositionActive(!positionActive);
  //     },
  //     (err) => {
  //       // setError(err.message);
  //     }
  //   );
  // };

  // Réinitialisation du message d'erreur après un certain temps
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  


  // obtenir position depuis sur la carte
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng); // Met à jour la position lors d'un clic
      },
    });
  
    return position ? <Marker position={position} /> : null;
  };

  return (
    <LayoutPage>
      <main className={styles.address}>
        <section className={styles.title}>
          <h2>La caisse</h2>
        </section>
        <section className={styles.details}>
          <div className={styles.left}>
            <h2>Détails de livraison</h2>
            <form>
              <label htmlFor='nom'>Nom</label>
              <input type='text' className={!isValid && !formData.nom && styles.error} name='nom' value={formData.nom} onChange={handleChange} placeholder={formData.nom} />
              {(!isValid && !formData.nom) && <p className={styles.errorMessage}>{message}</p>}
              <label htmlFor='numero'>Numéro</label>
              <input type='number' className={!isValid && !formData.numero && styles.error} name='numero' value={formData.numero} onChange={handleChange} placeholder={formData?.numero} />
              {(!isValid && !formData.numero) && <p className={styles.errorMessage}>{message}</p>}
              <label htmlFor='email'>Email</label>
              <input type='email' className={!isValid && !formData.email && styles.error} name='email' value={formData.email} onChange={handleChange} placeholder={formData?.email} />
              {(!isValid && !formData.email) && <p className={styles.errorMessage}>{message}</p>}
              <label htmlFor='ville'>Ville/Quartier</label>
              <input type='text' className={!isValid && !formData.ville && styles.error} name='ville' value={formData.ville} onChange={handleChange} placeholder={formData?.ville} />
              {(!isValid && !formData.ville) && <p className={styles.errorMessage}>{message}</p>}
              <label htmlFor='rue'>Rue</label>
              <input type='number' className={!isValid && !formData.rue && styles.error} name='rue' value={formData.rue} onChange={handleChange} placeholder={formData?.rue} />
              {(!isValid && !formData.rue) && <p className={styles.errorMessage}>{message}</p>}
              <label htmlFor='logt'>Logts</label>
              <input type='number' className={!isValid && !formData.logt && styles.error} name='logt' value={formData.logt} onChange={handleChange} placeholder={formData?.logt} />
              {(!isValid && !formData.logt) && <p className={styles.errorMessage}>{message}</p>}
            </form>
            <div className={styles.positionMap}>

              <h1>Sélectionnez votre position <MdOutlineLocationSearching style={{ fontSize: "24px" }} /></h1>
              <MyMaps LocationMarker={LocationMarker} />
            </div>
          </div>

          <div className={styles.right}>
            <h2>Détails de commande</h2>
            <div className={styles.orderDetails}>
              <div className={styles.row1}>
                <h2>Produits</h2>
                <h2>Sous-total</h2>
              </div>

              {
                cart.map(item => (
                  <div className={styles.row2} key={item._id} >  {/* Utilise un div parent ou React.Fragment */}
                    <p>{item.name} x{item.qty}</p>
                    <p>{item.price * item.qty} FCFA</p>
                  </div>
                ))
              }

              <div className={styles.row2}>
                <p>Frais de livraison</p>
                <p>+1000 FCFA</p>
              </div>
              <div className={styles.row3}>
                <p>Total</p>
                <p>{total + 1000} FCFA</p>
              </div>
              <div className={styles.row4}>
                <ul>
                  {/*<li><input type='radio' name='payementMode' value="Par orange money" onChange={handleChange} /> Payer par orange money <img src='data:image/png;base64,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' alt='' /></li>*/}
                  <li><input type='radio' name='payementMode' value="À la livraison" onChange={handleChange} /> Payer à la livraison <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhBh9uu0vaR7sJ82BQd6uHWR6ebN8Hvc6MwsqgbAK74VpEmOT3EK9Xo1DF1M0dMijER0&usqp=CAU' alt='' /> </li>
                  <li><input type='radio' name='payementMode' value="Passer à la boutique" onChange={handleChange} /> Passer à la boutique <img src='https://www.aft-dev.com/sites/default/files/styles/actualites_intro/public/actualites/Sans%20titre%20%285%29.png?h=5b1ec3ff&itok=MGIH5quM' alt='' /></li>
                  {(!isValid && !formData.payementMode) && <p style={{ fontSize: "0.8em", color: "red", marginLeft: "20px", fontFamily: "Roboto" }}>Veuillez choisir une option de payement</p>}
                </ul>
              </div>
              <button type='button' className={styles.btnCommande}
                onClick={handleSubmit}
              >Passer commande</button>
              {serverMessage && <p style={{ color: "red" }}>{serverMessage}</p>}
            </div>
          </div>
        </section>
      </main>
    </LayoutPage>
  )
}

export default AddressCheckOut
