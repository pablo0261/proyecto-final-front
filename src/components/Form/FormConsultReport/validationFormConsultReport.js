const validateName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/
const validateMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const validateText = /^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s\.,;:!¡¿?()-]+$/u

function validation(formData) {
    let errors = {
        fullName: '',
        senderMail: '',
        title: '',
        message: '',
    };

    if (!formData.fullName) {
        errors.fullName = "Campo obligatorio";
    } else if (!validateName.test(formData.fullName)) {
        errors.fullName = "Ingresá tu nombre y apellido completo";
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
    } else if (formData.title.length < 10) {
        errors.title = "El título debe tener al menos 10 caracteres";
    } else if (formData.title.length > 150) {
        errors.title = "Título demasiado extenso";
    }

    if (!formData.message) {
        errors.message = "Campo obligatorio";
    } else if (!validateText.test(formData.message)) {
        errors.message = "Caracteres inválidos";
    } else if (formData.message.length < 50) {
        errors.message = "El mensaje debe tener al menos 50 caracteres";
    } else if (formData.message.length > 190) {
        errors.message = "Mensaje demasiado extenso";
    }

    return errors;
}

export default validation;





