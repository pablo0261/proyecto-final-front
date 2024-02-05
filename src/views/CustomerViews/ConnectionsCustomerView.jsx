import React from 'react'
import style from './ConnectionsCustomerView.module.sass'
import Connections from '../../components/Connections/Connections'

function ConnectionsCustomerView() {
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.textTitle}>Tus Proveedores</p>
        <Connections></Connections>
      </div>
    </div>
  )
}

export default ConnectionsCustomerView