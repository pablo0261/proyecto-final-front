import React from 'react'
import styles from "../CardHomeProveedor/CardHomeProveedor.module.sass"

function card(props) {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.imgContainer}></div>

          <div className='flex justify-center'>
            <p className='font-bold'>4.5(15)</p>
          </div>
      </div>

      <div>
        <div className={styles.sectionProfile}>
          <div className={styles.sectionInfoProfile}>
            <h3>{props.user.name}</h3>
            <p>{props.user.address}</p>
            <h4>{props.user.aboutMe}</h4>
          </div>
          <div className={styles.sectionCost}>
            <p>A partir de</p><p className='font-bold'> 10 US$ x hora</p>
          </div>
        </div>
        <div className={styles.sectionAbilities}>
          <span>Cuidado</span>
          <span>Cuidado + Limpieza</span>
          <span>Cuidado + Cocina</span>
          <span>Cuidado + Limpieza + Cocina</span>
        </div>
      </div>

    </div>
  )
}

export default card