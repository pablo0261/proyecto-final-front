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
      title: "¿Quieres eliminar este Interés?",
      text: "Confirma que quieres eliminar el Interés seleccionado",
      icon: "warning",
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
    <div className={style.background}>
      <div className={style.wrapper}>
        <h1 className={style.title}>Intereses</h1>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>
      <div className={style.infoWrapper}>
        {intereses.length != 0
          ? intereses.map((option, index) =>
            <button key={index} onClick={(event) => handleDeleteService(option.idOption, event)} className={style.interes}> {option.interes}</button>)
          : <p className={style.noInfo}>No hay información de intereses disponible.</p>
        }
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default InteresProviderCard;