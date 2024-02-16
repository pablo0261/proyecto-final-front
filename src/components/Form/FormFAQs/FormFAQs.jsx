import { useState } from 'react';
import Validation from './validationFormFAQs';
import styles from "./FormFAQs.module.scss";
import { useDispatch } from 'react-redux';
import { createFAQs } from '../../../redux/actions/index';

const FormFAQs = ({ typeOfFAQs }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    typeOfQuestion: 'faq',
    destination: typeOfFAQs === 'provider' ? 'provider' : 'customer',
    title: '',
    message: ''
  });

  const [localErrors, setLocalErrors] = useState({
    title: '',
    message: ''
  });

  const clearFormData = () => {
    setFormData({
      typeOfQuestion: 'faq',
      destination: typeOfFAQs === 'provider' ? 'provider' : 'customer',
      title: '',
      message: ''
    });
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Actualiza el estado formData con el nuevo valor
    Validation(name, setLocalErrors, { ...formData, [name]: value }); // Realiza la validación de los campos
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = Object.values(localErrors).every((error) => error === '');

    if (isValid) {
      dispatch(createFAQs(formData))
        .then(() => {
          setSuccessMessage('Pregunta y respuesta enviadas con éxito');
          clearFormData();
        })
        .catch(() => {
          setSuccessMessage('Error al enviar el reporte');
        });
    } else {
      setSuccessMessage('Formulario con errores');
      window.alert('Por favor complete el formulario correctamente antes de enviarlo');
    }
  };

  const isFormValid = formData.title !== '' && formData.message !== '' && Object.values(localErrors).every((error) => error === '');

  return (
    <div className={styles.wrapper}>

      <form className={styles.Form} onSubmit={handleSubmit}>
        <div className={styles.FormDivInputFlex}>

          {/* question */}
          <label htmlFor='title'>Ingresa una pregunta:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ingrese la pregunta"
          />
          {localErrors.title && <div className={styles.errorMessage}>{localErrors.title}</div>}

          {/* answer */}
          <label htmlFor='message'>Ingresa una respuesta:</label>
          <textarea
            id='message'
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Ingrese la respuesta"
          ></textarea>
          {localErrors.message && <div className={styles.errorMessage}>{localErrors.message}</div>}

          <button type="submit" disabled={!isFormValid}>Guardar</button>

        </div>
      </form>
      {successMessage && <p className={styles.errorMessage}>{successMessage}</p>}
    </div>
  );
};

export default FormFAQs;


/* ¿Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam? */

/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  */