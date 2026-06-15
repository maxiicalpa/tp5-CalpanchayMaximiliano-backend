const socio = require('./../../src/models/socio.model');
const socioCtrl = {}

socioCtrl.createSocio = async (req, res) => {
    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Agregar un socio'
    #swagger.description = 'Agrega un socio a lista de socios.'
    #swagger.consumes = ['application/json']
    #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos del socio a agregar.',
    required: true,
    schema: { $ref: '#/definitions/Socio' }
    }
    #swagger.responses[200] = {
    description: 'Socio agregado correctamente.',
    schema: { $ref: '#/definitions/Socio' }
    }
    */
    try {
        await socio.create(req.body);
        res.json({ status: '1', msg: 'Socio agregado.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

socioCtrl.getSocios = async (req, res) => {
    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Obtener todos los socios'
    #swagger.description = 'Retorna una lista de todos los socios.'
    #swagger.responses[200] = {
    description: 'Lista de socios obtenida con éxito.',
    schema: { $ref: '#/definitions/Socio' }
    }
    */
    try {
        const socios = await socio.findAll();
        res.status(200).json(socios);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los socios.' });
    }
}
socioCtrl.deleteSocio = async (req, res) => {
    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Eliminar un socio'
    #swagger.description = 'Elimina un socio de la lista de socios.'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID del socio a eliminar.',
    required: true,
    type: 'integer'
    }
    #swagger.responses[200] = {
    description: 'Socio eliminado correctamente.',
    schema: { $ref: '#/definitions/Socio' }
    }
    */
    // eliminar un socio cambiando su estado por inactivo
    try {
        const borrarSocio = await socio.findByPk(req.params.id);
        if (borrarSocio) {
            borrarSocio.activo = false;
            await borrarSocio.save();
            res.json({ status: '1', msg: 'Socio eliminado.' });
        } else {
            res.status(404).json({ status: '0', msg: 'Socio no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

socioCtrl.editSocio = async (req, res) => {
    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Editar un socio'
    #swagger.description = 'Edita un socio de la lista de socios.'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID del socio a editar.',
    required: true,
    type: 'integer'
    }
    #swagger.responses[200] = {
    description: 'Socio editado correctamente.',
    schema: { $ref: '#/definitions/Socio' }
    }
    */
    try {
        await socio.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ status: '1', msg: 'Socio actualizado.' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }

}
socioCtrl.getActivos = async (req, res) => {
    /*
    #swagger.tags = ['Socio']
    #swagger.summary = 'Obtener todos los socios activos'
    #swagger.description = 'Retorna una lista de todos los socios activos.'
    #swagger.responses[200] = {
    description: 'Lista de socios activos obtenida con éxito.',
    schema: { $ref: '#/definitions/Socio' }
    }
    */
    try {
        const sociosActivos = await socio.findAll({
            where: { activo: true }
        });
        res.status(200).json(sociosActivos);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los socios.' });
    }


}

module.exports = socioCtrl;

