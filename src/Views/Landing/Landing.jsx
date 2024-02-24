import styles from "./landing.module.scss";
import { useNavigate } from "react-router";
import Helpers from "../../Helpers/RoutesFront";
import StoreItem from "../../Helpers/LocalStorage";
import { useEffect, useState } from "react";
import SlideCustomer from "../../components/Slide/SlideCustomer";
import SlideProvider from "../../components/Slide/SlideProvider";

const Landing = () => {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [statistics, setStatistics] = useState({
    successfulConnections: "",
    services: "",
    customerCount: "",
    providerCount: "",
  });

  const navigate = useNavigate();
  const [userTutorial, setUserTutorial] = useState("customer");

  useEffect(() => {
    localStorage.removeItem(StoreItem.dataUserSignIn);
  }, []);

  const handleLocalStorage = (bool) => {
    localStorage.setItem("isProvider", JSON.stringify(bool));
    navigate(Helpers.AccessAccount);
  };

  const handleTutorialPressed = (user) => {
    setUserTutorial(user);
  };

  useEffect(() => {
    const fetchStatistics = async () => {
        const response = await fetch(`${REACT_APP_API_URL}/stats/landing`);
        const data = await response.json();
        console.log('Data recibida:', data);
        const successfulConnections = Number(data.successfulConnections.replace('%', ''));
        const formattedConnections = successfulConnections.toFixed(0) + '%';
        setStatistics({
          successfulConnections: formattedConnections,
          services: data.services,
          customerCount: data.customerCount,
          providerCount: data.providerCount,
        });
    };
    fetchStatistics();
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Seccion Introduccion */}
      <section className={styles.introSection}>
        <div className={styles.introWrapper}>
          <div className={styles.introText}>
            <p className={styles.textSubtitle}>Cuidados para adultos mayores</p>
            <p className={styles.textTitle}>
              "Amor en cada cuidado, conexiones que perduran"
            </p>
            <p className={styles.textParagraph}>
              Nuestra plataforma intuitiva te permite explorar perfiles
              detallados de cuidadores, leer reseñas auténticas y conectar con
              aquellos que se adaptan a las necesidades únicas de tu familia.
            </p>
            <div className={styles.buttonWrapper}>
              <button
                onClick={() => handleLocalStorage(false)}
              >
                Busco un cuidador
              </button>
              <button
                onClick={() => handleLocalStorage(true)}
              >
                Ofrecer mis servicios
              </button>
            </div>
          </div>
          <div className={styles.introQuote}>
            <div className={styles.quoteIcon}></div>
            <div className={styles.quoteBox}>
              <p className={styles.quote}>
              "Gracias a la plataforma, he podido expandir mi presencia en línea y conectar con clientes potenciales de todo el mundo. Su interfaz intuitiva y herramientas eficientes han sido clave en mi éxito."
              </p>
              <div className={styles.profileBox}>
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                  className={styles.profileImg}
                />
                <p className={styles.profileName}>
                  Claudia Beatriz Gonzales <span>(Cliente)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statistics}>
        <div className={styles.statsBox}>
          <div className={styles.iconExitos}></div>
          <p className={styles.statsTitle}>
            {statistics.successfulConnections}
          </p>
          <p className={styles.statsDescription}>Conexiones Exitosas</p>
        </div>
        <div className={styles.statsBox}>
          <div className={styles.iconServicios}></div>
          <p className={styles.statsTitle}>{statistics.services}</p>
          <p className={styles.statsDescription}>Servicios</p>
        </div>
        <div className={styles.statsBox}>
          <div className={styles.iconFamilias}></div>
          <p className={styles.statsTitle}>{statistics.customerCount}</p>
          <p className={styles.statsDescription}>Familias</p>
        </div>
        <div className={styles.statsBox}>
          <div className={styles.iconProveedores}></div>
          <p className={styles.statsTitle}>{statistics.providerCount}</p>
          <p className={styles.statsDescription}>Proveedores</p>
        </div>
      </section>

      {/* ¿Cómo funciona? */}
      <section id="tutorial" className={styles.tutorial}>
        <div className={styles.tutorialQuestion}>
          <p className={styles.tutorialTitle}>¿Cómo funciona?</p>
          <div className={styles.tutorialBtns}>
            <button
              className={
                userTutorial === "customer"
                  ? styles.tutorialBtnPressed
                  : styles.tutorialBtn
              }
              onClick={() => {
                handleTutorialPressed("customer");
              }}
            >
              Como Cliente
            </button>
            <button
              className={
                userTutorial === "provider"
                  ? styles.tutorialBtnPressed
                  : styles.tutorialBtn
              }
              onClick={() => {
                handleTutorialPressed("provider");
              }}
            >
              Como Proveedor
            </button>
          </div>
        </div>
        {userTutorial === "customer" ? (
          <SlideCustomer></SlideCustomer>
        ) : (
          <SlideProvider></SlideProvider>
        )}
      </section>

      {/* ¿Cómo te gustaría registrarte? */}
      <section className={styles.sectionregistro}>
        <div className={styles.registroBox}>
          <p className={styles.registroTitle}>¿Cómo te gustaría registrarte?</p>
          <div className={styles.registroBtn}>
            <button
              className={styles.Btn}
              onClick={() => {
                handleLocalStorage(false);
              }}
            >
              Cliente
            </button>
            <button
              className={styles.Btn}
              onClick={() => {
                handleLocalStorage(true);
              }}
            >
              Proveedor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
