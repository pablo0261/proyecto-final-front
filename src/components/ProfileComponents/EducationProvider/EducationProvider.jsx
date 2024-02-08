import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Form from "../../Form/FormServices/Form";
import style from "./EducationProvider.module.sass";

function EducationProvider() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const [showForm, setShowForm] = useState(false);
  const [education, setEducation] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (infoUserLog && infoUserLog.categories && infoUserLog.categories.length > 0) {
      const educacion = infoUserLog.categories[1].description;
      const educationOptions = infoUserLog.categories[1].categories_options;
  
  
      if (educationOptions && educationOptions.length > 0) {
        const educationData = educationOptions.map((option) => ({
          idOption: option.idOption,
          "Nivel Escolar": educationOptions[0].description || "No description",
          institution: educationOptions[0].people_options[0].institution || "Escuela N-7",
          fecha: educationOptions[0].people_options[0]?.date || "15/11",
          año: educationOptions[0].people_options[0]?.year || "2004",
          observaciones: educationOptions[0].people_options[0]?.comment || "orientacion técnica",
          nivelesDeEducacion: []
        }));
  
        setEducation(educationData);
      }
    }
  }, []);
    
  return (
    <div>
      <div>
        <h1>Educación</h1>
        <button
          onClick={() => handleShowForm()}
          className={style.editButton}
        ></button>
      </div>
      <div>
      {education.map((option) => (
        <div key={option.idOption}>
          <h2>{option["Nivel Escolar"]}</h2>
          <p>Institución: {option.institution}</p>
          <p>Fecha: {option.fecha}</p>
          <p>Año: {option.año}</p>
          <p>Observaciones: {option.observaciones}</p>
          {option.nivelesDeEducacion.map((nivel) => (
            <div key={nivel.id}>
              <h3>{nivel.titulo}</h3>
              <p>Descripción: {nivel.descripcion}</p>
              <button
                onClick={() => handleDeleteService()}
                className={style.crossButton}
              ></button>
            </div>
          ))}
          {showForm && <Form handleShowForm={handleShowForm} />}
        </div>
      ))}
      </div>
    </div>
  );
}

export default EducationProvider;