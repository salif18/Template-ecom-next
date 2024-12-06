"use client";

import { MapContainer, TileLayer, Marker, useMap, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerIcon from "@/node_modules/leaflet/dist/images/marker-icon.png";
import { useEffect, useState } from "react";

const MyMaps = ({ position, setPosition }) => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

  // Custom hook to handle map events
  const LocationMarker = () => {
    const map = useMap(); // useMap hook to get the map instance
    useEffect(() => {
      const handleMapClick = (e) => {
        setPosition(e.latlng); // Update position on click
      };
      
      // Attach click event listener to the map
      map.on('click', handleMapClick);

      return () => {
        map.off('click', handleMapClick); // Cleanup listener
      };
    }, [map, setPosition]);

    return position ? (
      <Marker
        icon={L.icon({
          iconUrl: MarkerIcon.src,
          iconRetinaUrl: MarkerIcon.src,
          iconSize: [25, 41],
          iconAnchor: [12.5, 41],
          popupAnchor: [0, -41],
        })}
        position={position}
      />
    ) : null;
  };

  // Ensure the map is only rendered on the client-side
//  if (!isClient) return null;

  return (
    <MapContainer
      center={[12.583126, -7.929346]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Vue Street" checked>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Vue Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <LocationMarker />
    </MapContainer>
  );
};

export default MyMaps;
