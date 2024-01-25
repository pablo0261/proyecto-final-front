import { useSelector } from "react-redux";
import "./ServiceProveedorCard.style.css";

function ScheduleProveedorCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const schedule = infoUserLog.schedule || [];

  return (
    <div className="container">
      <img className="edit" src="editImage" alt="edit" />
      <table>
        <thead>
          <tr>
            <th className="delete"></th>
            <th className="service">Servicios</th>
            <th className="cost">Precio x Hora</th>
            {/* Aquí se añade la leyenda de los días de la semana */}
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Sábado</th>
            <th>Domingo</th>
          </tr>
        </thead>
        <tbody>
          {infoUserLog.service.map((item, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => handleDeleteClick(item)}>X</button>
              </td>
              <td className="service">{item.name}</td>
              <td className="cost">Pesos {item.value}</td>
              {/* Aquí se añade la información del horario para cada servicio */}
              {schedule.map((day, dayIndex) => (
                <td key={dayIndex}>{day ? "OK" : ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleProveedorCard;
