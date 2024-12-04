// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Importar las dependencias necesarias
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// Crear una instancia de Express
const app = express();
const port = 3000;

// Habilitar CORS para todas las rutas
app.use(cors({
    origin: 'http://127.0.0.1:5500'  // Cambiar si es necesario
}));

// Configurar el body parser para manejar solicitudes POST
app.use(express.json()); // Permite que Express maneje los cuerpos JSON

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Número máximo de conexiones simultáneas
  queueLimit: 0,  // No hay límite en la cola de conexiones
  connectTimeout: 500000 // Timeout de 30 segundos
});

// Verificar la conexión inicial (puedes quitar esto una vez confirmes que funciona)
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error en la conexión con la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa con el pool de conexiones');
  connection.release(); // Libera la conexión después de usarla
});

// Ruta para crear una nueva cuenta
app.post('/api/crear-cuenta', (req, res) => {
  const { 
    companyName, businessName, taxCondition, document, companyPhone, postalCode, industry, employeeCount,
    firstName, lastName, email, password 
  } = req.body;

  // Inserta los datos de la empresa en la tabla 'empresas'
  const empresaQuery = `
    INSERT INTO empresas (company_name, business_name, tax_condition, document, company_phone, postal_code, industry, employee_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  pool.query(empresaQuery, [companyName, businessName, taxCondition, document, companyPhone, postalCode, industry, employeeCount], (err, result) => {
    if (err) {
      console.error('Error al insertar empresa:', err);
      return res.status(500).send('Error al crear la cuenta');
    }

    // Obtenemos el id de la empresa recién insertada
    const companyId = result.insertId;

    // Ahora insertamos los datos del usuario en la tabla 'usuarios' con el company_id
    const usuarioQuery = `
      INSERT INTO usuarios (first_name, last_name, email, password, company_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    pool.query(usuarioQuery, [firstName, lastName, email, password, companyId], (err, result) => {
      if (err) {
        console.error('Error al insertar usuario:', err);
        return res.status(500).send('Error al crear la cuenta');
      }

      res.status(201).json({ message: 'Cuenta creada con éxito' });
    });
  });
});

// Ruta para la autenticación de inicio de sesión (validar credenciales)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Consultar si el email y la contraseña coinciden en la base de datos
  const query = `
    SELECT usuarios.*, empresas.company_name
    FROM usuarios 
    JOIN empresas ON usuarios.company_id = empresas.id 
    WHERE usuarios.email = ? AND usuarios.password = ?;
  `;

  pool.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).send('Error al verificar las credenciales');
    }

    if (results.length > 0) {
      // Si se encuentran coincidencias, el inicio de sesión es exitoso
      const user = results[0]; // Usuario y empresa

      // Enviar los datos de la empresa junto con el mensaje de inicio de sesión exitoso
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        userEmail: user.email,   // Correo del usuario (empresa) en la tabla usuarios
        companyName: user.company_name  // Nombre de la empresa desde la tabla empresas
      });
    } else {
      // Si no se encuentra el usuario o las credenciales son incorrectas
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de Node.js corriendo en http://localhost:${port}`);
});