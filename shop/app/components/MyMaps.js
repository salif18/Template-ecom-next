"use client";


import { useState, useEffect } from "react";
import { Marker, MapContainer, TileLayer, useMapEvents, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import MarkerIcon from "@/node_modules/leaflet/dist/images/marker-icon.png"

const MyMaps = ({ position, setPosition }) => {
    // État pour détecter si le composant est monté
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // obtenir position depuis sur la carte
    const LocationMarker = () => {

        useMapEvents({
            click(e) {
                setPosition(e.latlng); // Met à jour la position lors d'un clic
            },
        });

        return position ? <Marker icon={L.icon({
            iconUrl: MarkerIcon.src,
            iconRetinaUrl: MarkerIcon.src,
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41]
        })} position={position} /> : null;
    };

    return (
       
      
        <MapContainer
            center={[12.583126, -7.929346]} 
            zoom={13}
            style={{ height: "300px", width: "100%" }}
        >
            {/* Contrôle pour basculer entre les couches */}
            <LayersControl position="topright">
                {/* Vue Street (OpenStreetMap) */}
                <LayersControl.BaseLayer name="Vue Street" checked>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </LayersControl.BaseLayer>

                {/* Vue Satellite (Esri Satellite) */}
                <LayersControl.BaseLayer name="Vue Satellite">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            <LocationMarker />
        </MapContainer>
    )
}

export default MyMaps
