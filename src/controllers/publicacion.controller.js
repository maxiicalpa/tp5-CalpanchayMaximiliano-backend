const { Op } = require('sequelize');
const publicacion = require('../models/publicacion.model');
const publicacionCtrl = {};
const empleado = require('../models/empleado.model');

publicacionCtrl.createPublicacion = async (req, res) => {
    /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Agregar una publicacion'
    #swagger.description = 'Agrega una publicacion a lista de publicaciones.'
    #swagger.consumes = ['application/json']
    #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos de la publicacion a agregar.',
    required: true,
    schema: { $ref: '#/definitions/Publicacion' }
    }
    #swagger.responses[200] = {
    description: 'Publicacion agregada correctamente.',
    schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        const data = req.body;
        if (data.empleado && data.empleado.id) {
            data.empleadoId = data.empleado.id;
        }
        await publicacion.create(data);
        res.json({ status: '1', msg: 'Publicacion agregada.' });

    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

publicacionCtrl.getPublicaciones = async (req, res) => {
    /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Obtener todas las publicaciones'
    #swagger.description = 'Retorna una lista de todas las publicaciones.'
    #swagger.responses[200] = {
    description: 'Lista de publicaciones obtenida con éxito.',
    schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        const publicaciones = await publicacion.findAll(
            {
                include: [{
                    model: empleado,
                    as: 'empleado',
                }]
            }
        );
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las publicaciones.' });
    }
}
publicacionCtrl.deletePublicacion = async (req, res) => {
    /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Eliminar una publicacion'
    #swagger.description = 'Elimina una publicacion de la lista de publicaciones.'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID de la publicacion a eliminar.',
    required: true,
    type: 'integer'
    }
    #swagger.responses[200] = {
    description: 'Publicacion eliminada correctamente.',
    schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        const borrarPublicacion = await publicacion.findByPk(req.params.id);
        if (borrarPublicacion) {
            borrarPublicacion.vigente = false;
            await borrarPublicacion.save();
            res.json({ status: '1', msg: 'Publicacion eliminada.' });
        } else {
            res.status(404).json({ status: '0', msg: 'Publicacion no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}
publicacionCtrl.editPublicacion = async (req, res) => {
    /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Editar una publicacion'
    #swagger.description = 'Edita una publicacion de la lista de publicaciones.'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID de la publicacion a editar.',
    required: true,
    type: 'integer'
    }
    #swagger.responses[200] = {
    description: 'Publicacion editada correctamente.',
    schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        const data = req.body;
        const editarPublicacion = await publicacion.findByPk(req.params.id);
        if (editarPublicacion) {
            if (data.empleado && data.empleado.id) {
                data.empleadoId = data.empleado.id;
            }
            await editarPublicacion.update(data);
            res.json({ status: '1', msg: 'Publicacion editada.' });
        } else {
            res.status(404).json({ status: '0', msg: 'Publicacion no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error procesando operacion.' });
    }
}

publicacionCtrl.obtenerPublicacionesFiltradas = async (req, res) => {
    /*
    #swagger.tags = ['Publicacion']
    #swagger.summary = 'Obtener todas las publicaciones filtradas'
    #swagger.description = 'Retorna una lista de todas las publicaciones filtradas por título y vigencia.'
    #swagger.parameters['titulo'] = {
    in: 'query',
    description: 'Título de la publicación a buscar.',
    required: false,
    type: 'string'
    }
    #swagger.parameters['vigente'] = {
    in: 'query',
    description: 'Vigencia de la publicación.',
    required: false,
    type: 'boolean'
    }
    #swagger.responses[200] = {
    description: 'Lista de publicaciones obtenida con éxito.',
    schema: { $ref: '#/definitions/Publicacion' }
    }
    */
    try {
        const tituloFiltro = req.body.titulo;
        const vigenteFiltro = req.body.vigente;
        const publicaciones = await publicacion.findAll({
            where: {
                titulo: {
                    [Op.iLike]: `%${tituloFiltro}%`
                },
                vigente: vigenteFiltro
            },
            include: [{
                model: empleado,
                as: 'empleado',
            }]
        });
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener las publicaciones.' });
    }
}
module.exports = publicacionCtrl;