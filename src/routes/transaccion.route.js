const transaccionCtrl = require('./../../src/controllers/transaccion.controller');
const express = require('express');
const router = express.Router();

router.post('/', transaccionCtrl.createTransaccion);
router.get('/', transaccionCtrl.getTransacciones);
router.get('/:emailCliente', transaccionCtrl.getTransaccionesPorEmail);
router.get('/:idiomaOrigen/:idiomaDestino', transaccionCtrl.getTransaccionesPorIdioma);

module.exports = router;
