import React from 'react'
import style from './SlideProvider.module.scss'
import { useInView } from 'react-intersection-observer';

function SlideProvider() {

    const { ref: step1, inView : step1Visible } = useInView();
    const { ref: step2, inView : step2Visible } = useInView();
    const { ref: step3, inView : step3Visible } = useInView();
    const { ref: step4, inView : step4Visible } = useInView();
    const { ref: step5, inView : step5Visible } = useInView();
    const { ref: step6, inView : step6Visible } = useInView();
  
    return (
      <div className={style.container}>
  
        <section className={`${style.section} ${step1Visible ? style.sectionVisible : style.sectionInVisible}`}>
            <div className={style.numberStep}>1</div>
            <div className={style.textBox}>
              <p className={style.textTitle}>Registrate</p>
              <p className={style.textStep}>Selecciona la opción "Ofrecer mis Servicios" y accederás a la vista del acceso a tu cuenta. 
              Por ser tu primera vez deberas ir al boton "Registrarse" y llenar el formulario con tus datos personales. Para mantener activa tu cuenta
              deberas abonar de forma mensual una subscripción.</p>
            </div>
            <div className={style.imgTutorial}></div>
            <div ref={step1} className={style.pivot}></div>
        </section>
  
        <section className={`${style.section} ${step2Visible ? style.sectionVisible : style.sectionInVisible}`}>
            <div className={style.numberStep}>2</div>
            <div className={style.textBox}>
              <p className={style.textTitle}>Completa tu Perfil</p>
              <p className={style.textStep}>Selecciona la pestaña de "Mi Perfil" y completa todos tus datos personales para 
              poder verificar tu cuenta. Esto ayuda a que tus clientes puedan conocer mas sobre ti.</p>
            </div>
            <div className={style.imgTutorial}></div>
            <div ref={step2} className={style.pivot}></div>
        </section>
  
        <section className={`${style.section} ${step3Visible ? style.sectionVisible : style.sectionInVisible}`}>
            <div className={style.numberStep}>3</div>
            <div className={style.textBox}>
              <p className={style.textTitle}>Visualiza tus Estadísticas</p>
              <p className={style.textStep}>Selecciona la pestaña "Mis Estadísticas" y visualiza tus estadisticas generales como
              proveedor de servicio en nuestra pagina. Checkea tu estatus dentro de la pagina y mejora tu visibilidad.</p>
            </div>
            <div className={style.imgTutorial}></div>
            <div ref={step3} className={style.pivot}></div>
        </section>
  
        <section className={`${style.section} ${step4Visible ? style.sectionVisible : style.sectionInVisible}`}>
            <div className={style.numberStep}>4</div>
            <div className={style.textBox}>
              <p className={style.textTitle}>Agrega tus Servicios</p>
              <p className={style.textStep}>En la pestaña de "Mi Perfil" podras agregar tus servicios de cuidado mas los extras
              que quieras agregar y establecerles un valor al combo creado. Manten actualizada esta lista.</p>
            </div>
            <div className={style.imgTutorial}></div>
            <div ref={step4} className={style.pivot}></div>
        </section>
  
        <section className={`${style.section} ${step5Visible ? style.sectionVisible : style.sectionInVisible}`}>
            <div className={style.numberStep}>5</div>
            <div className={style.textBox}>
              <p className={style.textTitle}>Conecta con tu Cliente</p>
              <p className={style.textStep}>Una vez que un cliente haya hecho una peticion de contrato, podras aceptarlo o denegarlo si cumple con tus requisitos. 
              Puedes acceder a la peticion en la pestaña de "Mis Conexiones" en el estado "Pendientes". Una vez que hayas aceptado el contrato, se habilitara el chat
              con tu cliente para ultimar detalles de tu servicio.</p>
            </div>
            <div className={style.imgTutorial}></div>
            <div ref={step5} className={style.pivot}></div>
        </section>
  
        <section className={`${style.section} ${step6Visible ? style.sectionVisible : style.sectionInVisible}`}>
            <div className={style.numberStep}>6</div>
            <div className={style.textBox}>
              <p className={style.textTitle}>Evalua al Cliente</p>
              <p className={style.textStep}>Al finalizar el servicio, deberás calificar el cliente para ayudar a que los proximos cuidadores conozcan
              la calidad del cliente. No olvides completar este paso porque nos ayuda mejorar la calidad de la oferta de clientes.</p>
            </div>
            <div className={style.imgTutorial}></div>
            <div ref={step6} className={style.pivot}></div>
        </section>
        
      </div>
    );
}

export default SlideProvider