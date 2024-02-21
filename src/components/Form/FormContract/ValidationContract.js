const ValidationContract = (property, errors, setErrors, contractForm) => {
    if (property === "dateOfService") {
        const selectedDate = new Date(contractForm.dateOfService);
        const normalizedSelectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1);

        const today = new Date();
        const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (!contractForm.dateOfService) {
            setErrors({ ...errors, dateOfService: "*Ingresá la fecha de inicio del servicio" })
        } else if (normalizedSelectedDate.setHours(0, 0, 0, 0) === normalizedToday.setHours(0, 0, 0, 0)) {
            setErrors({ ...errors, dateOfService: "*No puedes seleccionar la fecha de hoy" });
        } else if (normalizedSelectedDate < normalizedToday) {
            setErrors({ ...errors, dateOfService: "*No puedes seleccionar fechas anteriores" });
        } else {
            setErrors({ ...errors, dateOfService: "" });
        }
    }

    if (property === "timeOfService") {
        if (!contractForm.timeOfService) {
            setErrors({ ...errors, timeOfService: "*Ingresá el horario de inicio del servicio" })
        } else {
            setErrors({ ...errors, timeOfService: "" });
        }
    }
    
    if (property === "durationOfService") {
        if (!contractForm.durationOfService) {
            setErrors({ ...errors, durationOfService: "*Ingresá el total de horas que necesitas" })
        } else  if (contractForm.durationOfService < 1) {
            setErrors({ ...errors, durationOfService: "*Ingresá un total de horas válido" })
        } else {
            setErrors({ ...errors, durationOfService: "" })
        }
    }
}

export default ValidationContract