import { useSelector } from "react-redux";

function MapProveedorCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const Map = infoUserLog.geoposition || [];

  //* AQUI DEBERIA RENDERIZAR EL MAPA CON LA POSICION QUE LLEGA DEL BACK

  return (
    <div className="container">
      <p>AQUI EL MAPA</p>  
       {`${Map}`}
    </div>
  );
}
export default MapProveedorCard;