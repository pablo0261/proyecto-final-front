import React from 'react'
import style from './UserSchedule.module.sass'

function UserSchedule() {
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
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Disponibilidad y Ubicación</h1>
        <button onClick={handleShowForm} className={styles.editButton}></button>
      </div >
      <div className={styles.scheduledetailContainer}>
      <table>
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
        <tbody className={styles.tbody}>
          {shifts.map((shift, shiftIndex) => (
            <tr className={styles.turnos} key={shiftIndex}>
              <td className={styles.moment}>{shift}</td>
              {daysOfWeek.map((day, dayIndex) => (
                 <td className={styles.campos} key={dayIndex}>
                 {schedule[shiftIndex * daysOfWeek.length + dayIndex] ? (
                   <img src={okIcon} alt="OK" /> 
                 ) : (
                  <img src={emptyIcon} alt="OK" />
                 )}
               </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {showForm && <ScheduleForm handleShowForm={handleShowForm} />} 
    </div>
  );
}

export default UserSchedule