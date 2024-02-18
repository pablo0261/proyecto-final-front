import React from 'react'
import style from './UserSkills.module.sass'

function UserSkills() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);
  const [skills, setSkills] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (infoUserLog.categories && infoUserLog.categories.length > 0) {
      const skillsCategory = infoUserLog.categories.find(
        (category) => category.id_categorie === 3
      );
      if (
        skillsCategory &&
        skillsCategory.categories_options &&
        skillsCategory.categories_options.length > 0
      ) {
        const skillsOptions = skillsCategory.categories_options;

        if (skillsOptions && skillsOptions.length > 0) {
          const skillData = skillsOptions.map((option) => ({
            idOption: option.idOption,
            Skill: option.description,
          }));
          setSkills(skillData);
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

    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar la habilidad?"
    );

    if (confirmDelete) {
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
        {skills.length > 0 ? (
          skills.map((option) => (
            <div className={style.skillsdetailContainer} key={option.idOption}>
              <button
                onClick={(event) => handleDeleteService(option.idOption, event)}
                className={style.skillFalseButton}
              >
                {" "}
                {option.Skill}
              </button>
            </div>
          ))
        ) : (
          <p className={style.noInfo}>No hay información de experiencia disponible.</p>
        )}
      </div>
      {showForm && <Form handleShowForm={handleShowForm} />}
    </div>
  );
}

export default UserSkills