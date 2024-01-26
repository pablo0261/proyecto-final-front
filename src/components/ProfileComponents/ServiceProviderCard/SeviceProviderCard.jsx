import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { handleDeleteService, handleContratService } from "redux/actions";
import "./ServiceProviderCard.style.css";

function ServicesProviderCard() {
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

  const handleDeleteClick = () => {
    //  dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  };
  const handleEditClick = () => {
    //  dispatch(handleDeleteService(item)); //* enviará un put para actualizar el estado global infoDetailProveedor
  };

  return (
    <div className="container">
      <Link to={{ pathname: `/form/${2}` }}>
        <button src="editImage" alt="edit" className="edit-button">
          {" "}
          Edit
        </button>
      </Link>
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
              <td className="service">{item.name}</td>
              <td className="cost">Pesos {item.value}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicesProviderCard;
