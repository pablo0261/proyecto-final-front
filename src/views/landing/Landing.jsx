import styles from './landing.module.css';
import logo from '../../assets/image/logo.svg';
import nono from '../../assets/image/nono.gif';
import quote from '../../assets/image/quote-left.png';
import { useNavigate } from 'react-router';
import Helpers from '../../Helpers/RoutesFront';
import Footer from '../../components/Footer/Footer';
import StoreItem from '../../Helpers/LocalStorage';

const Landing = () => {

    const navigate = useNavigate()

    const handleLocalStorage = (bool) => {
        JSON.stringify(localStorage.setItem(StoreItem.isProvider, bool))
        navigate(Helpers.AccessAccount)
    }

    return (
        <>
            <header className={styles.header}>
                {/* Barra de navegacion */}
                <nav className={styles.nav}>
                    <div className={styles.nav__container}>
                        <img className={styles.nav__logo} src={logo} alt="Logo" />
                        <a className={styles.nav__link} href="#">¿Como funciona?</a>
                    </div>
                </nav>
            </header>

            <main className={styles.main}>

                {/* Seccion Hero */}
                <section className={styles.hero__container}>
                    <div className={styles.hero__text}>
                        <h2 className={styles.hero__text__subtitle}>Cuidados para adultos mayores</h2>
                        <h1 className={styles.hero__text__title}>"Amor en cada cuidado, <br />conexiones que perduran"</h1>
                        <p className={styles.hero__text__paragraph}>Nuestra plataforma intuitiva te permite explorar perfiles detallados de cuidadores, leer reseñas auténticas y conectar con aquellos que se adaptan a las necesidades únicas de tu familia.</p>
                        <div className={styles.hero__container__button}>
                            <button className={styles.button} onClick={() => handleLocalStorage(false)}>Busco un cuidador</button>
                            <button className={styles.button} onClick={() => handleLocalStorage(true)}>Ofrecer mis servicios</button>
                        </div>
                    </div >
                    <div className={styles.hero__quote}>
                        <blockquote>
                            <img src={quote} alt="" />
                            <p>Officia quaerat itaque, obcaecati ipsam aperiam magni molestiae quisquam ad voluptatem sapiente doloremque id soluta suscipit veniam? Eligendi, esse. Aperiam, doloremque ad!</p>
                            <cite className={styles.hero__quotecite}>Fulanita de Tal - Cliente</cite>
                        </blockquote>
                    </div>
                </section>

                {/* ¿Cómo funciona? */}
                <section className={styles.section}>

                    <div className={`${styles.section__row} ${styles.section__row1}`}>
                        <h2 className={styles.section__title}>¿Cómo funciona?</h2>
                    </div>

                    <div className={`${styles.section__row} ${styles.section__row2}`}>

                        <div className={`${styles.section__column} ${styles.section__column1}`}>
                            <i className={styles.section__icon}>1</i>
                        </div>

                        <div className={`${styles.section__column} ${styles.section__column2}`}>
                            <a className={styles.section__link} href="#">Registrate</a>
                            <p className={styles.section__paragraph}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
                        </div>

                        <div className={`${styles.section__column} ${styles.section__column3}`}>
                            <img className={styles.section__iframe} src={nono} alt="" />
                        </div>

                    </div>

                </section>

                {/* ¿Cómo te gustaría registrarte? */}
                <section className={styles.sectionregistro}>
                    <header>
                        <h2 className={styles.sectionregistro__title}>¿Cómo te gustaría registrarte?</h2>
                    </header>
                    <article className={styles.sectionregistro__article}>
                        <button className={styles.sectionregistro__button}>Cliente</button>
                        <button className={styles.sectionregistro__button}>Proveedor</button>
                    </article>

                </section>

            </main>
            <Footer></Footer>

        </>
    );
};

export default Landing;