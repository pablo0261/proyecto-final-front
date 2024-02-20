import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ScheduleForm from "../../Form/FormSchedule/FormSchedule";
import styles from "./ScheduleProvider.module.sass";
import okIcon from "../../../assets/Icons/IconCheck.png";
import emptyIcon from "../../../assets/Icons/IconCheckEmpty.png";

function ScheduleProviderCard() {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [showForm, setShowForm] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (
      infoUserLog &&
      infoUserLog.categories &&
      infoUserLog.categories.length > 0
    ) {
      const calendar = infoUserLog.weekCalendar;
      if (calendar && calendar.length > 0) {
        setSchedule(calendar);
      }
    }
  }, [infoUserLog]);

  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const shifts = ["Mañana", "Tarde", "Noche"];

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Disponibilidad y Ubicación</h1>
        <button onClick={handleShowForm} className={styles.editButton}></button>
      </div>
      <div className={styles.infoWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.days}></th>
              {daysOfWeek.map((day, dayIndex) => (
                <th className={styles.days} key={dayIndex}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift, shiftIndex) => (
              <tr key={shiftIndex}>
                <td className={styles.turnos}>{shift}</td>
                {daysOfWeek.map((day, dayIndex) => {
                  const index = dayIndex * shifts.length + shiftIndex;
                  return (
                    <td key={dayIndex}>
                      {schedule[index] ? (
                        <img src={okIcon} alt="OK" />
                      ) : (
                        <img src={emptyIcon} alt="OK" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && <ScheduleForm handleShowForm={handleShowForm} />}
    </div>
  );
}

export default ScheduleProviderCard;
