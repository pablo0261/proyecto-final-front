import React from 'react'
import styles from "./TableUserDue.module.sass"
import Pagination from '../Pagination/Pagination'

function TableUserDue() {
  return (
    <div>
      <h2>Usuarios en deuda</h2>
      
    <div className={styles.container}>
      <table className={styles.customTable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Mail</th>
            <th>Telefono</th>
            <th>Activo/Inactivo</th>
            <th>Pago</th>
            <th>Antiguedad</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jose Gonzalez</td>
            <td>josegonzales@gmail.com</td>
            <td>3812348854</td>
            <td>Activo</td>
            <td>ayer</td>
            <td>6 dias</td>
            <td><button>MAIL</button></td>
            <td><button>On/Off</button></td>
          </tr>
          <tr>
            <td>Jose Gonzalez</td>
            <td>josegonzales@gmail.com</td>
            <td>3812348854</td>
            <td>Activo</td>
            <td>ayer</td>
            <td>6 dias</td>
            <td><button>MAIL</button></td>
            <td><button>On/Off</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className={styles.pagination}>
      <Pagination/>
    </div>
    <h3>Dar de baja automaticamente adeudados</h3>
    <h3>Aviso previo dia anterior</h3>
    </div>
  )
}

export default TableUserDue