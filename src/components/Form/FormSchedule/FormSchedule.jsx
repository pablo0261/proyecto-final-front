import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./FormSchedule.module.sass";
import okIcon from "../../../assets/Icons/IconCheck.png";
import emptyIcon from "../../../assets/Icons/IconCheckEmpty.png";

function ScheduleForm({ handleShowForm }) {
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [editedSchedule, setEditedSchedule] = useState([]);

  useEffect(() => {
    const exampleSchedule = infoUserLog.schedule || [
      true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false
    ];
    setEditedSchedule(exampleSchedule);
  }, [infoUserLog.schedule]);

  const toggleDayShift = (index) => {
    const newSchedule = [...editedSchedule];
    newSchedule[index] = !newSchedule[index];
    setEditedSchedule(newSchedule);
  };

  const handleSaveSchedule = () => {
    // Aquí puedes enviar el calendario editado al backend
    console.log("Calendario editado guardado:", editedSchedule);
    handleShowForm();
  };

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
        <h2 className={styles.textTitle}>Marque los Horarios que tiene disponible</h2>
        <div className={styles.FormDivInput}>
          <div className={styles.shiftsContain}>
            {shifts.map((shift, shiftIndex) => (
              <p key={shiftIndex} className={styles.shifts}>{shift}</p>
            ))}
          </div>
          {daysOfWeek.map((day, dayIndex) => (
            <div key={dayIndex}>
              <p className={styles.day}>{day}</p>
              {shifts.map((shift, shiftIndex) => ( 
                <div
                  key={shiftIndex}
                  className={styles.dayShift}
                  onClick={() => toggleDayShift(dayIndex * shifts.length + shiftIndex)}
                >
                  {editedSchedule[dayIndex * shifts.length + shiftIndex] ? (
                    <img src={okIcon} alt="OK" />
                  ) : (
                    <img src={emptyIcon} alt="Empty" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleSaveSchedule} className={styles.buttonSave}>
            Guardar
          </button>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => handleShowForm()}
          ></button>
        </div>
      </div>
    </div>
  );
                  }  

export default ScheduleForm;
