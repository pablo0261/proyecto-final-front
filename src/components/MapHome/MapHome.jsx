import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./MapHome.module.sass";
import iconProvider from "../../assets/Icons/providerIcon.png";

function MapProviderCard({providers}) {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const geopositionArray = infoUserLog.geoposition
  ? infoUserLog.geoposition.split(",").map((str) => parseFloat(str.trim()))
  : [-34.6142, -64.177];
  
  const [position, setPosition] = useState({
    lat: geopositionArray[0],
    lng: geopositionArray[1],
  });
  
  const geopositionsArray = Array.isArray(providers)
  ? providers.map((provider) =>
      provider.people.geoposition
        ? provider.people.geoposition
            .split(",")
            .map((str) => parseFloat(str.trim()))
        : [-34.6142, -64.177]
    )
  : [];

const fullNameArray = Array.isArray(providers)
  ? providers.map((provider) => provider.people.fullName)
  : [];

const combinedArray = geopositionsArray.map((position, index) => ({
  position,
  fullName: fullNameArray[index],
}));
  

  const providerIcon = new L.Icon({
    iconUrl:  iconProvider,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div>
      <MapContainer
        className={styles.mapWrapper}
        center={position}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <span style={{ cursor: "pointer" }}>{infoUserLog.fullName}</span>
          </Popup>
        </Marker>
        {Array.isArray(combinedArray) && combinedArray.map((provider, index) => (
          <Marker key={index} position={provider.position} icon={providerIcon}>
            <Popup>{provider.fullName}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
export default MapProviderCard;
