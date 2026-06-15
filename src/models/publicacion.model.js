const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database.js');
const empleado = require('../models/empleado.model.js');

const publicacion = sequelize.define('publicacion', {
    // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo
    titulo: { type: DataTypes.STRING, allowNull: false },
    contenido: { type: DataTypes.STRING, allowNull: false },
    imagenAsociada: { type: DataTypes.TEXT, allowNull: true },
    fechaPublicacion: { type: DataTypes.STRING, allowNull: false },
    vigente: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
    tableName: 'publicaciones', // Nombre de la tabla en minúsculas y plural
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
});

empleado.hasMany(publicacion, { foreignKey: 'empleadoId', as: 'publicaciones' });
publicacion.belongsTo(empleado, { as: 'empleado' });

module.exports = publicacion;