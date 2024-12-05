document.addEventListener('DOMContentLoaded', function() {
    // Verificar que los botones existan
    const createAccountBtn = document.querySelector('.create-account');
    const loginBtn = document.querySelector('.btn-header:not(.create-account)');
    const logoutButton = document.getElementById("logout-btn");

    if (localStorage.getItem("isLoggedIn") === "true") {
        // Si el usuario está logueado, ocultar los botones de Crear Cuenta e Ingresar
        if (createAccountBtn && loginBtn) {
            createAccountBtn.style.display = "none";
            loginBtn.style.display = "none";
        }

        // Mostrar el botón de Cerrar Sesión
        if (logoutButton) {
            logoutButton.style.display = "inline-block";
        }
    } else {
        // Si no está logueado, mostrar los botones de Crear Cuenta e Ingresar
        if (createAccountBtn && loginBtn) {
            createAccountBtn.style.display = "inline-block";
            loginBtn.style.display = "inline-block";
        }

        if (logoutButton) {
            logoutButton.style.display = "none";  // Asegurarse de que el botón de Cerrar Sesión esté oculto
        }
    }
});

// Función para cerrar sesión
function logout() {
    // Eliminar el estado de sesión de localStorage
    localStorage.removeItem('isLoggedIn');

    // Mostrar los botones de "Crear Cuenta" e "Ingresar"
    const createAccountBtn = document.querySelector('.create-account');
    const loginBtn = document.querySelector('.btn-header:not(.create-account)');
    
    if (createAccountBtn) createAccountBtn.style.display = "inline-block";
    if (loginBtn) loginBtn.style.display = "inline-block";
    
    // Ocultar el botón de "Cerrar sesión"
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) logoutButton.style.display = "none";

    // Redirigir a la página de inicio
    window.location.href = 'index.html';
}

window.addEventListener('load', function () {
    const bannerImage = document.getElementById('bannerImage');
    
    // Añadir clase "show-image" cuando la página se cargue
    bannerImage.classList.add('show-image');
});