function goBack() {
    // Comprobamos si hay alguna página en el historial
    if (document.referrer) {
        // Si hay una página anterior, usamos el historial para regresar
        window.history.back();
    } else {
        // Si no hay página anterior, redirigimos a index.html
        window.location.href = "index.html";
    }
}

function togglePassword(fieldId) {
    var passwordField = document.getElementById(fieldId);
    var eyeIcon;

    // Si es el campo de contraseña
    if (fieldId === 'password') {
        eyeIcon = document.getElementById('eye-icon-password');
    } 
    // Si es el campo de confirmar contraseña
    else if (fieldId === 'confirm-password') {
        eyeIcon = document.getElementById('eye-icon-confirm-password');
    }

    // Cambiar entre texto y contraseña
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.src = "resources/ojo-abierto.webp"; // Cambiar a ojo abierto
    } else {
        passwordField.type = "password";
        eyeIcon.src = "resources/ojo-cerrado.webp"; // Cambiar a ojo cerrado
    }
}

//Validar todo el formulario
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form'); // Asegurarse de seleccionar el formulario correcto
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const taxConditionSelect = document.getElementById('tax-condition');
    const documentInput = document.getElementById('document');
    const companyPhoneInput = document.getElementById('company-phone');  // Agregamos el input de teléfono

    // Función de validación de las contraseñas
    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Si las contraseñas no coinciden
        if (password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
        } else {
            confirmPasswordInput.setCustomValidity(""); // Si coinciden, limpiamos cualquier mensaje de error
        }
    }

    // Función de validación para el campo de documento (DNI o RUC)
    function validateDocument() {
        const taxCondition = taxConditionSelect.value;
        const documentValue = documentInput.value;

        if (taxCondition === 'dni') {
            if (documentValue.length !== 8) {
                documentInput.setCustomValidity("El DNI debe tener 8 dígitos.");
            } else {
                documentInput.setCustomValidity(""); // Limpiar el mensaje si es válido
            }
        } else if (taxCondition === 'ruc') {
            if (documentValue.length !== 12) {
                documentInput.setCustomValidity("El RUC debe tener 12 dígitos.");
            } else {
                documentInput.setCustomValidity(""); // Limpiar el mensaje si es válido
            }
        } else {
            documentInput.setCustomValidity(""); // Si no hay opción seleccionada, no establecemos mensaje de error
        }
    }

    // Función de validación para el número de teléfono
    function validatePhoneNumber() {
        const phoneValue = companyPhoneInput.value;

        // Si el número de teléfono no tiene 9 dígitos
        if (phoneValue.length !== 9 || !/^\d+$/.test(phoneValue)) {
            companyPhoneInput.setCustomValidity("El número de teléfono debe tener 9 dígitos.");
        } else {
            companyPhoneInput.setCustomValidity(""); // Limpiar el mensaje si es válido
        }
    }

    // Función de validación cuando el formulario se envía
    form.addEventListener('submit', function (event) {
        // Validamos las contraseñas antes de enviar el formulario
        validatePasswords();

        // Validamos el documento
        validateDocument();

        // Validamos el número de teléfono
        validatePhoneNumber();

        // Si el formulario no es válido, prevenimos el envío
        if (!form.checkValidity()) {
            event.preventDefault();  // Detiene el envío del formulario si no es válido

            // Mostramos el mensaje de error para los campos no válidos
            passwordInput.reportValidity();  // Muestra el mensaje de error en la contraseña
            confirmPasswordInput.reportValidity();  // Muestra el mensaje de error en repetir contraseña
            documentInput.reportValidity();  // Muestra el mensaje de error en el documento
            companyPhoneInput.reportValidity();  // Muestra el mensaje de error en el número de teléfono
        }
    });

    // Escuchamos cambios en el campo de "Condición Fiscal"
    taxConditionSelect.addEventListener('change', validateDocument);

    // Escuchamos entradas del usuario en el campo "Documento"
    documentInput.addEventListener('input', validateDocument);

    // Escuchamos entradas en el campo "Repetir Contraseña"
    confirmPasswordInput.addEventListener('input', validatePasswords);

    // Escuchamos entradas en el campo "Número de Teléfono"
    companyPhoneInput.addEventListener('input', validatePhoneNumber);
});