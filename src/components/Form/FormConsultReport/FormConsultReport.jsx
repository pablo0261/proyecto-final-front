import styles from './FormConsultReport.module.scss';
import { createReport } from '../../../redux/actions/index';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import validation from './validationFormConsultReport';
import ReCAPTCHA from 'react-google-recaptcha';


const FormConsultReport = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [captchaValidated, setCaptchaValidated] = useState(null);
    const [userValidated, setUserValidated] = useState(false);

    const [formData, setFormData] = useState({
        fullname: '',
        mail: '',
        title: '',
        report: '',
    });

    const [errors, setErrors] = useState({
        fullname: '',
        mail: '',
        title: '',
        report: '',
    });

    const clearFormData = () => {
        setFormData({
            fullname: '',
            mail: '',
            title: '',
            report: '',
        });
    };

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Validar el campo actual al cambiar su valor
        const newErrors = validation({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: newErrors[name] });
    };

    /* captcha */
    const captcha = useRef(null);

    const onChange = () => {
        if (captcha.current.getValue()) { //obtener el valor del catpcha
            setCaptchaValidated(true);
        }
    }

    const handleSumbit = (event) => {
        event.preventDefault();

        const newErrors = validation(formData);
        setErrors(newErrors);

        const isValid = Object.values(newErrors).every((error) => error === '');

        if (captcha.current.getValue()) {
            setUserValidated(true);
            setCaptchaValidated(true);

            if (isValid) {
                dispatch(createReport(formData));
                setSuccessMessage('Reporte enviado con éxito');
                clearFormData();
            } else {
                setSuccessMessage('Datos con errores');
            } 

        } else {
            setUserValidated(false);
            setCaptchaValidated(false);
        }

    };



    return (

        <div className={styles.wrapper}>

            <form className={styles.Form} onSubmit={handleSumbit} action="">
                <div className={styles.container__button}>
                </div>

                {/* Nombre y apellido */}
                <div className={styles.FormDivInputFlex}>
                    <label htmlFor="">Nombre y Apellido:</label>
                    <input
                        id="fullname"
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Ej: Fulanita de Tal"
                    />
                    <p className={styles.errorMessage}>{errors.fullname}</p>
                </div>

                {/* Correo electronico */}
                <div className={styles.FormDivInputFlex}>
                    <label htmlFor="">Email:</label>
                    <input
                        id="mail"
                        name="mail"
                        type="email"
                        value={formData.mail}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                    />
                    <p className={styles.errorMessage}>{errors.mail}</p>
                </div>

                {/* Título del reporte */}
                <div className={styles.FormDivInputFlex}>
                    <label htmlFor="">Título del reporte</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Escribe aqui el título del reporte"
                    />
                    <p className={styles.errorMessage}>{errors.title}</p>
                </div>

                {/* Reporte */}
                <div className={styles.FormDivInputFlex}>
                    <label htmlFor="">Reporte</label>
                    <textarea
                        id="report"
                        type="text"
                        name="report"
                        value={formData.report}
                        onChange={handleChange}
                        cols="30"
                        rows="10"
                        placeholder="Escribe aqui brevemente tu reporte"
                    />
                    <p className={styles.errorMessage}>{errors.report}</p>
                </div>

                {/* Captcha */}
                <div className={styles.container__recaptcha}>
                    <ReCAPTCHA
                        ref={captcha}
                        sitekey="6Ld0tWopAAAAAJK1SxagdYCtU-QtEp6UOmKICK_E"
                        onChange={onChange}
                    />
                </div>

               { captchaValidated === false && <div className={styles.errorMessage}>Verifica el captcha</div>}

                {/* Boton de envio */}
                <button type="submit" className={styles.buttonSubmit}>
                    Enviar reporte
                </button>
            </form>

            {successMessage && <p>{successMessage}</p>}
        </div>

    );
};

export default FormConsultReport;