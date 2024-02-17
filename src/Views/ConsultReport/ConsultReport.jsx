import FormConsultReport from '../../components/Form/FormConsultReport/FormConsultReport';
import styles from './ConsultReport.module.scss';
import Helpers from '../../Helpers/RoutesFront';

const ConsultReport = () => {
    return (
      <div className={styles.container}>
        <p className={styles.textTitle}>Dejanos tu consulta o reclamo</p>
        <FormConsultReport/>
      </div>
    );
  };
  
  export default ConsultReport;