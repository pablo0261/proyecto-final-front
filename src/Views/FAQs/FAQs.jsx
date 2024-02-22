import styles from './faqs.module.scss';
import more from '../../assets/Icons/more.svg'
import less from '../../assets/Icons/less.svg'
import Loading from '../../../src/assets/Icons/loadingHouse.gif'

import { useEffect, useState } from 'react';
import FormFAQs from '../../components/Form/FormFAQs/FormFAQs';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQs, deleteFAQs } from '../../redux/actions';
import Swal from 'sweetalert2';



const FAQs = () => {
  const [showForm, setShowForm] = useState(false);
  const [faqType, setFaqType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [expandedAnswers, setExpandedAnswers] = useState({});

  const dispatch = useDispatch();

  const userLoggedInfo = useSelector(state => state.infoUserLog);

  const faqSDetail = useSelector((state) => state.faqS);

  const [formData, setFormData] = useState({
    idQuestion: '',
    typeOfQuestion: '',
    destination: '',
    title: '',
    message: ''
  });
  
  /* Get FAQs */
  useEffect(() => {
    dispatch(getFAQs())
      .then(() => {
        setIsLoading(false); 
      })
      .catch((error) => {
        Swal.fire({
          title: `${error}`,
          text: 'Error al enviar las FAQs.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        setIsLoading(false); 
      });
  }, [dispatch]);


  const handleToggleForm = (type) => {
    setShowForm(!showForm);
    setFaqType(type);
    setEditMode(false);
    setEditIndex(null);
  };

  /* Función para confirmar la eliminacion de una FAQs */
  const confirmDeleteQuestion = (idQuestion) => {
    const confirmDelete = 
    Swal.fire({
      title: `Alerta!`,
      text: "¿Está seguro de que desea eliminar la pregunta?",
      icon: 'question',
      confirmButtonText: 'Aceptar'
    });
    if (confirmDelete) {
      handleDeleteQuestion(idQuestion);
    }
  };

  /* Función para eliminar una pregunta */
  const handleDeleteQuestion = (idQuestion) => {
    console.log("ID de la FAQs:", idQuestion);
    dispatch(deleteFAQs(idQuestion));
  };

  /* Función para entrar en el modo de edición */
  const handlePutQuestion = (index, destination) => {
    setEditMode(true);
    setEditIndex(index);

    const faqToEdit = faqSDetail.questions.data[index];
    setFormData({
      idQuestion: faqToEdit.idQuestion,
      typeOfQuestion: faqToEdit.typeOfQuestion,
      destination: destination,
      title: faqToEdit.title,
      message: faqToEdit.message
    });

    setShowForm(true);
    setFaqType(destination);
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

      {isLoading && <img src={Loading} alt="Loading.." />}
      
      {/* FAQs proveedor */}

      <h2>FAQs proveedor</h2>

      {faqSDetail && faqSDetail.questions && faqSDetail.questions.data && faqSDetail.questions.data.map((faq, index) => {
        if (faq.typeOfQuestion === 'faq' && faq.destination === 'provider') {
          return (

            <div className={styles.container__item} key={index}>

              {/* Pregunta y respuesta */}
              <div className={styles.item}>
                <div className={styles.question}>
                  <h3>{faq.title}</h3>
                  <div className={styles.more} onClick={() => toggleAnswer(index)}>
                    <p>{expandedAnswers[index] ? <img className={styles.more} src={less} /> : <img className={styles.more} src={more} />}</p>
                  </div>
                </div>

                <div className={`${styles.answer} ${expandedAnswers[index] ? styles.expanded : ''}`}>
                  <p>{faq.message}</p>
                </div>
              </div>
              <hr />
              {userLoggedInfo.typeOfPerson === 'administrator' && (
                <div className={styles.container__buttons}>
                  <button onClick={() => confirmDeleteQuestion(faq.idQuestion, 'provider')}>Eliminar</button>
                  <button onClick={() => handlePutQuestion(index, 'provider')}>Editar</button>
                </div>
              )}

            </div>

          );
        }
        return null;
      })}

      {/* Mostrar el botón de edición para alternar la visibilidad del formulario */}
      {userLoggedInfo.typeOfPerson === 'administrator' && (
        <>
          {showForm && faqType === 'provider' && <FormFAQs
            typeOfFAQs="provider"
            formData={formData}
            setFormData={setFormData}
          />}
          <div className={styles.container__buttons_close}>
            <button onClick={() => handleToggleForm('provider')}>
              {showForm && faqType === 'provider' ? 'Cerrar formulario' : 'Crear Pregunta'}
            </button>
          </div>
        </>
      )}

      {/* FAQs Cliente */}
      <h2>FAQs cliente</h2>

      {faqSDetail && faqSDetail.questions && faqSDetail.questions.data && faqSDetail.questions.data.map((faq, index) => {
        if (faq.typeOfQuestion === 'faq' && faq.destination === 'customer') {
          return (
            <div className={styles.container__item} key={index}>

              {/* Pregunta y respuesta */}
              <div className={styles.item}>
                <div className={styles.question}>
                  <h3>{faq.title}</h3>
                  <div className={styles.more} onClick={() => toggleAnswer(index)}>
                    <p>{expandedAnswers[index] ? <img className={styles.more} src={less} /> : <img className={styles.more} src={more} />}</p>
                  </div>
                </div>

                <div className={`${styles.answer} ${expandedAnswers[index] ? styles.expanded : ''}`}>
                  <p>{faq.message}</p>
                </div>
              </div>
              <hr />
              {userLoggedInfo.typeOfPerson === 'administrator' && (
                <div className={styles.container__buttons}>
                  <button onClick={() => confirmDeleteQuestion(faq.idQuestion, 'client')}>Eliminar</button>
                  <button onClick={() => handlePutQuestion(index, 'client')}>Editar</button>
                </div>
              )}

            </div>
          );
        }
        return null;
      })}


      {userLoggedInfo.typeOfPerson === 'administrator' && (
        <>
          {showForm && faqType === 'client' && <FormFAQs
            typeOfFAQs="client"
            formData={formData}
            setFormData={setFormData}
          />}
          <div className={styles.container__buttons_close}>
            <button onClick={() => handleToggleForm('client')}>
              {showForm && faqType === 'client' ? 'Cerrar formulario' : 'Crear Pregunta'}
            </button>
          </div>
        </>
      )}

    </div>
  );
};

export default FAQs;