import styles from './FAQs.module.scss';
import { useState } from 'react';
import FormFAQs from '../../components/Form/FormFAQs/FormFAQs';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import StoreItem from '../../Helpers/LocalStorage'; 
import { addInfoUserLog, getFiltersOrdersDB, recoverUserLoggedData } from '../../redux/actions';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


const FAQs = () => {
  const [providerFaqList, setProviderFaqList] = useState([]);
  const [clientFaqList, setClientFaqList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [faqType, setFaqType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [expandedAnswers, setExpandedAnswers] = useState({}); 

  const dispatch = useDispatch(); 
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLoggedInfo = useSelector(state => state.infoUserLog);


  useEffect(() => {
    dispatch(getFiltersOrdersDB()); 

    
    if (localStorage.getItem(StoreItem.emailUserLogged)) {
      dispatch(recoverUserLoggedData(localStorage.getItem(StoreItem.emailUserLogged)));
    }
  }, []);

  const handleCallbackResponse = async (response) => {
    const userObject = jwtDecode(response.credential); 

    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/people?email=${userObject.email}`
      ); 

      if (response.data.people.count > 0) {
        const user = response.data.people.data[0].people; 
        localStorage.setItem(StoreItem.emailUserLogged, userObject.email); 
        dispatch(addInfoUserLog(user)); 

       
        if (user.typeOfPerson === 'admin') {

        } else {

        }
      } else {
        window.alert("Usuario no existe."); 
      }
    } catch (error) {
      window.alert(error); 
    }
  };

  useEffect(() => {
    
    google.accounts.id.initialize({
      client_id: "554332329432-0b6a0dh2ihgrkj5obs34lmnngpfvrq4j.apps.googleusercontent.com",
      callback: handleCallbackResponse 
    });

    
    if (!localStorage.getItem(StoreItem.emailUserLogged)) {
      google.accounts.id.prompt();
    }
  }, []);

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
    setShowForm(false); 
  };


  const handleToggleForm = (type) => {
    setShowForm(!showForm); 
    setFaqType(type);
    setEditMode(false); 
    setEditIndex(null); 
  };

  /* Función para eliminar una pregunta */
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
  const toggleAnswer = (index) => {
    setExpandedAnswers(prevState => ({
      ...prevState,
      [index]: !prevState[index] 
    }));
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
              <div className={styles.more} onClick={() => toggleAnswer(index)}>
                <p>{expandedAnswers[index] ? '-' : '+'}</p> 
              </div>
            </div>

            <div className={`${styles.answer} ${expandedAnswers[index] ? styles.expanded : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
          <hr />

          <div className={styles.container__buttons}>
            <button onClick={() => handleDeleteQuestion(index, 'provider')}>Eliminar</button>
            <button onClick={() => handleEditQuestion(index, 'provider')}>Editar</button>
          </div>


        </div>
      ))}
      {/* Mostrar el botón de edición para alternar la visibilidad del formulario */}
      {userLoggedInfo.typeOfPerson === 'admin' && (
        <>
          <button className={styles.buttons} onClick={() => handleToggleForm('provider')}>
            {showForm && faqType === 'provider' ? 'Cancelar' : 'Crear Pregunta'}
          </button>
          {showForm && faqType === 'provider' && <FormFAQs onAddQuestion={handleAddQuestion} />}
        </>
      )}



      {/* FAQs Cliente */}
      <h2>FAQs cliente</h2>

      {clientFaqList.map((faq, index) => (
        <div className={styles.container__item} key={index}>

          {/* Pregunta y respuesta */}
          <div className={styles.item}>
            <div className={styles.question}>
              <h3>{faq.question}</h3>
              <div className={styles.more} onClick={() => toggleAnswer(index)}>
                <p>{expandedAnswers[index] ? '-' : '+'}</p>
              </div>
            </div>

            <div className={`${styles.answer} ${expandedAnswers[index] ? styles.expanded : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
          <hr />

          <div className={styles.container__buttons}>
            <button onClick={() => handleDeleteQuestion(index, 'client')}>Eliminar</button>
            <button onClick={() => handleEditQuestion(index, 'client')}>Editar</button>
          </div>


        </div>
      ))}

      {userLoggedInfo.typeOfPerson === 'admin' && (
        <>
          <button className={styles.buttons} onClick={() => handleToggleForm('client')}>
            {showForm && faqType === 'client' ? 'Cancelar' : 'Crear Pregunta'}
          </button>
          {showForm && faqType === 'client' && <FormFAQs onAddQuestion={handleAddQuestion} />}
        </>
      )}
      
    </div>
  );
};

export default FAQs;
