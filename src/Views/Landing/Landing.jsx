import styles from './landing.module.scss';
import { useNavigate } from 'react-router';
import Helpers from '../../Helpers/RoutesFront';
/* import Statistics from '../../components/Statistics/Statistics'; */
import StoreItem from '../../Helpers/LocalStorage';
import { useEffect, useState } from 'react';
import SlideCustomer from '../../components/Slide/SlideCustomer';
import SlideProvider from '../../components/Slide/SlideProvider';

const Landing = () => {

    const navigate = useNavigate();
    const [userTutorial, setUserTutorial] = useState("customer")

    useEffect(() => {
        localStorage.removeItem(StoreItem.dataUserSignIn)
    }, [])

    const handleLocalStorage = (bool) => {
        localStorage.setItem('isProvider', JSON.stringify(bool));
        navigate(Helpers.AccessAccount);
    };

    const handleTutorialPressed = (user) => {
        setUserTutorial(user)
    }

    return (
        <div className={styles.wrapper}>
            {/* Seccion Introduccion */}
            <section className={styles.introSection}>
                <div className={styles.introWrapper}>
                    <div className={styles.introText}>
                        <p className={styles.textSubtitle}>Cuidados para adultos mayores</p>
                        <p className={styles.textTitle}>"Amor en cada cuidado, conexiones que perduran"</p>
                        <p className={styles.textParagraph}>Nuestra plataforma intuitiva te permite explorar perfiles detallados de cuidadores, leer reseñas auténticas y conectar con aquellos que se adaptan a las necesidades únicas de tu familia.</p>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.buttonLogIn} onClick={() => handleLocalStorage(false)}>Busco un cuidador</button>
                            <button className={styles.buttonLogIn} onClick={() => handleLocalStorage(true)}>Ofrecer mis servicios</button>
                        </div>
                    </div >
                    <div className={styles.introQuote}>
                        <div className={styles.quoteIcon}></div>
                        <div className={styles.quoteBox}>
                            <p className={styles.quote}>"El servicio del proveedor fue excelente, especialmente porque personalizan la atención para satisfacer las necesidades individuales de cada cliente. Recomiendo mucho la página."</p>
                            <div className={styles.profileBox}>
                                <img src="https://res.cloudinary.com/dn3kedyer/image/upload/v1707141615/image/g08drlndxzjhmpbtxbdw.png" alt="" className={styles.profileImg} />
                                <p className={styles.profileName}>Claudia Beatriz Gonzales <span>(Cliente)</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seccion Statistics */}
            <section className={styles.statistics}>
                {/* <Statistics></Statistics> */}
                <div className={styles.statsBox}>
                    <div className={styles.iconExitos}></div>
                    <p className={styles.statsTitle}>%89</p>
                    <p className={styles.statsDescription}>Conexiones Exitosas</p>
                </div>
                <div className={styles.statsBox}>
                    <div className={styles.iconServicios}></div>
                    <p className={styles.statsTitle}>25</p>
                    <p className={styles.statsDescription}>Servicios Cubiertos</p>
                </div>
                <div className={styles.statsBox}>
                    <div className={styles.iconFamilias}></div>
                    <p className={styles.statsTitle}>250</p>
                    <p className={styles.statsDescription}>Familias Registradas</p>
                </div>
                <div className={styles.statsBox}>
                    <div className={styles.iconProveedores}></div>
                    <p className={styles.statsTitle}>134</p>
                    <p className={styles.statsDescription}>Proveedores Registrados</p>
                </div>
            </section>

            {/* ¿Cómo funciona? */}
            <section id='tutorial' className={styles.tutorial}>
                <div className={styles.tutorialQuestion}>
                    <p className={styles.tutorialTitle}>¿Cómo funciona?</p>
                    <div className={styles.tutorialBtns}>
                        <button className={userTutorial === "customer" ? styles.tutorialBtnPressed : styles.tutorialBtn} onClick={() => { handleTutorialPressed("customer") }}>Como Cliente</button>
                        <button className={userTutorial === "provider" ? styles.tutorialBtnPressed : styles.tutorialBtn} onClick={() => { handleTutorialPressed("provider") }}>Como Proveedor</button>
                    </div>
                </div>
                {
                    userTutorial === "customer"
                        ? <SlideCustomer></SlideCustomer>
                        : <SlideProvider></SlideProvider>
                }

            </section>

            {/* ¿Cómo te gustaría registrarte? */}
            <section className={styles.sectionregistro}>
                <div className={styles.registroBox}>
                    <p className={styles.registroTitle}>¿Cómo te gustaría registrarte?</p>
                    <div className={styles.registroBtn}>
                        <button className={styles.Btn} onClick={() => { handleLocalStorage(false) }}>Cliente</button>
                        <button className={styles.Btn} onClick={() => { handleLocalStorage(true) }}>Proveedor</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;