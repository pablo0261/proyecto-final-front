import styles from './FAQs.module.scss';
import { useState } from 'react';
import FormFAQs from '../../components/Form/FormFAQs/FormFAQs';

const FAQs = () => {
  const [providerFaqList, setProviderFaqList] = useState([]);
  const [clientFaqList, setClientFaqList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [faqType, setFaqType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [expanded, setExpanded] = useState(false); // Estado para controlar la expansión de la respuesta

  const handleAddQuestion = (newQuestion, newAnswer) => {
    if (faqType === 'provider') {
      if (editMode && editIndex !== null) {
        const updatedList = [...providerFaqList];
        updatedList[editIndex] = { question: newQuestion, answer: newAnswer };
        setProviderFaqList(updatedList);
        setEditMode(false);
        setEditIndex(null);
      } else {
        setProviderFaqList([...providerFaqList, { question: newQuestion, answer: newAnswer }]);
      }
    } else if (faqType === 'client') {
      if (editMode && editIndex !== null) {
        const updatedList = [...clientFaqList];
        updatedList[editIndex] = { question: newQuestion, answer: newAnswer };
        setClientFaqList(updatedList);
        setEditMode(false);
        setEditIndex(null);
      } else {
        setClientFaqList([...clientFaqList, { question: newQuestion, answer: newAnswer }]);
      }
    }
    setShowForm(false); // Oculta el formulario después de agregar una pregunta
  };


  const handleToggleForm = (type) => {
    setShowForm(!showForm); // Alternar la visibilidad del formulario
    setFaqType(type);
    setEditMode(false); // Salir del modo de edición al mostrar el formulario
    setEditIndex(null); // Restablecer el índice de edición
  };

  const handleDeleteQuestion = (index, type) => {
    if (type === 'provider') {
      const updatedList = [...providerFaqList];
      updatedList.splice(index, 1);
      setProviderFaqList(updatedList);
    } else if (type === 'client') {
      const updatedList = [...clientFaqList];
      updatedList.splice(index, 1);
      setClientFaqList(updatedList);
    }
  };

  /* Función para entrar en el modo de edición */
  const handleEditQuestion = (index, type) => {
    setEditMode(true);
    setEditIndex(index);
    handleToggleForm(type);
  };

  /* Función para cambiar el estado de visibilidad de answer */
  const toggleAnswer = () => {
    setExpanded(!expanded);
  };



  return (
    <div className={styles.wrap}>

      {/* FAQs proveedor */}
      <h2>FAQs proveedor</h2>
      {providerFaqList.map((faq, index) => (
        <div className={styles.container__item} key={index}>

          {/* Pregunta y respuesta */}
          <div className={styles.item}>
            <div className={styles.question}>
              <h3>{faq.question}</h3>
              <div className={styles.more} onClick={toggleAnswer}>
                <p>{expanded ? '-' : '+'}</p></div>
            </div>

            <div className={`${styles.answer} ${expanded ? styles.expanded : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
          <hr/>

          <div className={styles.container__buttons}>
            <button onClick={() => handleDeleteQuestion(index, 'provider')}>Eliminar</button>
            <button onClick={() => handleEditQuestion(index, 'provider')}>Editar</button>
          </div>


        </div>
      ))}
      {/* Mostrar el botón de edición para alternar la visibilidad del formulario */}
      <button className={styles.buttons} onClick={() => handleToggleForm('provider')}>
        {showForm && faqType === 'provider' ? 'Cancelar' : 'Crear Pregunta'}
      </button>
      {showForm && faqType === 'provider' && <FormFAQs onAddQuestion={handleAddQuestion} />}



      {/* FAQs Cliente */}
      <h2>FAQs cliente</h2>

      {clientFaqList.map((faq, index) => (
        <div className={styles.container__item} key={index}>

        {/* Pregunta y respuesta */}
        <div className={styles.item}>
          <div className={styles.question}>
            <h3>{faq.question}</h3>
            <div className={styles.more} onClick={toggleAnswer}>
              <p>{expanded ? '-' : '+'}</p></div>
          </div>

          <div className={`${styles.answer} ${expanded ? styles.expanded : ''}`}>
            <p>{faq.answer}</p>
          </div>
        </div>
        <hr/>

        <div className={styles.container__buttons}>
          <button onClick={() => handleDeleteQuestion(index, 'provider')}>Eliminar</button>
          <button onClick={() => handleEditQuestion(index, 'provider')}>Editar</button>
        </div>


      </div>
      ))}

      <button className={styles.buttons} onClick={() => handleToggleForm('client')}>
        {showForm && faqType === 'client' ? 'Cancelar' : 'Crear Pregunta'}
      </button>
      {showForm && faqType === 'client' && <FormFAQs onAddQuestion={handleAddQuestion} />}
    </div>
  );
};

export default FAQs;
