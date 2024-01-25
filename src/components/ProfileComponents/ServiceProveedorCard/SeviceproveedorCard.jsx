import {  useSelector } from "react-redux";
// import { handleDeleteService, handleContratService } from "redux/actions";
import "./ServiceProveedorCard.style.css";

function ServicesProveedorCard() {

  // const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);

  // useEffect(() => {
  //   let isProvider;
  //   if (localStorage.getItem("isProvider") !== "undefined") {
  //     isProvider = JSON.parse(localStorage.getItem("isProvider"));
  //   } else {
  //     isProvider = null;
  //     window.alert("LocalStorage.isProvider No Existe. ¡¿Landing?!");
  //   }
  // }, []);

  const handleDeleteClick  = () => {
    //  dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  };
  const handleEditClick = () => {
    //  dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  };

  const handleContratClick = () => {
    // dispatch(handleContratService(item)); // Debes definir y exportar la acción handleContratClick
  };

  return (
    <div className="container">
        <img className="edit" src="editImage" alt="edit" />
      <table>
        <thead>
          <tr>
          <th className="delete"></th>
            <th className="service">Servicios</th>
            <th className="cost">Precio x Hora</th>
            <td>
                <button onClick={() => handleEditClick()}>X</button>
              </td>
          </tr>
        </thead>
        <tbody>
        {infoUserLog.service.map((item, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => handleDeleteClick(item)}>X</button>
              </td>
              <td className="service" >{item.name}</td>
              <td className="cost" >Pesos {item.value}</td>
              <td>
                <button className="buttonContract" onClick={() => handleContratClick(item)}>
                  Contratar este Servicio
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
}

export default ServicesProveedorCard;
