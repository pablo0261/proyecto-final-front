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
    if (infoUserLog.categories && infoUserLog.categories.length != 0) {
      const experienceCategory = infoUserLog.categories.find((category) => category.idCategorie === 7);
      if (experienceCategory && experienceCategory.categories_options.length != 0) {
        const experienceOption = experienceCategory.categories_options.map((option) => {
          const newExperience = {
            idPeople: infoUserLog.idPeople,
            idOption: option.idOption,
            description: option.people_options[0].description,
            institution: option.people_options[0].institution,
            year: option.people_options[0].year,
            comment: option.people_options[0].comment,
          }
          return newExperience
        })
        setExperience(experienceOption);
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
    title: "¿Quieres eliminar esta Experiencia?",
    text: "Confirma que quieres eliminar la Experiencia seleccionado",
    icon: "warning",
    showDenyButton: true,
    denyButtonText: "Cancelar",
    denyButtonColor: "Grey",
    confirmButtonText: "Eliminar",
    confirmButtonColor: "Red",
  }).then((response) => {
    if (response.isConfirmed) {
      dispatch(deleteService(deleteData));
      setExperience(preExperiencie =>
        preExperiencie.filter(exp => exp.idOption !== idOption)
      );
    }
  });
}
return (
  <div className={style.background}>
    <div className={style.wrapper}>
      <p className={style.title}>Experiencia</p>
      <button onClick={handleShowForm} className={style.editButton}></button>
    </div>
    <div className={style.infoWrapper}>
      {experience.length != 0
        ? experience.map((option, index) => (
          <div key={option.idOption} className={style.educationWrapper}>
            <div className={style.educationBox}>
              <div className={style.infoContainerLeft}>
                <p className={style.description}>{option.description}</p>
                <p className={style.detailInfo}>
                  {option.institution}
                  <br />
                  {option.year}
                </p>
              </div>
              <div className={style.infoContainerRight}>
                <p className={style.comment}>{option.comment}</p>
              </div>
              <button onClick={(event) => handleDeleteService(option.idOption, event)} className={style.crossButton}></button>
            </div>
            {index !== experience.length - 1 && (
              <div className={style.line}></div>
            )}
          </div>
        ))
        :
        <p className={style.noInfo}>
          No hay información de educación disponible.
        </p>
      }
    </div>
    {showForm && <Form handleShowForm={handleShowForm} />}
  </div>
);
}

export default ExperienciaProvider;
