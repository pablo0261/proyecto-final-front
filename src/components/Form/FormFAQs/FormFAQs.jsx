import { useState } from 'react';
import Validation from './validationFormFAQs';
import styles from "./FormFAQs.module.scss";

const FormFAQs = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [localErrors, setLocalErrors] = useState({
    question: '',
    answer: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    Validation(name, setLocalErrors, { question: question, answer: answer });
    name === 'question' ? setQuestion(value) : setAnswer(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasErrors = Object.values(localErrors).some((error) => error !== '');

    // Verificar que no haya errores y que ambas question y answer no estén vacías
    if (!hasErrors && question.trim() !== '' && answer.trim() !== '') {
      onAddQuestion(question, answer);
      setQuestion('');
      setAnswer('');
      setLocalErrors({
        question: '',
        answer: ''
      });
    } else {
      window.alert('Formulario con errores o campos vacíos');
    }
  };


  return (

    <div className={styles.wrapper}>

      <form className={styles.Form} onSubmit={handleSubmit}>


        <div className={styles.FormDivInputFlex}>

          <label htmlFor='question'>Ingresa una question:</label>
          <input
            id="question"
            type="text"
            name="question"
            value={question}
            onChange={handleChange}
            placeholder="Ingrese la pregunta"
          />
          {localErrors.question && <div className="error-message">{localErrors.question}</div>}

          <label htmlFor='answer'>Ingresa una respuesta:</label>
          <textarea
            id='answer'
            name="answer"
            value={answer}
            onChange={handleChange}
            placeholder="Ingrese la respuesta"
          ></textarea>

          {localErrors.answer && <div className="error-message">{localErrors.answer}</div>}
          <button type="submit">Guardar</button>
        </div>


      </form>

    </div>

  );
};

export default FormFAQs;
