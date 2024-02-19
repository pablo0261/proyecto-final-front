import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteService } from "../../../redux/actions/index";
import Swal from "sweetalert2";
import Form from "../../Form/FormExperience/FormExperience";
import style from "./ExperienciaProvider.module.sass";

function ExperienciaProvider() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);
  const [experience, setExperience] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (infoUserLog.categories && infoUserLog.categories.length > 0) {
      const experienceCategory = infoUserLog.categories.find(
        (category) => category.idCategorie === 7
      );
      if (
        experienceCategory &&
        experienceCategory.categories_options &&
        experienceCategory.categories_options.length > 0
      ) {
        const experienceOption = experienceCategory.categories_options;

        if (experienceOption && experienceOption.length > 0) {
          const experienceData = experienceOption.map((option) => ({
            idPeople: infoUserLog.idPeople,
            idOption: option.idOption,
            education: option.description || "No informado",
            institution: option.people_options[0].institution || "No informado",
            year: option.people_options[0]?.year || "No informado",
            comment: option.people_options[0]?.comment || "No informado",
          }));

          setExperience(experienceData);
        }
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
      title: "Quieres eliminar esta Experiencia?",
      text: `Click en Aceptar para eliminarla, o dale a Cancelar para regresar`,
      footer: "Confirma que quieres eliminar la Experiencia seleccionado",
      icon: "alert",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "Grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "Red",
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch(deleteService(deleteData));
      } 
    });
  }

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Experiencia</h1>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>

      <div className={style.educationdetailContainer}>
        {experience.length > 0 ? (
          experience.map((option, index) => (
            <div key={option.idOption}>
              <div className={style.educationdetailbox}>
                <div className={style.infoContainerLeft}>
                  <h2 className={style.education}>{option.education}</h2>
                  <p className={style.detailInfo}>
                    {option.institution}
                    <br />
                    {option.year}
                  </p>
                </div>
                <div className={style.infoContainerRight}>
                  <p className={style.observationInfo}>{option.comment}</p>
                </div>
                <button
                  onClick={(event) =>
                    handleDeleteService(option.idOption, event)
                  }
                  className={style.crossButton}
                ></button>
              </div>
              {index !== experience.length - 1 && (
                <div>
                  <p className={style.line}></p>
                </div>
              )}
            </div>
          ))
          ) : (
            <p className={style.noInfo}>
            No hay información de experiencia disponible.
          </p>
        )}
      </div>
        {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default ExperienciaProvider;
