import React from 'react'
import style from './ConnectionsProviderView.module.sass'
import Connections from '../../components/Connections/Connections'

function ConnectionsProviderView() {
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.textTitle}>Tus Clientes</p>
        <Connections></Connections>
      </div>
    </div>
  )
}

export default ConnectionsProviderView