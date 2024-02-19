import styles from './FormConsultReport.module.scss';
import { createReport } from '../../../redux/actions/index';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validation from './validationFormConsultReport';
import ReCAPTCHA from 'react-google-recaptcha';

const FormConsultReport = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [captchaValidated, setCaptchaValidated] = useState(null);
    const [formData, setFormData] = useState({
        typeOfQuestion: 'qaa',
        destination: 'administrator',
        fullName: '',
        senderMail: '',
        title: '',
        message: '',
    });

   const [errors, setErrors] = useState({
        fullName: '',
        senderMail: '',
        title: '',
        message: '',
    });

    const clearFormData = () => {
        setFormData({
            fullName: '',
            senderMail: '',
            title: '',
            message: '',
        });
    };

    const userLoggedInfo = useSelector(state => state.infoUserLog);

    const dispatch = useDispatch();

     // Autocompletar el campo senderMail y fullName con los datos del usuario logueado
     useEffect(() => {
        if (userLoggedInfo && userLoggedInfo.email) {
            setFormData(prevState => ({
                ...prevState,
                senderMail: userLoggedInfo.email,
                fullName: userLoggedInfo.fullName
            }));
        }
    }, [userLoggedInfo]);

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
        if (captcha.current.getValue()) { 
            setCaptchaValidated(true);
        }
    }

    const handleSumbit = (event) => {
        event.preventDefault();

        const newErrors = validation(formData);
        setErrors(newErrors);

        const isValid = Object.values(newErrors).every((error) => error === '');

        if (captcha.current.getValue()) {
            setCaptchaValidated(true);

            if (isValid) {
                dispatch(createReport(formData))
                    .then(() => {
                        setSuccessMessage('Reporte enviado con éxito');
                        clearFormData();
                    })
                    .catch(() => {
                        setSuccessMessage('Error al enviar el reporte');
                    });
            } else {
                setSuccessMessage('Datos con errores');
            }
        } else {
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
                    <label htmlFor="fullName">Nombre y Apellido:</label>
                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Ej: Fulanita de Tal"
                    />
                    <p className={styles.errorMessage}>{errors.fullName}</p>
                </div>

                {/* Correo electronico */}
                <div className={styles.FormDivInputFlex}>
                    <label htmlFor="senderMail">Email:</label>
                    <input
                        id="senderMail"
                        name="senderMail"
                        type="email"
                        value={formData.senderMail}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                    />
                    <p className={styles.errorMessage}>{errors.senderMail}</p>
                </div>

                {/* Título del reporte */}
                <div className={styles.FormDivInputFlex}>
                    <label htmlFor="title">Título del reporte</label>
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
                    <label htmlFor="report">Reporte</label>
                    <textarea
                        id="message"
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        cols="30"
                        rows="10"
                        placeholder="Escribe aqui brevemente tu reporte"
                    />
                    <p className={styles.errorMessage}>{errors.message}</p>
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
