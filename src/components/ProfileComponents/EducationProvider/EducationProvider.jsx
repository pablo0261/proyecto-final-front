import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteService } from "../../../redux/actions/index";
import Swal from "sweetalert2";
import Form from "../../Form/FormEducation/FormEducation";
import style from "./EducationProvider.module.sass";

function EducationProvider() {

  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);
  const [education, setEducation] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (infoUserLog.categories && infoUserLog.categories.length > 0) {
      const educationCategory = infoUserLog.categories.find(
        (category) => category.idCategorie === 2
      );
      if (
        educationCategory &&
        educationCategory.categories_options &&
        educationCategory.categories_options.length > 0
      ) {
        const educationOptions = educationCategory.categories_options;

        if (educationOptions) {
          const educationData = educationOptions.map((option) => ({
            idPeople: infoUserLog.idPeople,
            idOption: option.idOption,
            education: option.description,
            institution: option.people_options[0].institution,
            year: option.people_options[0]?.year,
            comment: option.people_options[0]?.comment,
          }));

          setEducation(educationData);
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
      title: "¿Quieres eliminar este nivel de Educación?",
      text: "Confirma que quieres eliminar la Educación seleccionado",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "Grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "Red",
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch(deleteService(deleteData));
        setEducation(preEducation =>
          preEducation.filter(exp => exp.idOption !== idOption)
        );
      }
    });
  };

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.title}>Educación</p>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>
      <div className={style.infoWrapper}>
        {education.length != 0
          ? education.map((option, index) => (
            <div key={option.idOption} className={style.educationWrapper}>
              <div className={style.educationBox}>
                <div className={style.infoContainerLeft}>
                  <p className={style.description}>{option.education}</p>
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
              {index !== education.length - 1 && (
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

export default EducationProvider;
