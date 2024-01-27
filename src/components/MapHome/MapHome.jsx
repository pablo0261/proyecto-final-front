import { MapContainer,TileLayer, Marker, Popup } from 'react-leaflet'

import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const searchControl = new SearchControl({
  notFoundMessage: 'Sorry, that address could not be found.',
  provider: new OpenStreetMapProvider(),
  style: 'bar',
});


import styles from './MapHome.module.sass'

function MapHome() {
  const position = [-31.025, -64.025]
  // var map = L.map('map').setView([51.505, -0.09], 13);
  return (
    <div>
      <MapContainer className={styles.mapContainer} center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>,
    </div>
  )
}

export default MapHome