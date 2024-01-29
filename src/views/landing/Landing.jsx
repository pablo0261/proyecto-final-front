import styles from './landing.module.scss';
import quote from '../../assets/LandingImages/quote-left.png';
import { useNavigate } from 'react-router';
import Helpers from '../../Helpers/RoutesFront';
import Statistics from '../../components/Statistics/Statistics';
import StoreItem from '../../Helpers/LocalStorage';

import React, { useEffect, useState } from 'react';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import gsap from 'gsap'; // Importar GSAP

const Landing = () => {
    const [visibleSection, setVisibleSection] = useState('row1');
    const navigate = useNavigate();

    const handleLocalStorage = (bool) => {
        localStorage.setItem('isProvider', JSON.stringify(bool));
        navigate(Helpers.AccessAccount);
    };

    useEffect(() => {
        // Actualizar el scrollSpy
        scrollSpy.update();

        // Manejar el evento de scroll
        const handleScroll = () => {
            const scrollPosition = window.scrollY;


            if (scrollPosition > 400 && scrollPosition < 900) {
                setVisibleSection('row1');
            } else if (scrollPosition >= 900 && scrollPosition < 1400) {
                setVisibleSection('row2');
            } else {
                setVisibleSection('row3');
            }

        };

        // Escuchar el evento de scroll
        window.addEventListener('scroll', handleScroll);

        // Limpiar eventos al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Animar la entrada y salida de las secciones con GSAP
        const tl = gsap.timeline();

        if (visibleSection === 'row1') {
            tl.to('.row2, .row3', { opacity: 0, duration: 0.5 }).to('.row1', { opacity: 1, duration: 0.5 });
        } else if (visibleSection === 'row2') {
            tl.to(' .row3', { opacity: 0, duration: 0.5 }).to('.row2', { opacity: 1, duration: 0.5 });
        } else {
            tl.to(' .row3', { opacity: 1, duration: 0.5 });
        }
    }, [visibleSection]);


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


                {/* evento scroll 1*/}
                <Element name="row1" className={`${styles.section} row1`}>
                    <section className={`${styles.__row} row1`}>
                        {/* row 1 */}
                        <div className={styles.section__row}>
                            <div>
                                <i>1</i>
                            </div>
                            <div>
                                <h2>Registrate</h2>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
                            </div>
                            <iframe className={styles.iframe}></iframe>
                        </div>
                    </section>
                </Element>

                {/* evento scroll 2*/}
                <Element name="row2" className={`${styles.section} row2`}>
                    <section className={`${styles.__row} row2`}>
                        {/* row 1 */}
                        <div className={styles.section__row}>
                            <div>
                                <i>2</i>
                            </div>
                            <div>
                                <h2>Registrate</h2>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
                            </div>
                            <iframe className={styles.iframe}></iframe>
                        </div>
                    </section>
                </Element>

                {/* evento scroll 3*/}
                <Element name="row3" className={`${styles.section} row3`}>
                    <section className={`${styles.__row} row3`}>
                        {/* row 1 */}
                        <div className={styles.section__row}>
                            <div>
                                <i>3</i>
                            </div>
                            <div>
                                <h2>Registrate</h2>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
                            </div>
                            <iframe className={styles.iframe}></iframe>
                        </div>
                    </section>
                </Element>


                {/* fin evento scroll */}
                {/* fin sectionpasosregistro */}


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