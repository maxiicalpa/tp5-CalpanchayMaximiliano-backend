const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database.js');
const empleado = sequelize.define('empleado', {
    // Sequelize crea un campo 'id' autoincrementable automáticamente, no hace falta ponerlo
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'empleados', // Nombre de la tabla en minúsculas y plural
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
});
module.exports = empleado;