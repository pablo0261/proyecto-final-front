import styles from './footer.module.css';
import sql from '../../assets/image/postgresql.png'
import ex from '../../assets/image/expres.png'
import react from '../../assets/image/react.png'
import js from '../../assets/image/js.png'

const Footer = () => {
    return (
        <footer className={styles.footer__container}>

            <div className={styles.footer__container__menu}>
                <ul>
                    <li>
                        <a className={styles.a} href="#">Ayuda</a>
                    </li>
                    <li>
                        <a className={styles.a} href="#">Frequently Asked Questions</a>
                    </li>
                    <li>
                        <a className={styles.a} href="#">Consulta/Reporte</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className={styles.a} href="#">Front-End Developer</a>
                    </li>
                    <li>
                        <a className={styles.a} href="#">Linkedin - Role</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className={styles.a} href="#">Back-End Developer</a>
                    </li>
                    <li>
                        <a className={styles.a} href="#">Linkedin - Role</a>
                    </li>
                </ul>
            </div>

            <div className={styles.footer__container__tecnologias}>
                <h3>Tecnologías</h3>
                <div>
                    <img src={sql} alt="sql" />
                    <img src={ex} alt="ex" />
                    <img src={react} alt="react"/>
                    <img src={js} alt="js" />
                </div>
            </div>

        </footer>
    );
};

export default Footer;