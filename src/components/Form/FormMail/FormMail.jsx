import { useState } from "react";
import Validation from "../FormExperience/validationFormExperience";
import styles from "./FormMail.module.sass";
import axios from "axios";

function Form({ handleShowForm , email}) {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [userData, setUserData] = useState({
    email: email,
    subject: "",
    text: "",
  });
  const [localErrors, setLocalErrors] = useState({
    description: "",
    subject: "",
    text: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    Validation(name, setLocalErrors, { ...userData, [name]: value });
  };
  
  const handleExperienceAdd = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/sendmail`, {
        "to": userData.email,
        "subject": userData.subject,  
        "text": userData.text
      });
      handleShowForm();
    } catch (error) {
      console.error("Error al enviar el correo electrónico", error);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => handleShowForm()}
        ></button>
        <p className={styles.textTitle}>Aqui los mails</p>
        <form
          className={styles.Form}
          onSubmit={(event) => handleExperienceAdd(event)}
        >
          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
            <label className={styles.labels}>Mail:</label>
            <input
            className={styles.inputDetail}
            type="email"
            name="email" // Debería ser "email" en lugar de "mail"
            value={userData.email}
            onChange={handleChange}
            placeholder="Ingrese un correo electronico"
            ></input>
              <div
                className={
                  userData.email &&
                  (localErrors.email
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.email
                  ? localErrors.email
                    ? localErrors.email
                    : "Datos Válidos"
                  : null}
              </div>
            </div>
          </div>

          <div className={styles.FormDivInput}>
            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Asunto:</label>
              <input
                className={styles.inputs}
                type="text"
                name="subject"
                value={userData.subject}
                onChange={handleChange}
                placeholder="Asunto"
              />
              <div
                className={
                  userData.subject &&
                  (localErrors.subject
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.subject
                  ? localErrors.subject
                    ? localErrors.subject
                    : "Datos Válidos"
                  : null}
              </div>
            </div>

            <div className={styles.FormDivInput}>
              <label className={styles.labels}>Mensaje:</label>
              <textarea
                className={styles.inputDetailObservation}
                type="text"
                name="text"
                value={userData.text}
                onChange={handleChange}
                placeholder="Tu Mensaje"
              />
              <div
                className={
                  userData.text &&
                  (localErrors.text
                    ? styles.errorMessage
                    : styles.errorNotMessage)
                }
              >
                {userData.text
                  ? localErrors.text
                    ? localErrors.text
                    : "Datos Válidos"
                  : null}
              </div>
            </div>
          </div>

          <button className={styles.buttonSave} type="submit">
            Enviar
          </button>
        </form>{" "}
      </div>
    </div>
  );
}

export default Form;
