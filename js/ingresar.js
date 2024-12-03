function togglePassword() {
    var passwordField = document.getElementById("password");
    var eyeIcon = document.getElementById("eye-icon");

    // Si el campo de contraseña está en modo "password", cambia a "text" (mostrar contraseña)
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.src = "resources/ojo-abierto.webp";  // Cambiar la imagen a ojo abierto
    } else {
        passwordField.type = "password";
        eyeIcon.src = "resources/ojo-cerrado.webp";  // Cambiar la imagen a ojo cerrado
    }
}

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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageContainer = document.getElementById('message-container');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se recargue la página
    
        // Obtener los valores del formulario
        const email = emailInput.value;
        const password = passwordInput.value;
    
        // Realizar la solicitud al servidor para verificar las credenciales
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
            .then(data => {
                if (data.message === 'Inicio de sesión exitoso') {
                    // Inicio de sesión exitoso
                    messageContainer.style.display = 'block';
                    messageContainer.textContent = 'Inicio de sesión exitoso';
                    messageContainer.style.backgroundColor = 'green';
                
                    // Guardar el estado de sesión y los datos de la empresa en localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', data.userEmail);  // Guardar el correo de la empresa
                    localStorage.setItem('companyName', data.companyName);  // Guardar el nombre de la empresa
                    
                    // Redirigir después de guardar en localStorage
                    setTimeout(() => {
                        messageContainer.style.display = 'none';
                        window.location.href = 'buscar-talento.html';
                    }, 1000); // Cambiado a 1 segundo
                } else {
                    // Credenciales incorrectas
                    messageContainer.style.display = 'block';
                    messageContainer.textContent = 'Credenciales incorrectas. Intenta nuevamente.';
                    messageContainer.style.backgroundColor = 'red';
                
                    // Ocultar el mensaje de error después de 1 segundo
                    setTimeout(() => {
                        messageContainer.style.display = 'none';
                    }, 1000); // Cambiado a 1 segundo
                }
            })          
        .catch(error => {
            console.error('Error:', error);
            messageContainer.style.display = 'block';
            messageContainer.textContent = 'Error al conectar con el servidor.';
            messageContainer.style.backgroundColor = 'red';
            
            // Ocultar el mensaje de error después de 1 segundo
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 1000); // Cambiado a 1 segundo
        });
    });
    
    // Función de cierre de sesión
    function logout() {
        // Eliminar el estado de sesión de localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('companyName');

        // Volver a mostrar los botones de "Crear Cuenta" e "Ingresar"
        document.querySelector('.header-buttons').style.display = 'flex';

        // Eliminar el botón de "Cerrar sesión"
        const logoutButton = document.querySelector('.btn-header');
        if (logoutButton) {
            logoutButton.remove();
        }

        // Redirigir a la página de inicio
        window.location.href = 'index.html';
    }
});