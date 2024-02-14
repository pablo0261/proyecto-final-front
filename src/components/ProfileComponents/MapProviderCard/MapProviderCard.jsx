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
    .split(",")
    .map((str) => parseFloat(str.trim())) || "-34.6142, -64.1770"

  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(geopositionArray);
  
  const dataToSend = {
    idPeople:  infoUserLog.idPeople,
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

  const handleSaveGeoposition = () => {
    try {
      dispatch(putUserData(dataToSend));
    } catch (error) {
      console.error("Error al guardar la agenda:", error);
    }
  };

  useEffect(() => {
    handleSaveGeoposition();
  }, []);

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

