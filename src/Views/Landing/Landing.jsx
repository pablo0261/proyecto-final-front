import styles from './landing.module.scss';
import { useNavigate } from 'react-router';
import Helpers from '../../Helpers/RoutesFront';
/* import Statistics from '../../components/Statistics/Statistics'; */
import StoreItem from '../../Helpers/LocalStorage';
import Slide from '../../components/Slide/Slide'
import { useEffect } from 'react';

const Landing = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem(StoreItem.dataUserSignIn)
    }, [])

    const handleLocalStorage = (bool) => {
        localStorage.setItem('isProvider', JSON.stringify(bool));
        navigate(Helpers.AccessAccount);
    };

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
            <section className={styles.header}>
                <div>
                    <p>¿Cómo funciona?</p>
                </div>
            </section>
            <div className={styles.slide}>
                <Slide></Slide>
            </div>

            {/* ¿Cómo te gustaría registrarte? */}
            <section className={styles.sectionregistro}>
                <header>
                    <p className={styles.sectionregistro__title}>¿Cómo te gustaría registrarte?</p>
                </header>
                <article className={styles.sectionregistro__button}>
                    <button onClick={() => { handleLocalStorage(false) }}>Cliente</button>
                    <button onClick={() => { handleLocalStorage(true) }}>Proveedor</button>
                </article>

            </section>
        </div>
    );
};

export default Landing;