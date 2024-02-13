import { useSelector } from "react-redux";
import { MapContainer,TileLayer, Marker, Popup } from 'react-leaflet'
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import styles from './MapProvider.module.sass'

const searchControl = new SearchControl({
  notFoundMessage: 'Sorry, that address could not be found.',
  provider: new OpenStreetMapProvider(),
  style: 'bar',
});

function MapProviderCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  //* AQUI DEBERIA TRAER LA POSICION DEL PROVEEDOR DE SU OBJETO
  const geopositionArray = infoUserLog.geoposition.split(',').map(str => parseFloat(str.trim()));
  const position = geopositionArray || [-31.025, -64.025];

 


  return (
    <div>
      <MapContainer className={styles.mapWrapper} center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
export default MapProviderCard;