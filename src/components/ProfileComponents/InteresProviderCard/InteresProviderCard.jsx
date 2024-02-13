import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteService } from "../../../redux/actions/index";
import Form from "../../Form/FormInteres/FormInteres";
import style from "./InteresProvider.module.sass";

//! CAMBIAR TODO EL COMPONENTE DE SKILLS A ==> EXPERIENCE

function InteresProviderCard() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);
  const [interes, setInteres] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (
      infoUserLog &&
      infoUserLog.categories &&
      infoUserLog.categories.length > 0
    ) {
      const interesOptions = infoUserLog.categories[3].categories_options; //! Aqui se deberian buscar las experiencias del usuario para renderizarlas
  
      if (interesOptions && interesOptions.length > 0) {
        const interesData = interesOptions.map((option) => ({
          idOption: option.idOption,
          Skill: option.description,
        }));
        setInteres(interesData);
      }
    }
  }, [infoUserLog]);

  const handleDeleteService = (idOption, event) => {
    event.preventDefault();
    const deleteData = {
      idPeople: infoUserLog.idPeople,
      idOption: idOption,
    };

    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este interes?");

    if (confirmDelete) {
    dispatch(deleteService(deleteData));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Intereses</h1>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>

      <div className={style.containerCard}>
        {interes.map((option) => (
          <div className={style.skillsdetailContainer} key={option.idOption}>
            <button onClick={(event) => handleDeleteService(option.idOption, event)} className={style.skillFalseButton}> {option.Skill}</button>
          </div>
        ))}
      </div>
        {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}
export default InteresProviderCard;
