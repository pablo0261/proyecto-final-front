import styles from './faqs.module.scss';
import more from '../../assets/Icons/more.svg'
import less from '../../assets/Icons/less.svg'
import Loader from '../../utils/Loader/Loader'
import { useEffect, useState } from 'react';
import FormFAQs from '../../components/Form/FormFAQs/FormFAQs';
import { useDispatch, useSelector } from 'react-redux';
import StoreItem from '../../Helpers/LocalStorage';
import { addInfoUserLog, getFiltersOrdersDB, recoverUserLoggedData, getFAQs } from '../../redux/actions';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


const FAQs = () => {
  const [showForm, setShowForm] = useState(false);
  const [faqType, setFaqType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [expandedAnswers, setExpandedAnswers] = useState({});

  const dispatch = useDispatch();
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;//*
  const userLoggedInfo = useSelector(state => state.infoUserLog);

   const faqSDetail = useSelector((state) => state.faqS);
   /* const faqSDetail = {
    "questions": {
      "count": 4,
      "filter": {},
      "data": [
        {
          "idQuestion": "e98fb3cb-1651-4364-94be-9726d8fd8641",
          "typeOfQuestion": "faq",
          "destination": "provider",
          "priority": null,
          "senderMail": null,
          "fullName": null,
          "title": "¿Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam?",
          "receiverMail": null,
          "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
          "response": "pendiente"
        },
        {
          "idQuestion": "ea8a9946-f31c-47c6-97c2-c8703d4120c6",
          "typeOfQuestion": "faq",
          "destination": "customer",
          "priority": null,
          "senderMail": null,
          "fullName": null,
          "title": "¿Tad ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam?",
          "receiverMail": null,
          "message": "Frat ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
          "response": "pendiente"
        },
        {
          "idQuestion": "adebaa18-3c68-495e-85b9-51685207f62f",
          "typeOfQuestion": "qaa",
          "destination": "administrator",
          "priority": null,
          "senderMail": "fulanito@mail.com",
          "fullName": "Fulanito de Tal",
          "title": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
          "receiverMail": null,
          "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
          "response": "pendiente"
        },
        {
          "idQuestion": "f015c472-c087-4703-906c-c0ff56dd47b6",
          "typeOfQuestion": "qaa",
          "destination": "administrator",
          "priority": null,
          "senderMail": "sotanita@mail.com",
          "fullName": "Sotanita Tilin",
          "title": "Alflt ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
          "receiverMail": null,
          "message": "Dfteg ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
          "response": "pendiente"
        }
      ]
    }
  } */
   console.log("Estado global desde FAQs.jsx");
   console.log(faqSDetail);
  
  /* Get FAQs */
   useEffect(() => {
    dispatch(getFAQs())
      .then(() => {
        setIsLoading(false); // Cuando la carga se completa con éxito, se cambia isLoading a false
      })
      .catch((error) => {
        console.error('Error fetching FAQs:', error);
        setIsLoading(false); // En caso de error, también se cambia isLoading a false
      })
  }, [dispatch])

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


        if (user.typeOfPerson === 'administrator') {

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

      {isLoading && <Loader />}
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
                      <p>{expandedAnswers[index] ? <img src={less}/> : <img src={more}/>}</p>
                    </div>
                  </div>

                  <div className={`${styles.answer} ${expandedAnswers[index] ? styles.expanded : ''}`}>
                    <p>{faq.message}</p>
                  </div>
                </div>
                <hr />

                <div className={styles.container__buttons}>
                  <button onClick={() => handleDeleteQuestion(index, 'provider')}>Eliminar</button>
                  <button onClick={() => handleEditQuestion(index, 'provider')}>Editar</button>
                </div>


              </div>
            
          );
        }
        return null;
      })}

      {/* Mostrar el botón de edición para alternar la visibilidad del formulario */}
      {userLoggedInfo.typeOfPerson === 'administrator' && (
        <>
          <button className={styles.buttons} onClick={() => handleToggleForm('provider')}>
            {showForm && faqType === 'provider' ? 'Cancelar' : 'Crear Pregunta'}
          </button>
          {showForm && faqType === 'provider' && <FormFAQs  typeOfFAQs="provider" />}
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
                      <p>{expandedAnswers[index] ? <img src={less}/> : <img src={more}/>}</p>
                    </div>
                  </div>

                  <div className={`${styles.answer} ${expandedAnswers[index] ? styles.expanded : ''}`}>
                    <p>{faq.message}</p>
                  </div>
                </div>
                <hr />

                <div className={styles.container__buttons}>
                  <button onClick={() => handleDeleteQuestion(index, 'client')}>Eliminar</button>
                  <button onClick={() => handleEditQuestion(index, 'client')}>Editar</button>
                </div>


              </div>
          );
        }
        return null;
      })}

      {userLoggedInfo.typeOfPerson === 'administrator' && (
        <>
          <button className={styles.buttons} onClick={() => handleToggleForm('client')}>
            {showForm && faqType === 'client' ? 'Cancelar' : 'Crear Pregunta'}
          </button>
          {showForm && faqType === 'client' && <FormFAQs  typeOfFAQs="client" />}
        </>
      )}

    </div>
  );
};

export default FAQs;
