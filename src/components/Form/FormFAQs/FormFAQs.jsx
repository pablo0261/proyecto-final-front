import { useState } from 'react';
import Validation from './validationFormFAQs';
import styles from "./FormFAQs.module.scss";

const FormFAQs = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [localErrors, setLocalErrors] = useState({
    Pregunta: '',
    Respuesta: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    Validation(name, setLocalErrors, { Pregunta: question, Respuesta: answer });
    name === 'Pregunta' ? setQuestion(value) : setAnswer(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const hasErrors = Object.values(localErrors).some((error) => error !== '');

    // Verificar que no haya errores y que ambas pregunta y respuesta no estén vacías
    if (!hasErrors && question.trim() !== '' && answer.trim() !== '') {
      onAddQuestion(question, answer);
      setQuestion('');
      setAnswer('');
      setLocalErrors({
        Pregunta: '',
        Respuesta: ''
      });
    } else {
      window.alert('Formulario con errores o campos vacíos');
    }
  };


  return (

    <div className={styles.wrapper}>

      <form className={styles.Form} onSubmit={handleSubmit}>

        
          <div className={styles.FormDivInputFlex}>

            <label>Ingresa una pregunta:</label>
            <input
            id="pregunta"
              type="text"
              name="Pregunta"
              value={question}
              onChange={handleChange}
              placeholder="Ingrese la pregunta"
            />
            {localErrors.Pregunta && <div className="error-message">{localErrors.Pregunta}</div>}

            <label>Ingresa una respuesta:</label>
            <textarea
              name="Respuesta"
              value={answer}
              onChange={handleChange}
              placeholder="Ingrese la respuesta"
            ></textarea>

            {localErrors.Respuesta && <div className="error-message">{localErrors.Respuesta}</div>}
            <button type="submit">Guardar</button>
          </div>
        

      </form>

    </div>

  );
};

export default FormFAQs;
