import styles from './footer.module.scss';
import react from '../../assets/Icons/react.png'
import redux from '../../assets/Icons/redux.png'
import sql from '../../assets/Icons/postgresql.png'
import ex from '../../assets/Icons/expres.png'
import js from '../../assets/Icons/js.png'
import Helpers from '../../Helpers/RoutesFront';

const Footer = () => {
    return (
        <footer className={styles.footer__container}>

            <div className={styles.footer__container__menu}>
                <ul>
                    <li>
                        <a className={styles.a} href={Helpers.Assistance}>Ayuda</a>
                    </li>
                    <li>
                        <a className={styles.a} href={Helpers.FAQs}>Frequently Asked Questions</a>
                    </li>
                    <li>
                        <a className={styles.a} href={Helpers.ConsultReport}>Consulta/Reporte</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>Front-End Developer</p>
                    </li>
                    <li>
                        <a href="#" target="_blank" rel="noopener noreferrer">Alejo Funes Abdala</a>
                    </li>
                    <li>
                        <a href="#" target="_blank" rel="noopener noreferrer">Leandro Herrera</a>
                    </li>
                    <li>
                        <a href="#" target="_blank" rel="noopener noreferrer">Pablo Ariel Besler</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/josericardolopezsierra/" target="_blank" rel="noopener noreferrer">Ricardo López</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>Back-End Developer</p>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/diego-lepore/" target="_blank" rel="noopener noreferrer">Diego Lepore</a>
                    </li>
                    <li>
                        <a href="#" target="_blank" rel="noopener noreferrer">Emmanuel Martinez</a>
                    </li>
                    <li>
                        <a href="#" target="_blank" rel="noopener noreferrer">Freydder Cardenas</a>
                    </li>
                    <li>
                        <a href="#" target="_blank" rel="noopener noreferrer">Tiago Souza</a>
                    </li>
                </ul>
                <ul>

                    <div className={styles.footer__container__tecnologias}>
                        <p>Tecnologías</p>
                        <div>
                            <img src={react} alt="react" />
                            <img src={redux} alt="redux" />
                            <img src={sql} alt="sql" />
                            <img src={ex} alt="ex" />
                            <img src={js} alt="js" />
                        </div>
                    </div>

                </ul>
            </div>

        </footer>
    );
};

export default Footer;