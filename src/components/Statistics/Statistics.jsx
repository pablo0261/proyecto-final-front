import React, { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import styles from './statistics.module.scss';
import connection from '../../assets/Icons/IconConnectionsLanding.png'
import services from '../../assets/Icons/IconServicesLanding.png'
import clients from '../../assets/Icons/IconClientsLanding.png'
import provider from '../../assets/Icons/IconProviderLanding.png'

const Statistics = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
       
            <Element name="container" className={styles.container}>
                <div className={`${styles.container}  ${scrolled ? styles.scrolled : ''}`}>
                    <img src={connection} alt="" />
                    <h2>%89</h2>
                    <p>Conexiones Exitosas</p>
                </div>
                <div className={`${styles.container}  ${scrolled ? styles.scrolled : ''}`}>
                    <img src={services} alt="" />
                    <h2>25</h2>
                    <p>Servicios</p>
                </div>
                <div className={`${styles.container}  ${scrolled ? styles.scrolled : ''}`}>
                    <img src={clients} alt="" />
                    <h2>250</h2>
                    <p>Familias</p>
                </div>
                <div className={`${styles.container}  ${scrolled ? styles.scrolled : ''}`}>
                    <img src={provider} alt="" />
                    <h2>134</h2>
                    <p>Proveedores</p>
                </div>
            </Element>
       
    );
};

export default Statistics;
