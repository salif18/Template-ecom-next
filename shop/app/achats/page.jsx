"use client"

import React, { useContext, useEffect, useState } from 'react'
import LayoutPage from '../layouts/Layout'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { LiaStreetViewSolid } from "react-icons/lia";
import { FaDoorClosed } from "react-icons/fa";

const MyAchat = () => {
const { userId , token } = useContext(AuthContext)
  const [orders , setOrders] = useState([])
  
  //recuperer le produit et les recommandations
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URI}/commandes/order/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`, // Ajoutez le token si nécessaire
                },
            });
            if (res.status === 200) {
                setOrders(res?.data?.orders);
            }

        } catch (err) {
            console.log("Erreur lors de la récupération du produit :", err);
        }
    };
    fetchData();
}, [userId]);

const Headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer `,
  },
   }

    const handleChangeStatus =async(id,newStatus)=>{
        try{
           const response = await  axios.put(`${process.env.NEXT_PUBLIC_URI}/commandes/order/${id}/updateStatus`, {newStatus}, Headers);
           if(response.status === 200){
            console.log(response?.data?.message)
           }
        }catch(e){
        console.log(e.response?.data?.message || "error")
        }
    }

  return (
    <LayoutPage>
      <main className='achats'>
      <section className='title'>
         <h2>Mes achats</h2>
      </section>
      <section className='list-achat'>
      {orders?.map((order)=>
      <>
        <section className="column" key={order?._id}>
                    <p>Merci. Votre commande a été reçue.</p>
                    {order?.status === "En attente" && <button className='cancel' onClick={()=>handleChangeStatus(order?._id,"Annulée")}>Annuler</button> }
                    <section className="row">
                        <div className="rowCol">
                            <p>Date</p>
                            <h2>{new Date(order?.createdAt).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
                        </div>
                        <div className="rowCol">
                            <p>Total</p>
                            <h2>{order?.total} FCFA</h2>
                        </div>
                        <div className="rowCol">
                            <p>Mode de paiement</p>
                            <h2>{order?.payementMode}</h2>
                        </div>
                        <div className="rowCol">
                            <p>Status de la commande</p>
                            <h2>{order?.status}</h2>
                        </div>
                    </section>
                </section>
                <section className="details">
                    <div className="title">
                        <h2>Details de la commande</h2>
                    </div>
                    <div className="productTitle">
                        <h2>Produits</h2>
                        <h2>Total</h2>
                    </div>
                   
                    {
                        order?.cart?.map(item =>
                            <di key={item._id} className="products">
                                <div className="productsDiv"><p>{item.name} x{item.qty}</p></div>
                                <div className="productsDiv"><p>{item.price * item.qty}</p></div>
                            </di>
                        )
                    }

                    <div className="products">
                        <div className="productsDiv"><p>Mode de paiement</p></div>
                        <div className="productsDiv"><p>{order?.payementMode}</p></div>
                    </div>
                    <div className="products">
                        <div className="productsDiv"><p>Total</p></div>
                        <div className="productsDiv"><p>{order?.total} Fcfa</p></div>
                    </div>
                </section>

                <section className="address">
                    <div className="title">
                        <h2>Addresse</h2>
                    </div>
                    <section className="addressData">
                        <p>{order?.user?.name}</p>
                        <p><MdOutlinePhoneInTalk style={{fontSize:"24px", marginRight:"10px"}} />  {order?.user?.numero}</p>
                        <p><MdOutlineEmail style={{fontSize:"24px", marginRight:"10px"}} /> {order?.user?.email}</p>
                        <p><SlLocationPin style={{fontSize:"24px", marginRight:"10px"}} /> {order?.address?.ville}</p>
                        <p><LiaStreetViewSolid style={{fontSize:"24px", marginRight:"10px"}} /> {order?.address?.rue}</p>
                        <p><FaDoorClosed style={{fontSize:"24px", marginRight:"10px"}} /> {order?.address?.logt}</p>
                    </section>
                </section>
                </>
      )}
      </section>
      
      </main>
    </LayoutPage>
  )
}

export default MyAchat
