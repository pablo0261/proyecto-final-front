import React, { useState } from 'react'
import style from './FormContract.module.sass'
import ValidationContract from './ValidationContract';
import axios from 'axios';
import Swal from 'sweetalert2'

function FormContract(props) {

  const { contractForm, setContractForm, setShowContract } = props
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

  const [errors, setErrors] = useState({
    dateOfService: "*Campo Obligatorio",
    timeOfService: "*Campo Obligatorio",
    durationOfService: "*Campo Obligatorio"
  })

  const handleCloseContract = () => {
    setShowContract(false)
  }

  const handleChangeContract = (event) => {
    const property = event.target.name
    const value = event.target.value

    setContractForm({ ...contractForm, [property]: value })
    ValidationContract(property, errors, setErrors, { ...contractForm, [property]: value })
  }

  const handleSubmitContract = async (event) => {
    event.preventDefault()

    if (Object.values(errors).every((error) => error === "")) {
      try {
        const response = await axios.put(`${REACT_APP_API_URL}/opportunities`, contractForm)
        if (response.status === 200) {
          Swal.fire({
            title: 'Solicitud enviada al Proveedor!',
            text: `Para contactarlo dirigete a "Tus Conexiones"`,
            icon: 'success',
          })
          setShowContract(false)
        }
      } catch (error) {
        Swal.fire({
          title: 'Intentalo Nuevamente!',
          text: `${error}`,
          icon: 'error',
        })
      }
    } else {
      Swal.fire({
        title: 'Complete su solicitud correctamente',
        text: `Complete todos los campos del formulario`,
        icon: 'error',
      })
    }

  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <button
          type="button"
          className={style.closeButton}
          onClick={() => handleCloseContract()}
        ></button>
        <p className={style.textTitle}>Solicitud del Contrato</p>
        <form onSubmit={handleSubmitContract} className={style.Form}>
          <div className={style.FormDivInput}>
            <label className={style.labels}>Fecha de inicio del servicio:</label>
            <input
              className={style.inputs}
              type="date"
              name="dateOfService"
              value={contractForm.date}
              onChange={handleChangeContract}
              min={today}
            ></input>
            <p className={errors.dateOfService ? style.errorMessage : style.errorNotMessage}>{errors.dateOfService ? errors.dateOfService : "Datos Válidos"}</p>
          </div>
          <div className={style.FormDivInput}>
            <label className={style.labels}>Hora del servicio:</label>
            <select
              className={style.inputs}
              name="timeOfService"
              value={contractForm.timeOfService}
              onChange={handleChangeContract}
            >
              {[...Array(24).keys()].map(hour => (
                <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>{hour.toString().padStart(2, '0')}:00</option>
              ))}
            </select>
            <p className={errors.timeOfService ? style.errorMessage : style.errorNotMessage}>{errors.timeOfService ? errors.timeOfService : "Datos Válidos"}</p>
          </div>
          <div className={style.FormDivInput}>
            <label className={style.labels}>Total de horas requeridas:</label>
            <input
              className={style.inputs}
              type="number"
              name="durationOfService"
              value={contractForm.durationOfService}
              onChange={handleChangeContract}
              placeholder="Ej: 8"
            ></input>
            <p className={errors.durationOfService ? style.errorMessage : style.errorNotMessage}>{errors.durationOfService ? errors.durationOfService : "Datos Válidos"}</p>
          </div>
          <button className={style.buttonSave} type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default FormContract