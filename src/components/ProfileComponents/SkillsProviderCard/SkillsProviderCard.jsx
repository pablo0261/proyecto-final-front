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
      const skillsOptions = infoUserLog.categories[2];

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
       <div className={style.titleContainer}>
        <h1 className={style.title}>Habilidades</h1>
        <button
          onClick={() => handleShowForm()}
          className={style.editButton}
        ></button>
      </div>

      <div className={style.containerCard}>
        {skills.map((option) => (
          <div className={style.skillsdetailContainer} key={option.idOption}>
            <button
              className={style.skillFalseButton}
            > {option.Skill}</button>
            
            {showForm && <Form handleShowForm={handleShowForm} />}
          </div>
        ))}
      </div> 
    </div>
  );
}

export default SkillsProviderCard;
