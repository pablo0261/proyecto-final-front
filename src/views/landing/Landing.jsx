import styles from './landing.module.scss';
import quote from '../../assets/LandingImages/quote-left.png';
import { useNavigate } from 'react-router';
import Helpers from '../../Helpers/RoutesFront';
import Statistics from '../../components/Statistics/Statistics';
import StoreItem from '../../Helpers/LocalStorage';

import Slide from '../../components/Slide/Slide'

const Landing = () => {
    
    const navigate = useNavigate();

    const handleLocalStorage = (bool) => {
        localStorage.setItem('isProvider', JSON.stringify(bool));
        navigate(Helpers.AccessAccount);
    };




    return (
        <>

            <main className={styles.main}>

                {/* Seccion Hero */}
                <section className={styles.hero__container}>
                    <div className={styles.hero__text}>
                        <h2>Cuidados para adultos mayores</h2>
                        <h1>"Amor en cada cuidado, <br />conexiones que perduran"</h1>
                        <p>Nuestra plataforma intuitiva te permite explorar perfiles detallados de cuidadores, leer reseñas auténticas y conectar con aquellos que se adaptan a las necesidades únicas de tu familia.</p>
                        <div className={styles.hero__container__button}>
                            <button className={styles.button} onClick={() => handleLocalStorage(false)}>Busco un cuidador</button>
                            <button onClick={() => handleLocalStorage(true)}>Ofrecer mis servicios</button>
                        </div>
                    </div >
                    <div className={styles.hero__quote}>
                        <div>
                            <img src={quote} alt="" />

                        </div>
                        <blockquote>
                            <cite>Officia quaerat itaque, obcaecati ipsam aperiam magni molestiae quisquam ad voluptatem sapiente doloremque Eligendi Aperiam, doloremque ad!</cite>
                            <cite>
                                <div className={styles.photo}></div>
                                <p>Fulanita de Tal - Cliente</p>
                            </cite>

                        </blockquote>
                    </div>
                </section>

                {/* Seccion Statistics */}
                <article className={styles.statistics}>
                    <Statistics></Statistics>
                </article>

                {/* ¿Cómo funciona? */}
                <section className={styles.header}>
                    <div>
                        <h2>¿Cómo funciona?</h2>
                    </div>
                </section>


                <div className={styles.slide}>
                    <Slide></Slide>
                </div>

             


                {/* ¿Cómo te gustaría registrarte? */}
                <section className={styles.sectionregistro}>
                    <header>
                        <h2 className={styles.sectionregistro__title}>¿Cómo te gustaría registrarte?</h2>
                    </header>
                    <article className={styles.sectionregistro__button}>
                        <button onClick={() => { handleLocalStorage(false) }}>Cliente</button>
                        <button onClick={() => { handleLocalStorage(true) }}>Proveedor</button>
                    </article>

                </section>

            </main>




        </>
    );
};

export default Landing;