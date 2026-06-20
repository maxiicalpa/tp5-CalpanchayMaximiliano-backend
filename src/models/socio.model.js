const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database.js');
const local = require('./local.model.js');
const socio = sequelize.define('socio', {
    // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    foto: { type: DataTypes.STRING, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false },
    numeroSocio: { type: DataTypes.INTEGER, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false },
    emailCliente: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'socios', // Nombre de la tabla en minúsculas y plural
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
});


socio.belongsTo(local, { foreignKey: 'localId', as: 'local' });

module.exports = socio;