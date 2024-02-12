import React from 'react'
import styles from "./TableUser.module.sass"

function TableDue() {
  return (
    <div className={styles.container}>
      <table classname={styles.customTable}>
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
            <td><button>Activo/Inactivo</button></td>
            <td><button>Cancelar</button></td>
          </tr>
          <tr>
            <td>Jose Gonzalez</td>
            <td>josegonzales@gmail.com</td>
            <td>3812348854</td>
            <td>Activo</td>
            <td>ayer</td>
            <td>6 dias</td>
            <td><button>MAIL</button></td>
            <td><button>Activo/Inactivo</button></td>
            <td><button>Cancelar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableDue