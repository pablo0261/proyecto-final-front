import {  useSelector } from "react-redux";
// import { handleDeleteService, handleContratService } from "redux/actions";

function ServicesProveedorCard() {

  // const dispatch = useDispatch();
  const infoDetailProveedor = useSelector((state) => state.infoDetailProveedor);

  // useEffect(() => {
  //   let isProvider;
  //   if (localStorage.getItem("isProvider") !== "undefined") {
  //     isProvider = JSON.parse(localStorage.getItem("isProvider"));
  //   } else {
  //     isProvider = null;
  //     window.alert("LocalStorage.isProvider No Existe. ¡¿Landing?!");
  //   }
  // }, []);

  const handleDeleteClick = () => {
    //  dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  };

  const handleContratClick = () => {
    // dispatch(handleContratService(item)); // Debes definir y exportar la acción handleContratClick
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <hh></hh>
            <h2>Servicios</h2>
            <th>Precio x Hora</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {infoDetailProveedor.servicios.map((item, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => handleDeleteClick(item)}>X</button>
              </td>
              <td>{item.servicio}</td>
              <td>{item.valor}</td>
              <td>
                <button onClick={() => handleContratClick(item)}>
                  Contratar este Servicio
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <img src="editImage" alt="edit" />
    </div>
  );
}

export default ServicesProveedorCard;
