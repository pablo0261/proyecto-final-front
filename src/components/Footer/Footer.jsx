import styles from './footer.module.css';

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
            </div>

        </footer>
    );
};

export default Footer;