import React, { useState } from 'react';
import styles from './SlideCustomer.module.scss';
import { useInView } from 'react-intersection-observer';

const SlideCustomer = () => {

  const [isVideoExpanded, setIsVideoExpanded] = useState(null);

  // Función para alternar el tamaño del video
  const toggleVideoSize = (index) => {
    setIsVideoExpanded(prevIndex => prevIndex === index ? null : index);
  };
  // Establecer la clase CSS para el video según el estado de expansión
  const videoClassName = isVideoExpanded ? styles.videoExpanded : styles.videoNormal;

  const { ref: step1, inView: step1Visible } = useInView();
  const { ref: step2, inView: step2Visible } = useInView();
  const { ref: step3, inView: step3Visible } = useInView();
  const { ref: step4, inView: step4Visible } = useInView();
  const { ref: step5, inView: step5Visible } = useInView();
  const { ref: step6, inView: step6Visible } = useInView();

  return (
    <div className={styles.container}>

      <section className={`${styles.section} ${step1Visible ? styles.sectionVisible : styles.sectionInVisible}`}>

        <div className={styles.numberStep}>1</div>
        <div className={styles.textBox}>
          <p className={styles.textTitle}>Registrate</p>
          <p className={styles.textStep}>Selecciona la opción "Busco un Cuidador" y accederás a la vista del acceso a tu cuenta.
            Por ser tu primera vez deberas ir al boton "Registrarse" y llenar el formulario con tus datos personales.</p>
        </div>
        <div className={styles.imgTutorial}>
          <video width="500" autoPlay loop muted
            onClick={() => toggleVideoSize(1)}
            className={isVideoExpanded === 1 ? styles.videoExpanded : styles.videoNormal}
          >
            <source src='https://res.cloudinary.com/dn3kedyer/video/upload/v1708651809/client-01.mp4' type="video/mp4" />
          </video>
        </div>
        <div ref={step1} className={styles.pivot}></div>
      </section>

      <section className={`${styles.section} ${step2Visible ? styles.sectionVisible : styles.sectionInVisible}`}>
        <div className={styles.numberStep}>2</div>
        <div className={styles.textBox}>
          <p className={styles.textTitle}>Completa tu Perfil</p>
          <p className={styles.textStep}>Selecciona la pestaña de "Mi Perfil" y completa todos tus datos personales para
            poder verificar tu cuenta. Esto ayuda a que nuestros cuidadores conozcan mas a sus clientes.</p>
        </div>
        <div className={styles.imgTutorial}>
          <video width="500" autoPlay loop muted
            onClick={() => toggleVideoSize(2)}
            className={isVideoExpanded === 2 ? styles.videoExpanded : styles.videoNormal}
          >
            <source src='https://res.cloudinary.com/dn3kedyer/video/upload/v1708653984/client-02.mp4' type="video/mp4" />
          </video>
        </div>
        <div ref={step2} className={styles.pivot}></div>
      </section>

      <section className={`${styles.section} ${step3Visible ? styles.sectionVisible : styles.sectionInVisible}`}>
        <div className={styles.numberStep}>3</div>
        <div className={styles.textBox}>
          <p className={styles.textTitle}>Explora Cuidadores</p>
          <p className={styles.textStep}>Selecciona la pestaña "Ver Proveedores" y explora la lista de cuidadores en tu zona.
            Elige el cuidador que se adecue a tus necesidades e investiga su perfil.</p>
        </div>
        <div className={styles.imgTutorial}>
          <video width="500" autoPlay loop muted
            onClick={() => toggleVideoSize(3)}
            className={isVideoExpanded === 3 ? styles.videoExpanded : styles.videoNormal}
          >
            <source src='https://res.cloudinary.com/dn3kedyer/video/upload/v1708653993/client-03.mp4' type="video/mp4" />
          </video>
        </div>
        <div ref={step3} className={styles.pivot}></div>
      </section>

      <section className={`${styles.section} ${step4Visible ? styles.sectionVisible : styles.sectionInVisible}`}>
        <div className={styles.numberStep}>4</div>
        <div className={styles.textBox}>
          <p className={styles.textTitle}>Contrata un Cuidador</p>
          <p className={styles.textStep}>Una vez que hayas elegido a tu Cuidador, selecciona el servicio que quieras contratar, rellena
            el formulario de peticion y se creará una "Oportunidad" en estado "Pendiente" en la pestaña de "Mis Conexiones"</p>
        </div>
        <div className={styles.imgTutorial}>
          <video width="500" autoPlay loop muted
            onClick={() => toggleVideoSize(4)}
            className={isVideoExpanded === 4 ? styles.videoExpanded : styles.videoNormal}
          >
            <source src='https://res.cloudinary.com/dn3kedyer/video/upload/v1708651813/client-04.mp4' type="video/mp4" />
          </video>
        </div>
        <div ref={step4} className={styles.pivot}></div>
      </section>

      <section className={`${styles.section} ${step5Visible ? styles.sectionVisible : styles.sectionInVisible}`}>
        <div className={styles.numberStep}>5</div>
        <div className={styles.textBox}>
          <p className={styles.textTitle}>Chatea con tu Cuidador</p>
          <p className={styles.textStep}>Una vez que el cuidador haya aceptado tu petición se activará el chat de la aplicación. Puedes acceder a el
            en la pestaña de "Mis Conexiones" en el estado "Confirmados". Conversa con tu cuidador y concluye los detalles de tus necesidades.</p>
        </div>
        <div className={styles.imgTutorial}>
          <video width="500" autoPlay loop muted
            onClick={() => toggleVideoSize(5)}
            className={isVideoExpanded === 5 ? styles.videoExpanded : styles.videoNormal}
          >
            <source src='https://res.cloudinary.com/dn3kedyer/video/upload/v1708651809/client-05.mp4' type="video/mp4" />
          </video>
        </div>
        <div ref={step5} className={styles.pivot}></div>
      </section>

      <section className={`${styles.section} ${step6Visible ? styles.sectionVisible : styles.sectionInVisible}`}>
        <div className={styles.numberStep}>6</div>
        <div className={styles.textBox}>
          <p className={styles.textTitle}>Califica el Servicio</p>
          <p className={styles.textStep}>Al finalizar el servicio, deberás calificar el servicio del cuidador para ayudar a los proximos clientes
            conocer la calidad del cuidador. No olvides completar este paso porque nos ayuda mejorar la calidad de la oferta de proveedores.</p>
        </div>
        <div className={styles.imgTutorial}>
          <video width="500" autoPlay loop muted
            onClick={() => toggleVideoSize(6)}
            className={isVideoExpanded === 6 ? styles.videoExpanded : styles.videoNormal}
          >
            <source src='https://res.cloudinary.com/dn3kedyer/video/upload/v1708651809/client-06.mp4' type="video/mp4" />
          </video>
        </div>
        <div ref={step6} className={styles.pivot}></div>
      </section>

    </div>
  );
};

export default SlideCustomer;
