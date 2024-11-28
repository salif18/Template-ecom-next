"use client"
import React from 'react'
import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents } from "react-leaflet";

const MyMaps = ({LocationMarker}) => {
  return (
    <MapContainer
    center={[12.583126, -7.929346]} // Paris comme centre par défaut
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
