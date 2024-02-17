import React from 'react'
import style from './ReportsCustomerView.module.sass'
import Reports from '../../components/Reports/Reports'

function ReportsCustomerView() {
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.textTitle}>Tus Reportes</p>
        <Reports></Reports>
      </div>
    </div>
  )
}

export default ReportsCustomerView