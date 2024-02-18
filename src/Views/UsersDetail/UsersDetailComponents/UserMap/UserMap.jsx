import React from 'react'
import styles from './UserMap.module.sass'
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

function UserMap(props) {

  const { infoUser } = props
  
  const geopositionArray = infoUser.geoposition
  ? infoUser.geoposition.split(",").map((str) => parseFloat(str.trim()))
  : [-34.6142, -64.1770];

  const position = { lat: geopositionArray[0], lng: geopositionArray[1] }

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
        <Marker
          position={position}
        />
      </MapContainer>
    </div>
  );
}

export default UserMap