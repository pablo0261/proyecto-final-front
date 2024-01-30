import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./EducationProvider.module.sass";

function EducationProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog)

  const renderEducationSection = () => {
    if (!infoUserLog || !infoUserLog.people || !infoUserLog.people.categories) {
      return null; // Manejar el caso cuando la información de educación no está disponible
    }

  const educationCategories = infoUserLog.people.categories.filter(
    (category) => category.description === 'Educacion'
  )

  const [showForm, setShowForm] = useState(false)

  const handleClikForm = () => {
    setShowForm(!showForm)
  }

  return educationCategories.map((educationCategory) => (
    
    <div key={educationCategory.idCategorie}>
      <button onClick={()=>handleClikForm()} className={style.editButton}></button>
      <h2>{educationCategory.description}</h2>
      {educationCategory.categories_options.map((option) => (
        <div key={option.idOption}>
          <p>{option.description}</p>
          <p>Instituto: {option.people_options[0]?.institution || 'No especificado'}</p>
          <p>Año de inicio: {option.people_options[0]?.year || 'No especificado'}</p>
          <p>Año de fin: {option.people_options[0]?.date || 'No especificado'}</p>
          <p>Comentarios: {option.people_options[0]?.comment || 'No especificado'}</p>
        </div>
      ))}
    </div>
  ))
}

const renderSkillsSection = () => {
  if (!infoUserLog || !infoUserLog.people || !infoUserLog.people.categories) {
    return null; // Manejar el caso cuando la información de habilidades no está disponible
  }

  const skillsCategories = infoUserLog.people.categories.filter(
    (category) => category.description === 'Habilidades'
  )

  return skillsCategories.map((skillsCategory) => (
    <div key={skillsCategory.idCategorie}>
      <button onClick={()=>handleClikForm()} className={style.editButton}></button>
      <h2>{skillsCategory.description}</h2>
      {skillsCategory.categories_options.map((option) => (
        <div key={option.idOption}>
          <p>{option.description}</p>
          <p>Nivel: {option.people_options[0]?.description || 'No especificado'}</p>
          <p>Instituto: {option.people_options[0]?.institution || 'No especificado'}</p>
          <p>Año: {option.people_options[0]?.year || 'No especificado'}</p>
          <p>Comentarios: {option.people_options[0]?.comment || 'No especificado'}</p>
        </div>
      ))}
    </div>
  ))
}

return (
  <div>
    {renderEducationSection()}
    {renderSkillsSection()}
  </div>
)
}

export default EducationProvider;
