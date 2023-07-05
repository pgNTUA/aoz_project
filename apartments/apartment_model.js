const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        address: { type: DataTypes.STRING, allowNull: false },
        area: { type: DataTypes.FLOAT, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        image:{type:DataTypes.BLOB('medium'),allowNull:false}
    };

    const options = {
        defaultScope: {           
        },
        scopes: {          
        },    tableName: 'apartment'
        
    };

    return sequelize.define('Apartment', attributes, options);
}