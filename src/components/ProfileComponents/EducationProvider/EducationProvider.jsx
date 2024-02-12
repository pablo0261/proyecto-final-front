import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteService } from "../../../redux/actions/index";
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
    if (
      infoUserLog &&
      infoUserLog.categories &&
      infoUserLog.categories.length > 0
    ) {
      const educationOptions = infoUserLog.categories[1].categories_options;

      if (educationOptions && educationOptions.length > 0) {
        const educationData = educationOptions.map((option) => ({
          idPeople: infoUserLog.idPeople,
          idOption: option.idOption,
          education: option.description || "No informado",
          institution: option.people_options[0].institution || "No informado",
          year: option.people_options[0]?.year || "No informado",
          comment:
            option.people_options[0]?.comment || "No informado",
        }));

        setEducation(educationData);
      }
    }
  }, [infoUserLog]);

  const handleDeleteService = (idOption, event) => {
    event.preventDefault();
    const deleteData = {
      "idPeople": infoUserLog.idPeople,
      "idOption": idOption,
    };
    dispatch(deleteService(deleteData));
  };
  
  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Educación</h1>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>

      <div className={style.educationdetailContainer}>
        {education.map((option, index) => (
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
                  {option.comment}
                </p>
              </div>
              <button
                 onClick={(event) => handleDeleteService(option.idOption, event)}
                className={style.crossButton}
              ></button>
              {showForm && <Form handleShowForm={handleShowForm} />}
            </div>
            {index !== education.length - 1 && (
      <div>
        <p className={style.line}></p>
      </div>
    )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationProvider;
