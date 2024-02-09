import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Form from "../../Form/FormSkills/FormSkills";
import style from "./SkillsProvider.module.sass";

function SkillsProviderCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const [showForm, setShowForm] = useState(false);
  const [skills, setSkills] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (
      infoUserLog &&
      infoUserLog.categories &&
      infoUserLog.categories.length > 0
    ) {
      const skillsOptions = infoUserLog.categories[2].categories_options;

      console.log("skillsOptions", skillsOptions)
      
      if (skillsOptions && skillsOptions.length > 0) {
        const skillData = skillsOptions.map((option) => ({
          idOption: option.idOption,
          Skill: option.description || "Ajedrez",
        }));
        console.log("skillData", skillData)
        
        setSkills(skillData);
      }
    }
  }, []);
 
  return (
    <div className={style.container}>
      {/* <div className={style.titleContainer}>
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
            {showForm && <Form handleShowForm={handleShowForm} />}
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default SkillsProviderCard;
