import styles from './statistics.module.css';
import connection from '../../assets/image/IconConnectionsLanding.png'
import services from '../../assets/image/IconServicesLanding.png'
import clients from '../../assets/image/IconClientsLanding.png'
import provider from '../../assets/image/IconProviderLanding.png'

const Statistics = () => {
    return (
        <div className={styles.container}>
            <div className={styles.div}>
                <img src={connection} alt="" />
                <h2>%78</h2>
                <p>Conexiones Exitosas</p>
            </div>
            <div className={styles.div}>
                <img src={services} alt="" />
                <h2>25</h2>
                <p>Servicios</p>
                </div>
            <div className={styles.div}>
                <img src={clients} alt="" />
                <h2>250</h2>
                <p>Familias</p>
                </div>
            <div className={styles.div}>
                <img src={provider} alt="" />
                <h2>134</h2>
                <p>Proveedores</p>
                </div>
        </div>
    );
};

export default Statistics;