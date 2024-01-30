import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./EducationProvider.module.sass";

function EducationProvider() {

//   const infoUserLog = useSelector((state) => state.infoUserLog);
//   const [showForm, setShowForm] = useState(false);

//   const renderSection = (categories, categoryName) => {
//     if (!infoUserLog || !infoUserLog.people || !infoUserLog.people.categories) {
//       return null;
//     }

//     const filteredCategories = infoUserLog.people.categories.filter(
//       (category) => category.description === categoryName
//     );

//     const handleClikForm = () => {
//       setShowForm(!showForm);
//     };

//     return filteredCategories.map((filteredCategory) => (
//       <div key={filteredCategory.idCategorie}>
//         <button onClick={() => handleClikForm()} className={style.editButton}></button>
//         <h2>{filteredCategory.description}</h2>
//         {filteredCategory.categories_options.map((option) => (
//           <div key={option.idOption}>
//             <p>{option.description}</p>
//             <p>Instituto: {option.people_options[0]?.institution || 'No especificado'}</p>
//             <p>Año de inicio: {option.people_options[0]?.year || 'No especificado'}</p>
//             <p>Año de fin: {option.people_options[0]?.date || 'No especificado'}</p>
//             <p>Comentarios: {option.people_options[0]?.comment || 'No especificado'}</p>
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   return (
//     <div>
//       {renderSection(infoUserLog.people.categories, 'Educacion')}
//       {renderSection(infoUserLog.people.categories, 'Habilidades')}
//     </div>
//   );
// }

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

export default EducationProvider;

