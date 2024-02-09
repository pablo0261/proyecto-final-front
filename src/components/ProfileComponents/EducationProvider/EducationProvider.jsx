import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Form from "../../Form/FormEducation/FormEducation";
import style from "./EducationProvider.module.sass";

function EducationProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const [showForm, setShowForm] = useState(false);
  const [education, setEducation] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (
      infoUserLog &&
      infoUserLog.categories &&
      infoUserLog.categories.length > 0
    ) {
      const educacion = infoUserLog.categories[1].description;
      const educationOptions = infoUserLog.categories[1].categories_options;

      if (educationOptions && educationOptions.length > 0) {
        const educationData = educationOptions.map((option) => ({
          idOption: option.idOption,
          education: educationOptions[0].description || "No description",
          institution:
            educationOptions[0].people_options[0].institution || "Escuela N-7",
          year: educationOptions[0].people_options[0]?.year || "2004",
          observaciones:
            educationOptions[0].people_options[0]?.comment ||
            "orientacion técnica",
        }));

        setEducation(educationData);
      }
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Educación</h1>
        <button
          onClick={() => handleShowForm()}
          className={style.editButton}
        ></button>
      </div>

      <div >
        {education.map((option) => (
          <div className={style.educationdetailContainer} key={option.idOption}>
            <div className={style.infoContainerLeft}>
              <h2 className={style.education}>{option.education}</h2>
              <p className={style.detailInfo}>
                {option.institution}
                <br />
                {option.year}
              </p>
            </div>

            <div className={style.infoContainerRight}>
              <p className={style.observationInfo} >
                Observaciones: {option.observaciones}
              </p>
            </div>

            <button
              onClick={() => handleDeleteService()}
              className={style.crossButton}
            ></button>

            {/* {option.nivelesDeEducacion.map((nivel) => (
              <div key={nivel.id}>
                <h3>{nivel.titulo}</h3>
                <p>Descripción: {nivel.descripcion}</p>
              </div>
            ))} */}
            {showForm && <Form handleShowForm={handleShowForm} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationProvider;
