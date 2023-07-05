const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        token: { type: DataTypes.STRING}
    };

    const options = {
        defaultScope: {
           
           
        },
        scopes: {
           
           
        },    tableName: 'user'
        
    };

    return sequelize.define('User', attributes, options);
}