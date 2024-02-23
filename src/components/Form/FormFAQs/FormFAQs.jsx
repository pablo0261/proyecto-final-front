import { useState } from 'react';
import Validation from './validationFormFAQs';
import styles from "./FormFAQs.module.sass";
import { useDispatch } from 'react-redux';
import { createFAQs, putFAQs } from '../../../redux/actions/index';
import Swal from 'sweetalert2'


const FormFAQs = (props) => {

  const { idQuestion, setShowFormProvider, setShowFormCustomer, setShowForm, type } = props
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    typeOfQuestion: 'faq',
    destination: '',
    title: '',
    message: ''
  });

  const [localErrors, setLocalErrors] = useState({
    destination: '*Campo Obligatorio',
    title: '*Campo Obligatorio',
    message: '*Campo Obligatorios'
  });

  const handleHideForm = () => {
    if (type === 'provider') {
      setShowFormProvider(false)
    } else if (type === 'customer') {
      setShowFormCustomer(false)
    } else {
      setShowForm(false)
    }
  };

  const [isSelectedDestination, setIsSelectedDestination] = useState("")
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "destination") {
      setIsSelectedDestination(value)
    }
    setFormData({ ...formData, [name]: value });
    Validation(name, setLocalErrors, { ...formData, [name]: value });
  };

  const isValid = () => {
    if (idQuestion) {
      const { title, message } = localErrors
      const newLocalError = { title: title, message: message }
      return Object.values(newLocalError).every((error) => error === '');
    } else {
      return Object.values(localErrors).every((error) => error === '');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid()) {
      try {
        if (idQuestion) {
          const newFormData = { ...formData, idQuestion: idQuestion }
          await dispatch(putFAQs(newFormData))
          if (type === 'provider') {
            setShowFormProvider(false)
          } else if (type === 'customer') {
            setShowFormCustomer(false)
          } else {
            setShowForm(false)
          }
        } else {
          await dispatch(createFAQs(formData))
          if (type === 'provider') {
            setShowFormProvider(false)
          } else if (type === 'customer') {
            setShowFormCustomer(false)
          } else {
            setShowForm(false)
          }
        }
      } catch (error) {
        Swal.fire({
          title: 'Error al enviar la FAQ!',
          text: 'El envio no se envio correctame, intente nuevamente o comuniquese con los desarrolladores.',
          icon: 'warning',
        })
      }
    } else {
      Swal.fire({
        title: 'Formulario con errores!',
        text: 'Por favor complete el formulario correctamente antes de enviarlo',
        icon: 'warning',
      })
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <button type='button' className={styles.closeButton} onClick={() => handleHideForm()}></button>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.FormDivInputFlex}>
            {
              idQuestion
                ? <p className={styles.textTitle}>Editar una Pregunta Frecuente</p>
                : <p className={styles.textTitle}>Crear una Pregunta Frecuente</p>
            }
            {
              !idQuestion &&
              <div className={styles.FormDivInput}>
                {/* Destinatario */}
                <label htmlFor='title' className={styles.labels}>Destinatario:</label>
                <select
                  name="destination"
                  value={isSelectedDestination}
                  onChange={handleChange}
                  className={styles.inputSelect}
                >
                  <option value="" disabled>
                    Seleccione a quien va dirigido
                  </option>
                  <option value="provider">
                    Proveedor
                  </option>
                  <option value="customer">
                    Cliente
                  </option>
                </select>
                <div className={localErrors.destination ? styles.errorMessage : styles.errorNotMessage}>
                  {localErrors.destination ? localErrors.destination : "Datos Válidos"}
                </div>
              </div>
            }

            {/* question */}
            <div className={styles.FormDivInput}>
              <label htmlFor='title' className={styles.labels}>Ingresa una pregunta:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="¿Como registrarme?"
                className={styles.inputs}
              />
              <div className={localErrors.title ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.title ? localErrors.title : "Datos Válidos"}
              </div>
            </div>


            {/* answer */}
            <div className={styles.FormDivInput}>
              <label htmlFor='message' className={styles.labels}>Ingresa una respuesta:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mire el tutorial"
                className={styles.inputDetail}
              ></textarea>
              <div className={localErrors.message ? styles.errorMessage : styles.errorNotMessage}>
                {localErrors.message ? localErrors.message : "Datos Válidos"}
              </div>
            </div>

            <button type="submit" className={styles.buttonSave}>Guardar</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default FormFAQs;