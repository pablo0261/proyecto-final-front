const validateName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/
const validateMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const validateText = /^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s\.,;:!¡¿?()-]+$/u

function validation(formData) {
    let errors = {
        fullname: '',
        mail: '',
        title: '',
        report: '',
    };

    if (!formData.fullname) {
        errors.fullname = "Campo obligatorio";
    } else if (!validateName.test(formData.fullname)) {
        errors.fullname = "Ingresá tu nombre y apellido completo";
    }

    if (!formData.mail) {
        errors.mail = "Campo obligatorio";
    } else if (!validateMail.test(formData.mail)) {
        errors.mail = "Ingresá un correo válido";
    }

    if (!formData.title) {
        errors.title = "Campo obligatorio";
    } else if (!validateText.test(formData.title)) {
        errors.title = "Caracteres inválidos";
    } else if (formData.title.length < 25) {
        errors.title = "El título debe tener al menos 25 caracteres";
    } else if (formData.title.length > 150) {
        errors.title = "Título demasiado extenso";
    }

    if (!formData.report) {
        errors.report = "Campo obligatorio";
    } else if (!validateText.test(formData.report)) {
        errors.report = "Caracteres inválidos";
    } else if (formData.report.length < 150) {
        errors.report = "El reporte debe tener al menos 150 caracteres";
    } else if (formData.report.length > 350) {
        errors.report = "Reporte demasiado extenso";
    }

    return errors;
}

export default validation;





