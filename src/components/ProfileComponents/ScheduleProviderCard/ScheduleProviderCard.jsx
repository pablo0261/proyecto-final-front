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

  //! Aqui desarrollar la logica para traer los dias disponibles
  // useEffect(() => {
  //   if (
  //     infoUserLog &&
  //     infoUserLog.categories &&
  //     infoUserLog.categories.length > 0
  //   ) {
  //     const educationOptions = infoUserLog.categories[1].categories_options;

  //     if (educationOptions && educationOptions.length > 0) {
  //       const educationData = educationOptions.map((option) => ({
  //         idPeople: infoUserLog.idPeople,
  //         idOption: option.idOption,
  //         education: option.description || "No informado",
  //         institution: option.people_options[0].institution || "No informado",
  //         year: option.people_options[0]?.year || "No informado",
  //         comment:
  //           option.people_options[0]?.comment || "No informado",
  //       }));

  //       setEducation(educationData);
  //     }
  //   }
  // }, [infoUserLog]);

  //! Esto de aqui abajo luego de traer la info del back quitarlo
  useEffect(() => {
    const exampleSchedule = infoUserLog.schedule || [
      true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true, false
    ];
    setSchedule(exampleSchedule);
  }, [infoUserLog.schedule]);


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

export default ScheduleProviderCard;
