import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteService } from "../../../redux/actions/index";
import Swal from "sweetalert2";
import Form from "../../Form/FormInteres/FormInteres";
import style from "./InteresProvider.module.sass";

function InteresProviderCard() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);
  const [intereses, setIntereses] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (infoUserLog && infoUserLog.categories && infoUserLog.categories.length > 0) {
      const interesCategory = infoUserLog.categories.find(category => category.idCategorie === 6); 
      
      if (interesCategory && interesCategory.categories_options && interesCategory.categories_options.length > 0) {
        const interesOptions = interesCategory.categories_options;

        const interesData = interesOptions.map((option) => ({
          idOption: option.idOption,
          interes: option.description,
        }));
        setIntereses(interesData);
      }
    }
  }, [infoUserLog]);

  const handleDeleteService = (idOption, event) => {
    event.preventDefault();
    const deleteData = {
      idPeople: infoUserLog.idPeople,
      idOption: idOption,
    };

    Swal.fire({
      title: "Quieres eliminar este Interés?",
      text: `Click en Aceptar para eliminarlo, o dale a Cancelar para regresar`,
      footer: "Confirma que quieres eliminar el Interés seleccionado",
      icon: "alert",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "Grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "Red",
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch(deleteService(deleteData));
        setIntereses(preInteres =>
          preInteres.filter(interes => interes.idOption !== idOption)
        );
      } 
    });
  };

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Intereses</h1>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>

      <div className={style.containerCard}>
        {intereses.length > 0 ? (
          intereses.map((option) => (
          <div className={style.interesDetailContainer} key={option.idOption}>
            <button onClick={(event) => handleDeleteService(option.idOption, event)} className={style.interesFalseButton}> {option.interes}</button>
          </div>
        ))
        ): (
          <p className={style.noInfo}>No hay información de intereses disponible.</p>
        )}
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default InteresProviderCard;
