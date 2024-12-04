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
            if (documentValue.length !== 11) {
                documentInput.setCustomValidity("El RUC debe tener 11 dígitos.");
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

// Seleccionamos el formulario de creación de cuenta
document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado (recarga de la página)

    // Recopilamos los datos del formulario
    const formData = {
        companyName: document.getElementById('company-name').value,
        businessName: document.getElementById('business-name').value,
        taxCondition: document.getElementById('tax-condition').value,
        document: document.getElementById('document').value,
        companyPhone: document.getElementById('company-phone').value,
        postalCode: document.getElementById('postal-code').value,
        industry: document.getElementById('industry').value,
        employeeCount: document.getElementById('employee-count').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('user-email').value,
        password: document.getElementById('password').value
    };

    fetch('https://headhunter-e1qd.onrender.com/api/crear-cuenta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        const messageContainer = document.getElementById('message-container');
        if (response.ok) {
            return response.json().then(data => {
                // Mostrar el mensaje de éxito
                messageContainer.style.display = 'block';
                messageContainer.textContent = data.message;
                messageContainer.style.backgroundColor = 'green';  // Color verde para éxito
                
                // Mostrar el mensaje durante 5 segundos y luego redirigir a ingresar.html
                setTimeout(() => {
                    messageContainer.style.display = 'none';  // Ocultar el mensaje
                    window.location.href = 'ingresar.html';  // Redirigir a la página de login
                }, 2000);  // 2000ms = 2 segundos
            });
        } else {
            throw new Error('Error al crear la cuenta');
        }
    })
    .catch(error => {
        const messageContainer = document.getElementById('message-container');
        // Mostrar el mensaje de error
        messageContainer.style.display = 'block';
        messageContainer.textContent = 'Error al crear la cuenta';
        messageContainer.style.backgroundColor = 'red';  // Color rojo para error
        
        // Mostrar el mensaje durante 5 segundos y luego ocultarlo (sin redirigir)
        setTimeout(() => {
            messageContainer.style.display = 'none';  // Ocultar el mensaje
        }, 5000);  // 5000ms = 5 segundos
    });
});