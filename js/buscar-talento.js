// Obtener elementos del DOM
const areaSelect = document.getElementById('area');
const subareaSelect = document.getElementById('subarea');

// Función para actualizar las subáreas según el área seleccionada
function actualizarSubareas() {
    // Obtener el valor del área seleccionada
    const area = areaSelect.value;

    // Limpiar las subáreas previas
    subareaSelect.innerHTML = '<option value="todos">Selecciona una subárea</option>';

    // Si el usuario seleccionó un área, mostrar las subáreas correspondientes
    if (area !== 'todos' && areas[area]) {
        areas[area].forEach(function(subarea) {
            const option = document.createElement('option');
            option.value = subarea;
            option.textContent = subarea;
            subareaSelect.appendChild(option);
        });
    }
}

// Event listener para actualizar las subáreas cuando se selecciona un área
areaSelect.addEventListener('change', actualizarSubareas);

// Inicializar el filtro mostrando las subáreas si no hay un filtro activo
document.addEventListener('DOMContentLoaded', actualizarSubareas);

// Obtener elementos del DOM
const departamentoSelect = document.getElementById('departamento');
const distritoSelect = document.getElementById('distrito');

// Función para actualizar los distritos según el departamento
function actualizarDistritos() {
    // Obtener el valor del departamento seleccionado
    const departamento = departamentoSelect.value;

    // Limpiar los distritos previos
    distritoSelect.innerHTML = '<option value="todos">Selecciona un distrito</option>';

    // Si el usuario seleccionó un departamento, mostrar los distritos correspondientes
    if (departamento !== 'todos' && departamentos[departamento]) {
        departamentos[departamento].forEach(function(distrito) {
            const option = document.createElement('option');
            option.value = distrito;
            option.textContent = distrito;
            distritoSelect.appendChild(option);
        });
    }
    // Si seleccionó "Todo el país", mostrar todos los distritos
    else if (departamento === "Todo el país") {
        departamentos["Todo el país"].forEach(function(distrito) {
            const option = document.createElement('option');
            option.value = distrito;
            option.textContent = distrito;
            distritoSelect.appendChild(option);
        });
    }
}

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

    // Redirigir a la página de inicio (puedes cambiar el destino si es necesario)
    window.location.href = 'index.html';
}

// Event listener para actualizar los distritos cuando se selecciona un departamento
departamentoSelect.addEventListener('change', actualizarDistritos);

// Inicializar el filtro mostrando todos los distritos si no hay un filtro activo
document.addEventListener('DOMContentLoaded', actualizarDistritos);



document.getElementById('clear-filters').addEventListener('click', function() {
    // Restablecer todos los filtros
    document.getElementById('fecha-publicacion').value = 'todos';
    document.getElementById('area').value = 'todos';
    document.getElementById('subarea').value = 'todos';
    document.getElementById('departamento').value = 'todos';
    document.getElementById('distrito').value = 'todos';
    document.getElementById('modalidad').value = 'todos';
    document.getElementById('nivel-laboral').value = 'todos';
    document.getElementById('carga-horaria').value = 'todos';
});

// Función para abrir el modal con los detalles del trabajador
function openModal(name, position, description, location, date, email, phone) {
    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-position').innerText = position;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-location').innerText = 'Ubicación: ' + location;
    document.getElementById('modal-date').innerText = 'Publicado: ' + date;
    document.getElementById('modal-email').innerText = email;
    document.getElementById('modal-phone').innerText = phone;

    document.getElementById('hire-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que la página se recargue
    
        // Verificar si el usuario está logueado
        if (localStorage.getItem("isLoggedIn") === "true") {
            // El usuario está logueado, redirigir a la página de contratación
            window.location.href = "contactar.html"; // Redirige a la página de contratación
        } else {
            // El usuario no está logueado, redirigir a la página de inicio de sesión
            window.location.href = "ingresar.html"; // Redirige a la página de inicio de sesión
        }
    });
    
    document.getElementById('workerModal').classList.add('show');
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('workerModal').classList.remove('show');
}

// Obtener los elementos del DOM para los filtros
const clearFiltersButton = document.getElementById("clear-filters");
const areaFilter = document.getElementById("area");
const subareaFilter = document.getElementById("subarea");
const departamentoFilter = document.getElementById("departamento");
const distritoFilter = document.getElementById("distrito");
const fechaFilter = document.getElementById("fecha-publicacion");
const modalidadFilter = document.getElementById("modalidad");
const nivelFilter = document.getElementById("nivel-laboral");
const cargaHorariaFilter = document.getElementById("carga-horaria");
const searchInput = document.getElementById("search");  // Barra de búsqueda
const locationFilter = document.getElementById("location");  // Filtro de ubicación
const workerCards = document.querySelectorAll(".worker-card");

