import { useSelector } from "react-redux";
import { useState } from "react";
import "./EducationExperienciaProvider.module.sass";

function EducationExperienciaProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);

  const renderCategorySection = (category) => {
    if (!category.categories_options) {
      return null;
    }

    const handleClikForm = () => {
      setShowForm(!showForm);
    };

    return category.categories_options.map((option) => (
      <div key={option.idOption}>
        <button onClick={() => handleClikForm()} className={style.editButton}></button>
        <h2>{category.description}</h2>
        <p>{option.description}</p>
        <p>Instituto: {option.people_options?.[0]?.institution || 'No especificado'}</p>
        <p>Año de inicio: {option.people_options?.[0]?.year || 'No especificado'}</p>
        <p>Año de fin: {option.people_options?.[0]?.date || 'No especificado'}</p>
        <p>Comentarios: {option.people_options?.[0]?.comment || 'No especificado'}</p>
      </div>
    ));
  };

  const renderSections = () => {
    if (!infoUserLog?.people?.categories) {
      return null;
    }

    return infoUserLog.people.categories.map((category) => (
      <div key={category.idCategorie}>
        {renderCategorySection(category)}
      </div>
    ));
  };

  return <div>{renderSections()}</div>;
}

export default EducationExperienciaProvider;
