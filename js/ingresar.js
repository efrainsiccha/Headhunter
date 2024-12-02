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