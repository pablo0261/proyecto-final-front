const validateName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/
const validateMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const validateText = /^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s\.,;:!¡¿?()-]+$/u

function validation(formData) {
    let errors = {
        fullname: '',
        senderMail: '',
        title: '',
        message: '',
    };

    if (!formData.fullname) {
        errors.fullname = "Campo obligatorio";
    } else if (!validateName.test(formData.fullname)) {
        errors.fullname = "Ingresá tu nombre y apellido completo";
    }

    if (!formData.senderMail) {
        errors.senderMail = "Campo obligatorio";
    } else if (!validateMail.test(formData.senderMail)) {
        errors.senderMail = "Ingresá un correo válido";
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

    if (!formData.message) {
        errors.message = "Campo obligatorio";
    } else if (!validateText.test(formData.message)) {
        errors.message = "Caracteres inválidos";
    } else if (formData.message.length < 150) {
        errors.message = "El mensaje debe tener al menos 150 caracteres";
    } else if (formData.message.length > 350) {
        errors.message = "Mensaje demasiado extenso";
    }

    return errors;
}

export default validation;





