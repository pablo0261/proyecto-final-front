import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { putUserData } from "../../../redux/actions/index";
import styles from "./MapProvider.module.sass";

function MapProviderCard() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  
  const geopositionArray = infoUserLog.geoposition
  ? infoUserLog.geoposition.split(",").map((str) => parseFloat(str.trim()))
  : [-32.635184890429585,-65.19722521105064];

  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({ lat: geopositionArray[0], lng: geopositionArray[1] });

  const dataToSend = {
    idPeople: infoUserLog.idPeople,
    geoposition: `${position.lat},${position.lng}`
  }


  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const handleSaveGeoposition = async () => {
    try {
      await dispatch(putUserData(dataToSend));
      console.log("Datos de geoposición guardados exitosamente:", dataToSend);
    } catch (error) {
      console.error("Error al guardar los datos de geoposición:", error);
    }
  };

  useEffect(() => {
    handleSaveGeoposition();
  }, [position]);

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
    </div>
  );
}
export default MapProviderCard;

