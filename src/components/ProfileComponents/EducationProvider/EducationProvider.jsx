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
      const educationOptions = infoUserLog.categories[1].categories_options;

      if (educationOptions && educationOptions.length > 0) {
        const educationData = educationOptions.map((option) => ({
          idOption: option.idOption,
          education: option.description || "No description",
          institution: option.people_options[0].institution || "Escuela N-7",
          year: option.people_options[0]?.year || "2004",
          observaciones:
            option.people_options[0]?.comment || "orientacion técnica",
        }));

        setEducation(educationData);
      }
    }
  }, []);

  const handleDeleteService = () => {
    dispatchEvent(deleteEducation(education));
  };

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Educación</h1>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>

      <div className={style.educationdetailContainer}>
        {education.map((option) => (
          <div key={option.idOption} >
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
                <p className={style.observationInfo}>
                  Observaciones: {option.observaciones}
                </p>
              </div>
              <button
                onClick={handleDeleteService}
                className={style.crossButton}
              ></button>
              {showForm && <Form handleShowForm={handleShowForm} />}
            </div>
            <div>
              <p className={style.line}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationProvider;
