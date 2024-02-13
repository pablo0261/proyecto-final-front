import { useState } from 'react';
import Validation from './validationFormFAQs'; // Importa la función de validación
import styles from "./FormFAQs.module.scss"; 
import { useDispatch } from 'react-redux';
import { createFAQs } from '../../../redux/actions/index';

const FormFAQs = ({ onAddQuestion, typeOfQuestion }) => {
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    typeOfQuestion:'TYPE_OF_QUESTION_FAQ',
    destination:typeOfQuestion === 'provider' ? ' USER_PROVIDER' : 'USER_CUSTOMER',
    question: '',
    answer: ''
});

  const [localErrors, setLocalErrors] = useState({ 
    question: '',
    answer: ''
  });

  const clearFormData = () => {
    setFormData({
      question: '',
      answer: ''
    });
};

const dispatch = useDispatch();

  // Función que maneja los cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Actualiza el estado formData con el nuevo valor
    Validation(name, setLocalErrors, { ...formData, [name]: value }); // Realiza la validación de los campos
  };
  

  // Función que maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const isValid = Object.values(localErrors).every((error) => error === ''); // Verifica si hay errores de validación

    // Verifica si no hay errores y los campos no están vacíos
    if (isValid) {
      onAddQuestion(formData.question, formData.answer); // Llama a la función para agregar la pregunta y la respuesta
      
      dispatch(createFAQs(formData));
                setSuccessMessage('Pregunta y respuesta enviadas con éxito');
                clearFormData();
    } else {
      setSuccessMessage('Formulario con errores');
      
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.Form} onSubmit={handleSubmit}> {/* Inicia el formulario y maneja el evento de envío */}
        <div className={styles.FormDivInputFlex}>
          <label htmlFor='question'>Ingresa una pregunta:</label> {/* Etiqueta para la pregunta */}
          <input
            id="question"
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange} // Maneja los cambios en la pregunta
            placeholder="Ingrese la pregunta"
          />
          {localErrors.question && <div className={styles.errorMessage}>{localErrors.question}</div>} {/* Muestra el mensaje de error si existe */}
          <label htmlFor='answer'>Ingresa una respuesta:</label> {/* Etiqueta para la respuesta */}
          <textarea
            id='answer'
            name="answer"
            value={formData.answer}
            onChange={handleChange} // Maneja los cambios en la respuesta
            placeholder="Ingrese la respuesta"
          ></textarea>
          {localErrors.answer && <div className={styles.errorMessage}>{localErrors.answer}</div>} {/* Muestra el mensaje de error si existe */}
          <button type="submit">Guardar</button> {/* Botón para enviar el formulario */}
        </div>
      </form>
      {successMessage && <p className={styles.errorMessage}>{successMessage}</p>}
    </div>
  );
};

export default FormFAQs;


/* ¿Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam? */

/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  */
