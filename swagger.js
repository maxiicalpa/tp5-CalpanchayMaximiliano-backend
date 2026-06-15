const publicacion = require('./src/models/publicacion.model');

const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'API de Agentes',
        description: 'Documentación de la API para la gestión de agentes.'
    },
    host: 'localhost:3000', // Reemplaza con la dirección de tu servidor
    basePath: "/",
    schemes: ['http', 'https'],
    tags: [
        {
            name: 'Socio',
            description: 'Operaciones relacionadas con los socios.'
        },
        {
            name: 'Transaccion',
            description: 'Operaciones relacionadas con las transacciones.'
        },
        {
            name: 'Empleado',
            description: 'Operaciones relacionadas con los empleados.'
        },
        {
            name: 'Publicacion',
            description: 'Operaciones relacionadas con las publicaciones.'
        }
    ],
    definitions: {
        Socio: {
            nombre: 'Juan',
            apellido: 'Pérez',
            foto: 'foto.jpg',
            dni: '12345678',
            numeroSocio: 12345
        },
        Transaccion: {
            idiomaOrigen: 'es',
            textoOrigen: 12345,
            idiomaDestino: 'en',
            textoDestino: 12345,
            fecha: '2022-01-01',
            emailCliente: '[EMAIL_ADDRESS]'
        },
        Empleado: {
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',
            email: 12345
        },
        publicacion: {
            titulo: 'Juan',
            contenido: 'Pérez',
            imagenAsociada: 'foto.jpg',
            fechaPublicacion: '2022-01-01',
            vigente: true,
            empleado: {
                nombre: 'Juan',
                apellido: 'Pérez',
                dni: '12345678',
                email: 12345
            }
        }
    }
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // verifica la ruta
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log(`Documentación generada en ${outputFile}`);
    //require('./index.js'); // verifica la ruta donde inicia tu app
});