// Función para aplicar los filtros
function applyFilters() {
    const areaValue = areaFilter.value;
    const subareaValue = subareaFilter.value;
    const departamentoValue = departamentoFilter.value;
    const distritoValue = distritoFilter.value;
    const fechaValue = fechaFilter.value;
    const modalidadValue = modalidadFilter.value;
    const nivelValue = nivelFilter.value;
    const cargaHorariaValue = cargaHorariaFilter.value;
    const searchValue = searchInput.value.toLowerCase(); // Valor de búsqueda
    const locationValue = locationFilter.value.toLowerCase().trim();;  // Valor de ubicación

    workerCards.forEach(card => {
        const cardArea = card.getAttribute("data-area");
        const cardSubarea = card.getAttribute("data-subarea");
        const cardDepartamento = card.getAttribute("data-departamento");
        const cardDistrito = card.getAttribute("data-distrito");
        const cardFecha = card.getAttribute("data-fecha");
        const cardModalidad = card.getAttribute("data-modalidad");
        const cardNivel = card.getAttribute("data-nivel");
        const cardCargaHoraria = card.getAttribute("data-carga-horaria");
        const cardName = card.querySelector(".worker-name").textContent.toLowerCase();  // Nombre del trabajador
        const cardCareer = card.querySelector(".worker-position").textContent.toLowerCase();  // Carrera del trabajador
        // Obtener solo la parte relevante de la ubicación, eliminando el prefijo 'Ubicación: '
        const cardLocation = card.querySelector(".worker-location")
                                  .textContent.toLowerCase()
                                  .replace(/ubicación:\s*/i, '') // Eliminar 'Ubicación: ' (sin importar mayúsculas/minúsculas)
                                  .trim() // Eliminar cualquier espacio extra
                                  .replace(/\s+/g, '-')  // Reemplazar los espacios por guiones
                                  .toLowerCase();  // Convertir a minúsculas

        // Lógica de filtrado según todos los campos
        const matchesSearch = searchValue === "" || cardName.includes(searchValue) || cardCareer.includes(searchValue);
        const matchesLocation = locationValue === "todos" || cardLocation.includes(locationValue);
        const matchesArea = areaValue === "todos" || cardArea === areaValue;
        const matchesSubarea = subareaValue === "todos" || cardSubarea === subareaValue;
        const matchesDepartamento = departamentoValue === "todos" || cardDepartamento === departamentoValue;
        const matchesDistrito = distritoValue === "todos" || cardDistrito === distritoValue;
        const matchesFecha = fechaValue === "todos" || cardFecha === fechaValue;
        const matchesModalidad = modalidadValue === "todos" || cardModalidad === modalidadValue;
        const matchesNivel = nivelValue === "todos" || cardNivel === nivelValue;
        const matchesCargaHoraria = cargaHorariaValue === "todos" || cardCargaHoraria === cargaHorariaValue;

        // Mostrar la tarjeta si todos los filtros coinciden
        if (matchesSearch && matchesLocation && matchesArea && matchesSubarea && matchesDepartamento && matchesDistrito && matchesFecha && matchesModalidad && matchesNivel && matchesCargaHoraria) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Función para limpiar todos los filtros
function clearFilters() {
    // Restablecer todos los filtros a su valor predeterminado
    areaFilter.value = "todos";
    subareaFilter.value = "todos";
    departamentoFilter.value = "todos";
    distritoFilter.value = "todos";
    fechaFilter.value = "todos";
    modalidadFilter.value = "todos";
    nivelFilter.value = "todos";
    cargaHorariaFilter.value = "todos";
    searchInput.value = ""; // Limpiar barra de búsqueda
    locationFilter.value = "todos"; // Restablecer ubicación

    // Mostrar todas las tarjetas de trabajadores
    workerCards.forEach(card => {
        card.style.display = "block";
    });
}

// Event listener para el botón de borrar filtros
clearFiltersButton.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar que se recargue la página al hacer clic
    clearFilters(); // Limpiar los filtros y mostrar todas las tarjetas
});

// Event listeners para los filtros
areaFilter.addEventListener("change", applyFilters);
subareaFilter.addEventListener("change", applyFilters);
departamentoFilter.addEventListener("change", applyFilters);
distritoFilter.addEventListener("change", applyFilters);
fechaFilter.addEventListener("change", applyFilters);
modalidadFilter.addEventListener("change", applyFilters);
nivelFilter.addEventListener("change", applyFilters);
cargaHorariaFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);  // Evento para la barra de búsqueda
locationFilter.addEventListener("change", applyFilters);  // Evento para la ubicación

// Inicialización de los filtros al cargar la página
window.addEventListener("load", () => {
    applyFilters();   // Aplica los filtros al cargar la página
});

document.getElementById("hire-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar que la página se recargue

    // Verificar si el usuario está logueado
    if (localStorage.getItem("isLoggedIn") === "true") {
        // El usuario está logueado, redirigir a la página de contratación
        window.location.href = "contactar.html"; // Redirige a la página de contratación
    } else {
        // El usuario no está logueado, redirigir a la página de inicio de sesión
        window.location.href = "ingresar.html"; // Redirige a la página de inicio de sesión
    }
});