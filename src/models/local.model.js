const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database.js');
const local = sequelize.define('local', {
    numeroLocal: { type: DataTypes.STRING, allowNull: false },
    superficie: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
    tableName: 'locales',
    timestamps: true,
});
module.exports = local;