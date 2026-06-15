const empleado = require('./../models/empleado.model');
const empleadoCtrl = {};

empleadoCtrl.createEmpleado = async (req, res) => {
    /*
    #swagger.tags = ['Empleado']
    #swagger.summary = 'Agregar un empleado'
    #swagger.description = 'Agrega un empleado a lista de empleados.'
    #swagger.consumes = ['application/json']
    #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos del empleado a agregar.',
    required: true,
    schema: { $ref: '#/definitions/Empleado' }
    }
    #swagger.responses[200] = {
    description: 'Empleado agregado correctamente.',
    schema: { $ref: '#/definitions/Empleado' }
    }
    */
    try {
        await empleado.create(req.body);
        res.json({ status: '1', msg: 'Empleado agregado.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

empleadoCtrl.getEmpleados = async (req, res) => {
    /*
    #swagger.tags = ['Empleado']
    #swagger.summary = 'Obtener todos los empleados'
    #swagger.description = 'Retorna una lista de todos los empleados.'
    #swagger.responses[200] = {
    description: 'Lista de empleados obtenida con éxito.',
    schema: { $ref: '#/definitions/Empleado' }
    }
    */
    try {
        const empleados = await empleado.findAll();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los empleados.' });
    }
}

empleadoCtrl.getEmpleado = async (req, res) => {
    /*
    #swagger.tags = ['Empleado']
    #swagger.summary = 'Obtener un empleado'
    #swagger.description = 'Retorna un empleado por su ID.'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID del empleado a obtener.',
    required: true,
    type: 'integer'
    }
    #swagger.responses[200] = {
    description: 'Empleado obtenido con éxito.',
    schema: { $ref: '#/definitions/Empleado' }
    }
    */
    try {
        const empleado = await empleado.findByPk(req.params.id);
        if (empleado) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ status: '0', msg: 'Empleado no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los empleados.' });
    }
}

module.exports = empleadoCtrl;
