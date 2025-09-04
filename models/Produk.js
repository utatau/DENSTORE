const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const Produk = sequelize.define('Produk', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'produk',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Produk;