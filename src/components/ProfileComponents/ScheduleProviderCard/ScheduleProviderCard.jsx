import { useSelector } from "react-redux";
import "./ScheduleProviderCard.style.css";

function ScheduleProviderCard() {
  const infoUserLog = useSelector((state) => state.infoUserLog);

  const handleDeleteClick = () => {
    // dispatch(handleDeleteService(item));
   
  };

  const schedule = infoUserLog.schedule || [];

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const shifts = ["Mañana", "Tarde", "Noche"];

  return (
    <div className="container">
      <img className="edit" src="editImage" alt="edit" />
      <table>
        <thead>
          <tr>
            <th className="delete"></th>
            <th className="service">Turno</th>
            {daysOfWeek.map((day, dayIndex) => (
              <th key={dayIndex}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, shiftIndex) => (
            <tr key={shiftIndex}>
              <td>
                <button onClick={() => handleDeleteClick(shift)}>X</button>
              </td>
              <td className="service">{shift}</td>
              {daysOfWeek.map((day, dayIndex) => (
                <td key={dayIndex}>{schedule[shiftIndex * daysOfWeek.length + dayIndex] ? "OK" : ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleProviderCard;
