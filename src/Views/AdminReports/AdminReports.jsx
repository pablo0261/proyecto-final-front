import React from 'react'
import style from './AdminReports.module.sass'
import Reports from '../../components/Reports/Reports'

function AdminReports() {
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.textTitle}>Reportes</p>
        <Reports></Reports>
      </div>
    </div>
  )
}

export default AdminReports