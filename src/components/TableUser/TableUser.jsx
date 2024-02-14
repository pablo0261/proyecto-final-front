import styles from "./TableUser.module.sass";

function TableDue({people}) {

  return (
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {people && people.map((person) => (
            <tr key={person.people.idPeople}>
              <td>{person.people.fullName}</td>
              <td>{person.people.email}</td>
              <td>{person.people.phone}</td>
              <td>{person.people.state}</td>
              {/* Asegúrate de que el campo 'pago' esté definido */}
              <td>{person.people.pago || "No data"}</td>
              <td>{person.people.dateOfAdmission}</td>
              <td><button>MAIL</button></td>
              <td><button>Activo/Inactivo</button></td>
              <td><button>Cancelar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDue;
