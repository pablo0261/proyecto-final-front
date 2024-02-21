
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteService } from "../../../redux/actions/index";
import Swal from "sweetalert2";
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
    if (infoUserLog && infoUserLog.categories && infoUserLog.categories.length > 0) {
      const skillCategory = infoUserLog.categories.find(category => category.idCategorie === 3); 
      
      if (skillCategory && skillCategory.categories_options && skillCategory.categories_options.length > 0) {
        const interesOptions = skillCategory.categories_options;

        const skillData = interesOptions.map((option) => ({
          idOption: option.idOption,
          skill: option.description,
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
    

    Swal.fire({
      title: "¿Quieres eliminar esta Habilidad?",
      text: "Confirma que quieres eliminar la Habilidad seleccionada",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "Grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "Red",
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch(deleteService(deleteData));
        setSkills(prevSkills =>
          prevSkills.filter(skill => skill.idOption !== idOption)
        );
      } 
    });
  };

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <h1 className={style.title}>Habilidades</h1>
        <button onClick={handleShowForm} className={style.editButton}></button>
      </div>
      <div className={style.infoWrapper}>
        {skills.length != 0
          ? skills.map(
            (option, index) =>
              <button key={index} onClick={(event) => handleDeleteService(option.idOption, event)} className={style.skill}>{option.skill}</button>
          )
          : <p className={style.noInfo}>No hay información de habilidades disponible.</p>
        }
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default SkillsProviderCard;










