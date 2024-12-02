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
    document.getElementById('discapacidad').checked = false;
});