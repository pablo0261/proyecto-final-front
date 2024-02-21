import React, { useEffect, useState } from 'react'
import styles from './UserSchedule.module.sass'
import okIcon from '../../../../assets/Icons/IconCheck.png'
import emptyIcon from '../../../../assets/Icons/IconCheckEmpty.png'

function UserSchedule(props) {

  const { infoUser } = props
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (infoUser.weekCalendar != 0) {
      setSchedule(infoUser.weekCalendar)
    }
  }, []);


  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  const shifts = ["Mañana", "Tarde", "Noche"]

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Disponibilidad y Ubicación</h1>
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
    </div>
  );
}

export default UserSchedule