import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteService } from "../../../redux/actions/index";
import Form from "../../Form/FormSkills/FormSkills";
import style from "./SkillsProvider.module.sass";

function SkillsProviderCard() {
  const dispatch = useDispatch();
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
  
      console.log("skillsOptions", skillsOptions);
      if (skillsOptions && skillsOptions.length > 0) {
        const skillData = skillsOptions.map((option) => ({
          idOption: option.idOption,
          Skill: option.description,
        }));
        setSkills(skillData);
      }
    }
  }, [infoUserLog]);

  const handleDeleteService = (idOption, event) => {
    event.preventDefault();
    const deleteData = {
      idPeople: infoUserLog.idPeople,
      idOption: idOption,
    };

    const confirmDelete = window.confirm("¿Está seguro de que desea eliminar la habilidad?");

    if (confirmDelete) {
    console.log("Valor de deleteData:", deleteData);
    dispatch(deleteService(deleteData));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Habilidades</h1>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>

      <div className={style.containerCard}>
        {skills.map((option) => (
          <div className={style.skillsdetailContainer} key={option.idOption}>
            <button className={style.skillFalseButton}> {option.Skill}</button>
            <button
              onClick={(event) => handleDeleteService(option.idOption, event)}
              className={style.crossButton}
              ></button>
          </div>
        ))}
      </div>
        {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default SkillsProviderCard;
