const empleadoCtrl = require('./../../src/controllers/empleado.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.post('/', empleadoCtrl.createEmpleado);
router.get('/', empleadoCtrl.getEmpleados);
router.get('/:id', empleadoCtrl.getEmpleado);

module.exports = router;