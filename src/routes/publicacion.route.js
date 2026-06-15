const publicacionCtrl = require('../controllers/publicacion.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

router.post('/', publicacionCtrl.createPublicacion);
router.get('/', publicacionCtrl.getPublicaciones);
router.delete('/:id', publicacionCtrl.deletePublicacion);
router.put('/:id', publicacionCtrl.editPublicacion);
router.post('/filtrar', publicacionCtrl.obtenerPublicacionesFiltradas);
module.exports = router;