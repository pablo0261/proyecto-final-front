import styles from './landing.module.css';
import logo from '../../assets/image/logo.svg';
import quote from '../../assets/image/quote-left.png';

const Landing = () => {

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
                            <button className={styles.button}>Busco un cuidador</button>
                            <button className={styles.button}>Ofrecer mis servicios</button>
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
                <section>
                    <div>
                        <h2>¿Cómo funciona?</h2>
                    </div>
                    <div>
                        <a href="#">Registrate</a>
                        <i>1</i>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
                    </div>
                    <div>
                        <iframe src="https://giphy.com/embed/QxRc8rXFB7jmHqvcNq" width="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    </div>
                </section>

                {/* ¿Cómo te gustaría registrarte? */}
                <section>
                    <h2>¿Cómo te gustaría registrarte?</h2>
                    <button>Cliente</button>
                    <button>Proveedor</button>
                </section>

            </main>

            <footer>

                <div>
                    <ul>
                        <li>
                            <a href="#">Ayuda</a>
                        </li>
                        <li>
                            <a href="#">Frequently Asked Questions</a>
                        </li>
                        <li>
                            <a href="#">Consulta/Reporte</a>
                        </li>
                        <li>
                            <a href="#">Front-End Developer</a>
                        </li>
                        <li>
                            <a href="#">Back-End Developer</a>
                        </li>
                        <li>
                            <a href="#">Linkedin - Role</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Tecnologías</h3>
                </div>

            </footer>
        </>
    );
};

export default Landing;