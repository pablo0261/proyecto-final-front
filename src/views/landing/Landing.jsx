import styles from "./landing.module.scss";
import quote from "../../assets/LandingImages/quote-left.png";
import { useNavigate } from "react-router";
import Helpers from "../../Helpers/RoutesFront";
import Statistics from "../../components/Statistics/Statistics";
import StoreItem from "../../Helpers/LocalStorage";

const Landing = () => {
  const navigate = useNavigate();

  const handleLocalStorage = (bool) => {
    localStorage.setItem("isProvider", JSON.stringify(bool));
    navigate(Helpers.AccessAccount);
  };

  return (
    <>
      <main className={styles.main}>
        {/* Seccion Hero */}
        <section className={styles.hero__container}>
          <div className={styles.hero__text}>
            <h2>Cuidados para adultos mayores</h2>
            <h1>
              "Amor en cada cuidado, <br/>
              conexiones que perduran"
            </h1>
            <p>
              Nuestra plataforma intuitiva te permite explorar perfiles
              detallados de cuidadores, leer reseñas auténticas y conectar con
              aquellos que se adaptan a las necesidades únicas de tu familia.
            </p>
            <div className={styles.hero__container__button}>
              <button
                className={styles.button}
                onClick={() => handleLocalStorage(false)}
                style={{ cursor: "pointer" }}
              >
                Busco un cuidador
              </button>
              <button
                onClick={() => handleLocalStorage(true)}
                style={{ cursor: "pointer" }}
              >
                Ofrecer mis servicios
              </button>
            </div>
          </div>
          <div className={styles.hero__quote}>
            <div>
              <img src={quote} alt="" />
            </div>
            <blockquote>
              <cite>
                Encontré rápidamente el servicio perfecto para el cuidado de mi
                ser querido, destacando por su excepcionalidad en todos los
                aspectos. ¡Altamente recomendado!
              </cite>
              <cite>
                <div className={styles.photo}></div>
                <p>Laura MIgues - Cliente</p>
              </cite>
            </blockquote>
          </div>
        </section>

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
        <section className={styles.section}>
          {/* row 1 */}
          <div className={styles.section__row}>
            <div>
              <i>1</i>
            </div>
            <div>
              <h2>Registrate</h2>
              <p>
                Ingresa como proveedor o cliente, y crea tu usuario para
                descubrir todas las posibilidades de la plataforma. ¡Es rápido y
                sin costo!
              </p>
            </div>
            <iframe className={styles.iframe}></iframe>
          </div>
        </section>
        {/* fin evento scroll */}

        {/* ¿Cómo te gustaría registrarte? */}
        <section className={styles.sectionregistro}>
          <header>
            <h2 className={styles.sectionregistro__title}>
              ¿Cómo te gustaría registrarte?
            </h2>
          </header>
          <article className={styles.sectionregistro__button}>
            <button
              onClick={() => {
                handleLocalStorage(false);
              }}
              style={{ cursor: "pointer" }}
            >
              Cliente
            </button>
            <button
              onClick={() => {
                handleLocalStorage(true);
              }}
              style={{ cursor: "pointer" }}
            >
              Proveedor
            </button>
          </article>
        </section>
      </main>
    </>
  );
};

export default Landing;
