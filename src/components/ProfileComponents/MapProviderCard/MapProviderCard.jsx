import React, { useState, useEffect, useMemo, useCallback, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { putUserData } from "../../../redux/actions/index";
import Swal from 'sweetalert2'
import styles from "./MapProvider.module.sass";

function MapProviderCard() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  
  const geopositionArray = infoUserLog.geoposition.split(",").map((str) => parseFloat(str.trim()))
  
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({ lat: geopositionArray[0], lng: geopositionArray[1] });

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          handleSaveGeoposition(marker.getLatLng())
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const handleSaveGeoposition = (position) => {
    const dataToSend = {
      idPeople : infoUserLog.idPeople,
      geoposition : `${position.lat},${position.lng}`
    }
    try {
      dispatch(putUserData(dataToSend));
    } catch (error) {
      Swal.fire({
        title: '¡"Por favor recuerde grabar su posicion en el mapa"!',
        icon: 'info',
      })
    }
  };

  return (
    <div className={styles.background}>
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
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        >
          <Popup>
            <span onClick={toggleDraggable} style={{ cursor: "pointer" }}>
              {draggable
                ? "Arrastre el marcador"
                : "Click aquí para editar su posición"}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
      <div className={styles.ubicate}>Ubicate en el Mapa</div>
    </div>
  );
}
export default MapProviderCard;

