import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putUserData } from "../../../redux/actions/index";
import styles from "./FormSchedule.module.sass";
import okIcon from "../../../assets/Icons/IconCheck.png";
import emptyIcon from "../../../assets/Icons/IconCheckEmpty.png";
import Swal from "sweetalert2";

function ScheduleForm({ handleShowForm }) {
  const dispatch = useDispatch();
  const infoUserLog = useSelector((state) => state.infoUserLog);
  const [editedSchedule, setEditedSchedule] = useState([]);

  const [userData, setUserData] = useState({
    idPeople: infoUserLog.idPeople,
    weekCalendar: editedSchedule,
  });

  useEffect(() => {
    const exampleSchedule = infoUserLog.weekCalendar || [ ];
    setEditedSchedule(exampleSchedule);
  }, [infoUserLog]);

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      weekCalendar: editedSchedule
    }));
  }, [editedSchedule]);

  const toggleDayShift = (index) => {
    const newSchedule = [...editedSchedule];
    newSchedule[index] = !newSchedule[index];
    setEditedSchedule(newSchedule);
  };

  const handleSaveSchedule = (event) => {
    event.preventDefault();
    try {
    dispatch(putUserData(userData));
    handleShowForm();
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Error al guardar la agenda.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
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
