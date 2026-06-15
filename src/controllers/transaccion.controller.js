const transaccion = require('../models/transaccion.model');
const transaccionCtrl = {};

transaccionCtrl.createTransaccion = async (req, res) => {
    /*
    #swagger.tags = ['Transaccion']
    #swagger.summary = 'Agregar una transaccion'
    #swagger.description = 'Agrega una transaccion a lista de transacciones.'
    #swagger.consumes = ['application/json']
    #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos de la transaccion a agregar.',
    required: true,
    schema: { $ref: '#/definitions/Transaccion' }
    }
    #swagger.responses[200] = {
    description: 'Transaccion agregada correctamente.',
    schema: { $ref: '#/definitions/Transaccion' }
    }
    */
    try {
        await transaccion.create(req.body);
        res.json({ status: '1', msg: 'Transaccion agregada.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

transaccionCtrl.getTransacciones = async (req, res) => {
    /*
    #swagger.tags = ['Transaccion']
    #swagger.summary = 'Obtener todas las transacciones'
    #swagger.description = 'Retorna una lista de todas las transacciones.'
    #swagger.responses[200] = {
    description: 'Lista de transacciones obtenida con éxito.',
    schema: { $ref: '#/definitions/Transaccion' }
    }
    */
    try {
        const transacciones = await transaccion.findAll();
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las transacciones.' });
    }
}

transaccionCtrl.getTransaccionesPorEmail = async (req, res) => {
    /*
    #swagger.tags = ['Transaccion']
    #swagger.summary = 'Obtener todas las transacciones'
    #swagger.description = 'Retorna una lista de todas las transacciones.'
    #swagger.responses[200] = {
    description: 'Lista de transacciones obtenida con éxito.',
    schema: { $ref: '#/definitions/Transaccion' }
    }
    */
    try {
        const transacciones = await transaccion.findAll({
            where: { emailCliente: req.params.emailCliente }
        });
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las transacciones.' });
    }
}

transaccionCtrl.getTransaccionesPorIdioma = async (req, res) => {
    /*
    #swagger.tags = ['Transaccion']
    #swagger.summary = 'Obtener todas las transacciones'
    #swagger.description = 'Retorna una lista de todas las transacciones.'
    #swagger.responses[200] = {
    description: 'Lista de transacciones obtenida con éxito.',
    schema: { $ref: '#/definitions/Transaccion' }
    }
    */
    try {
        const transacciones = await transaccion.findAll({
            where: { idiomaOrigen: req.params.idiomaOrigen, idiomaDestino: req.params.idiomaDestino }
        });
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las transacciones.' });
    }
}

module.exports = transaccionCtrl;