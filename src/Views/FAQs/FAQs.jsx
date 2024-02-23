import styles from './faqs.module.scss';
import more from '../../assets/Icons/more.svg'
import less from '../../assets/Icons/less.svg'
import Loading from '../../../src/assets/Icons/loadingHouse.gif'
import { useEffect, useState } from 'react';
import FormFAQs from '../../components/Form/FormFAQs/FormFAQs';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQs } from '../../redux/actions';
import Swal from 'sweetalert2';
import axios from 'axios';

const FAQs = () => {

  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const userLoggedInfo = useSelector(state => state.infoUserLog);
  const FAQs = useSelector((state) => state.faqS);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [showFormProvider, setShowFormProvider] = useState(false);
  const [showFormCustomer, setShowFormCustomer] = useState(false);

  const [expandedAnswers, setExpandedAnswers] = useState({});

  /* Get FAQs */
  useEffect(() => {
    const getFaqsFunction = async () => {
      try {
        await dispatch(getFAQs())
      } catch (error) {
        Swal.fire({
          title: `${error}`,
          text: 'Error al recibir las FAQS',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    getFaqsFunction()
  }, []);

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

  const handleShowForm = (type) => {
    if (type === 'provider') {
      setShowFormProvider(true)
    } else if (type === 'customer') {
      setShowFormCustomer(true)
    } else {
      setShowForm(true)
    }
  };

  /* Función para eliminar una pregunta */
  const handleDeleteQuestion = (idQuestion) => {
    Swal.fire({
      title: "¿Quieres eliminar esta FAQ?",
      text: "Confirma que quieres eliminar esta pregunta",
      icon: "question",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "Grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "Red",
    }).then((response) => {
      if (response.isConfirmed) {
        axios.delete(`${REACT_APP_API_URL}/questions/${idQuestion}`)
          .then((response) => {
            if (response.status === 200) {
              dispatch(getFAQs());
            }
          })
          .catch((response) =>
            Swal.fire({
              title: `${response}`,
              text: "Error al eliminar la FAQ",
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            })
          )
      }
    });
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
      <h2>FAQs Proveedor</h2>
      {FAQs.length != 0 &&
        FAQs.map((faq, index) => {
          if (faq.destination === 'provider') {
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
                {
                  userLoggedInfo.typeOfPerson === 'administrator' &&
                  <div className={styles.container__buttons}>
                    <button onClick={() => confirmDeleteQuestion(faq.idQuestion)}>Eliminar</button>
                    <button onClick={() => handleShowForm("provider")}>Editar</button>
                  </div>
                }
                {showFormProvider && <FormFAQs idQuestion={faq.idQuestion} setShowFormProvider={setShowFormProvider} type={"provider"} />}
              </div>
            );
          }
        })
      }

      {/* FAQs Cliente */}
      <h2>FAQs Cliente</h2>
      {FAQs.length != 0 &&
        FAQs.map((faq, index) => {
          if (faq.destination === 'customer') {
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
                {
                  userLoggedInfo.typeOfPerson === 'administrator' &&
                  <div className={styles.container__buttons}>
                    <button onClick={() => confirmDeleteQuestion(faq.idQuestion)}>Eliminar</button>
                    <button onClick={() => handleShowForm("customer")}>Editar</button>
                  </div>
                }
                {showFormCustomer && <FormFAQs idQuestion={faq.idQuestion} setShowFormCustomer={setShowFormCustomer} type={"customer"} />}
              </div>
            );
          }
        })
      }
      {showForm && <FormFAQs idQuestion={""} setShowForm={setShowForm} type={""} />}
      {
        userLoggedInfo.typeOfPerson === 'administrator' &&
        <button type='button' onClick={() => handleShowForm()} className={styles.buttonCreate}>Crear Pregunta Frecuente</button>
      }
    </div>
  );
};

export default FAQs;