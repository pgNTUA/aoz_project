const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        type: { type: DataTypes.STRING, allowNull: false },
        count: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        defaultScope: {
            
        },
        scopes: {           
        },    tableName: 'room'
        
    };

    return sequelize.define('Room', attributes, options);
}