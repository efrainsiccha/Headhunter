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

// Este código se ejecuta cuando la página de contacto se carga
window.onload = function() {
    const userEmail = localStorage.getItem('userEmail');  // Obtener el correo de la empresa
    const companyName = localStorage.getItem('companyName');  // Obtener el nombre de la empresa

    const workerName = localStorage.getItem('workerName');  // Obtener el nombre del trabajador
    const workerEmail = localStorage.getItem('workerEmail');  // Obtener el correo del trabajador

    // Autocompletar el formulario con los datos de la empresa
    if (userEmail) {
        document.getElementById('company-email').value = userEmail;
    }

    if (companyName) {
        document.getElementById('company-name').value = companyName;
    }

    // Autocompletar el formulario con los datos del trabajador
    if (workerName) {
        document.getElementById('worker-name').value = workerName;
    }

    if (workerEmail) {
        document.getElementById('worker-email').value = workerEmail;
    }
};

// Asegúrate de inicializar EmailJS con tu USER ID (esto ya lo hicimos en el HTML)
emailjs.init('0pmBABdc9geaqeL99');  // Reemplaza "oBDygHCIJ5TXNAhob" con tu User ID de EmailJS

// Captura el formulario y el evento de envío
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de forma predeterminada
    
    // Toma los valores del formulario
    var formData = {
        company_email: document.getElementById('company-email').value,
        company_name: document.getElementById('company-name').value,
        worker_email: document.getElementById('worker-email').value,
        worker_name: document.getElementById('worker-name').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value,
        // Aquí agregamos el campo reply_to con el correo de la empresa
        reply_to: document.getElementById('company-email').value  // Utilizamos el correo de la empresa como Reply-To
    };

    // Usa emailjs.send para enviar el correo con el template y el service ID
    emailjs.send('service_9j3kaeo', 'template_4oqfz66', formData)
        .then(function(response) {
            console.log("Correo enviado exitosamente", response);
            
            // Mostrar mensaje de éxito en el contenedor
            var messageContainer = document.getElementById('message-container');
            messageContainer.style.display = 'block';  // Muestra el contenedor
            messageContainer.style.backgroundColor = '#28a745';  // Fondo verde (éxito)
            messageContainer.style.color = 'white';  // Color de texto blanco
            messageContainer.innerHTML = "¡Correo enviado exitosamente!";  // Mensaje de éxito
            
            // Limpiar los campos "Asunto" y "Descripción" después de enviar el correo
            document.getElementById('subject').value = '';
            document.getElementById('description').value = '';

            // Ocultar el mensaje después de 1 segundo
            setTimeout(function() {
                messageContainer.style.display = 'none';
            }, 1000);  // 1000 milisegundos = 1 segundo
        }, function(error) {
            console.error("Error al enviar correo", error);
            
            // Mostrar mensaje de error en el contenedor
            var messageContainer = document.getElementById('message-container');
            messageContainer.style.display = 'block';  // Muestra el contenedor
            messageContainer.style.backgroundColor = '#dc3545';  // Fondo rojo (error)
            messageContainer.style.color = 'white';  // Color de texto blanco
            messageContainer.innerHTML = "Hubo un error al enviar el correo. Intenta nuevamente.";  // Mensaje de error

            // Ocultar el mensaje después de 1 segundo
            setTimeout(function() {
                messageContainer.style.display = 'none';
            }, 1000);  // 1000 milisegundos = 1 segundo
        });
});