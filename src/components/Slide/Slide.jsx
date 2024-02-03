import React, { useEffect, useState } from 'react';
import styles from './slide.module.scss';

const Slide = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = (event) => {
      setScrollPosition((prevPosition) => prevPosition + event.deltaY);
      event.preventDefault();
    };

    const container = document.querySelector(`.${styles.container}`);
    container.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`);
    container.scrollLeft = scrollPosition;
  }, [scrollPosition]);

  return (
    <section className={styles.container}>
      <section className={styles.section}>
        <div className={styles.section__row}>
          <div>
            <i>1</i>
          </div>
          <div>
            <h2>Registrate</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
          </div>
          <iframe className={styles.iframe}></iframe>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.section__row}>
          <div>
            <i>2</i>
          </div>
          <div>
            <h2>Registrate</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
          </div>
          <iframe className={styles.iframe}></iframe>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.section__row}>
          <div>
            <i>3</i>
          </div>
          <div>
            <h2>Registrate</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio at, magnam quae repellat, repudiandae ipsa nam consequuntur.</p>
          </div>
          <iframe className={styles.iframe}></iframe>
        </div>
      </section>

    </section>
  );
};

export default Slide;
