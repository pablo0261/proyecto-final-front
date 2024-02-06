import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./EducationProvider.module.sass";

function EducationProvider() {
  
  const categoriesData = useSelector((state) => {
    return state.allServices[0].categories_options;  
  });

  const [showForm, setShowForm] = useState(false);

  const renderCategorySection = (category) => {
    if (!category.categories_options) {
      return null;
    }

    const handleClikForm = () => {
      setShowForm(!showForm);
    };

    return categoriesData.map((option) => (
      <div key={option.idOption}>
        <button onClick={() => handleClikForm()} className={style.editButton}></button>
        <h2>{category.description}</h2>
        <p>{option.description}</p>
      </div>
    ));
  };

  const renderSections = () => {
    if (!categoriesData) {
      return null;
    }

    return categoriesData.map((category) => (
      <div key={category.idCategorie}>
        RENDER SECTION
        {renderCategorySection(category)}
      </div>
    ));
  };

  return <div>Education Provider: {renderSections()}</div>;
}

export default EducationProvider;
