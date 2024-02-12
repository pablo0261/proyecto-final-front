import FormConsultReport from '../../components/Form/FormConsultReport/FormConsultReport';
import styles from './ConsultReport.module.scss';
import Helpers from '../../Helpers/RoutesFront';

const ConsultReport = () => {
    return (
      <div className={styles.container}>
        <div className={styles.container__a}>
        <a href={Helpers.Landing}>Volver</a>
          </div>
        <p className={styles.textTitle}>Dejanos tu consulta o reclamo</p>
        <FormConsultReport/>
      </div>
    );
  };
  
  export default ConsultReport;