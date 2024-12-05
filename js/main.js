// Verificar si el usuario está logueado al cargar la página
window.onload = function() {
    if (localStorage.getItem("isLoggedIn") === "true") {
        // Si el usuario está logueado, ocultar los botones de Crear Cuenta e Ingresar
        document.querySelector('.header-buttons').style.display = 'none';
    }
};

window.addEventListener('load', function () {
    const bannerImage = document.getElementById('bannerImage');
    
    // Añadir clase "show-image" cuando la página se cargue
    bannerImage.classList.add('show-image');
});