import { putState } from "../../redux/actions";
import styles from "./TableUser.module.sass";
import { useDispatch } from "react-redux";

function TableDue({people}) {
  const dispatch = useDispatch();
  const handleChangeStatus = (value, state) => {
    const auxState = state === "Active" ? "Inactive" : "Active";
    dispatch(putState(value, auxState))
  }

  return (
    <div >
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
              <td>{person.people.pago || "No data"}</td>
              <td>{person.people.dateOfAdmission}</td>
              <td><button>MAIL</button></td>
              <td><button type="button" onClick={() => handleChangeStatus(person.people.idPeople, person.people.state)} >{person.people.state === "Active" ? "Inactivo" : "Activo"}</button></td>
              <td><button>Cancelar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default TableDue;
