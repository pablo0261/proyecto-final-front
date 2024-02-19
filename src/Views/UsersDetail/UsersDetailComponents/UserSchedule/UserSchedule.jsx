import React, { useEffect, useState } from 'react'
import style from './UserSchedule.module.sass'
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
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.title}>Disponibilidad y Ubicación</p>
        <div className={style.infoWrapper}>
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.days}></th>
                {daysOfWeek.map((day, dayIndex) => (
                  <th className={style.days} key={dayIndex}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift, shiftIndex) => (
                <tr key={shiftIndex}>
                  <td className={style.turnos}>{shift}</td>
                  {daysOfWeek.map((day, dayIndex) => (
                    <td key={dayIndex}>
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
      </div>
    </div>
  );
}

export default UserSchedule