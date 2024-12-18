"use client"
import React, { useContext, useEffect, useState } from 'react'
import LayoutPage from '../layouts/Layout';
import styles from "../styles/_confirmOrder.module.scss"
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { LiaStreetViewSolid } from "react-icons/lia";
import { FaDoorClosed } from "react-icons/fa";
import axios from 'axios';

// import data from "../lib/data"

const ConfirmOrder = () => {
    const [order, setOrder] = useState({});
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
            setData(response.data.produits)
            console.log(response.data)
           }
          }catch(e){
           console.error( e.response.data.message || "erreur ")
          }
        }
   
        getProducts()
     },[])
    
   

    useEffect(() => {
        const orderlocal = localStorage.getItem('order');
        if (orderlocal) {
            try {
                setOrder(JSON.parse(orderlocal));
            } catch (e) {
                console.error("Erreur lors de l'analyse JSON:", e);
                setOrder({});
            }
        } else {
            setOrder({});
        }
    }, []);

    const { user = {}, address = {}, cart = [], total = 0 } = order;

    const product = cart.map((item )=>{
     const article = data.length > 0 ? data.find((prod)=> prod._id == item.producId): [] ;
     return {...article , qty:item.qty}
}) 


    
    return (
        <LayoutPage>
            <main className={styles.confirmOrder}>
                <section className={styles.title}>
                    <h1>Confirmation de commande</h1>
                </section>
                <section className={styles.column}>
                    <p>Merci. Votre commande a été reçue.</p>
                    <section className={styles.row}>
                        <div className={styles.rowCol}>
                            <p>Date</p>
                            <h2>07/11/2024</h2>
                        </div>
                        <div className={styles.rowCol}>
                            <p>Total</p>
                            <h2>{total} FCFA</h2>
                        </div>
                        <div className={styles.rowCol}>
                            <p>Mode de paiement</p>
                            <h2>{order.payementMode}</h2>
                        </div>
                    </section>
                </section>

                <section className={styles.details}>
                    <div className={styles.title}>
                        <h2>Details de la commande</h2>
                    </div>
                    <div className={styles.productTitle}>
                        <h2>Produits</h2>
                        <h2>Total</h2>
                    </div>
                   
                    {
                        product.map(item =>
                            <di key={item._id} className={styles.products}>
                                <div className={styles.productsDiv}><p>{item.name && item.name} x{item.qty && item.qty}</p></div>
                                <div className={styles.productsDiv}><p>{item.price * item.qty}</p></div>
                            </di>
                        )
                    }

                    <div className={styles.products}>
                        <div className={styles.productsDiv}><p>Mode de paiement</p></div>
                        <div className={styles.productsDiv}><p>{order.payementMode}</p></div>
                    </div>
                    <div className={styles.products}>
                        <div className={styles.productsDiv}><p>Total</p></div>
                        <div className={styles.productsDiv}><p>{total} Fcfa</p></div>
                    </div>
                </section>

                <section className={styles.address}>
                    <div className={styles.title}>
                        <h2>Addresse</h2>
                    </div>
                    <section className={styles.addressData}>
                        <p>{user?.username}</p>
                        <p><MdOutlinePhoneInTalk style={{fontSize:"24px", marginRight:"10px"}} />  {user.numero}</p>
                        <p><MdOutlineEmail style={{fontSize:"24px", marginRight:"10px"}} /> {user.email}</p>
                        <p><SlLocationPin style={{fontSize:"24px", marginRight:"10px"}} /> {address.ville}</p>
                        <p><LiaStreetViewSolid style={{fontSize:"24px", marginRight:"10px"}} /> {address.rue}</p>
                        <p><FaDoorClosed style={{fontSize:"24px", marginRight:"10px"}} /> {address.logt}</p>
                    </section>
                </section>
            </main>
        </LayoutPage>
    )
}

export default ConfirmOrder
