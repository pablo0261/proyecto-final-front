import React from "react";
import style from "./SlideProvider.module.scss";
import { useInView } from "react-intersection-observer";

function SlideProvider() {
  const { ref: step1, inView: step1Visible } = useInView();
  const { ref: step2, inView: step2Visible } = useInView();
  const { ref: step3, inView: step3Visible } = useInView();
  const { ref: step4, inView: step4Visible } = useInView();
  const { ref: step5, inView: step5Visible } = useInView();
  const { ref: step6, inView: step6Visible } = useInView();

  return (
    <div className={style.container}>
      <section
        className={`${style.section} ${
          step1Visible ? style.sectionVisible : style.sectionInVisible
        }`}
      >
        <div className={style.numberStep}>1</div>
        <div className={style.textBox}>
          <p className={style.textTitle}>Registrate</p>
          <p className={style.textStep}>
            Selecciona la opción <strong>"Ofrecer mis Servicios"</strong> y
            accederás a "iniciar Sesión".<br></br>
            Por ser tu primera vez, deberás ir al botón{" "}
            <strong>"Registrarse"</strong> y llenar el formulario con tus datos
            personales. <br></br>Para mantener activa tu cuenta, deberás abonar
            de forma mensual una suscripción.
          </p>
        </div>
        <div className={style.imgTutorial}></div>
        <div ref={step1} className={style.pivot}></div>
      </section>

      <section
        className={`${style.section} ${
          step2Visible ? style.sectionVisible : style.sectionInVisible
        }`}
      >
        <div className={style.numberStep}>2</div>
        <div className={style.textBox}>
          <p className={style.textTitle}>Completa tu Perfil</p>
          <p className={style.textStep}>
            Selecciona la pestaña de <strong>"Mi Perfil"</strong> y completa
            todos tus datos personales para poder Verificar tu cuenta. <br></br>
            Esto ayuda a que tus clientes puedan conocer mas sobre ti.
          </p>
        </div>
        <div className={style.imgTutorial}></div>
        <div ref={step2} className={style.pivot}></div>
      </section>

      <section
        className={`${style.section} ${
          step3Visible ? style.sectionVisible : style.sectionInVisible
        }`}
      >
        <div className={style.numberStep}>3</div>
        <div className={style.textBox}>
          <p className={style.textTitle}>Visualiza tus Estadísticas</p>
          <p className={style.textStep}>
            Selecciona la pestaña <strong>"Mis Estadísticas"</strong> para
            visualizar las métricas de la actividad de los clientes en tu
            cuenta, junto con otra información relevante.<br></br>
            Mantente activo en la plataforma para mejorar tu visibilidad.
          </p>
        </div>
        <div className={style.imgTutorial}></div>
        <div ref={step3} className={style.pivot}></div>
      </section>

      <section
        className={`${style.section} ${
          step4Visible ? style.sectionVisible : style.sectionInVisible
        }`}
      >
        <div className={style.numberStep}>4</div>
        <div className={style.textBox}>
          <p className={style.textTitle}>Agrega tus Servicios</p>
          <p className={style.textStep}>
            En la pestaña <strong>"Mi Perfil"</strong>, podrás agregar los
            servicios que deseas ofrecer, tales como cuidado, acompañamiento u
            otros que desees incluir.<br></br>
            Establece el valor de cada servicio ofrecido y asegúrate de mantener
            esta lista actualizada.
          </p>
        </div>
        <div className={style.imgTutorial}></div>
        <div ref={step4} className={style.pivot}></div>
      </section>

      <section
        className={`${style.section} ${
          step5Visible ? style.sectionVisible : style.sectionInVisible
        }`}
      >
        <div className={style.numberStep}>5</div>
        <div className={style.textBox}>
          <p className={style.textTitle}>Conecta con tu Cliente</p>
          <p className={style.textStep}>
            Una vez que un Cliente haya realizado una solicitud de contrato,
            podrás aceptarla o denegarla desde la pestaña{" "}
            <strong>"Mis Conexiones"</strong> en el estado "Pendientes". Una vez
            que hayas aceptado el contrato, se habilitará el chat con tu cliente
            para ultimar detalles del servicio.
          </p>
        </div>
        <div className={style.imgTutorial}></div>
        <div ref={step5} className={style.pivot}></div>
      </section>

      <section
        className={`${style.section} ${
          step6Visible ? style.sectionVisible : style.sectionInVisible
        }`}
      >
        <div className={style.numberStep}>6</div>
        <div className={style.textBox}>
          <p className={style.textTitle}>Evalua al Cliente</p>
          <p className={style.textStep}>
            Al finalizar el servicio, deberás calificar al cliente. Esto ayudará
            a que los próximos cuidadores tengan más referencias del Cliente.
            <br></br> ¡No olvides completar este paso! Es muy importante para
            otros cuidadores y nos ayuda a mejorar la calidad de la oferta de
            clientes.
          </p>
        </div>
        <div className={style.imgTutorial}></div>
        <div ref={step6} className={style.pivot}></div>
      </section>
    </div>
  );
}

export default SlideProvider;
