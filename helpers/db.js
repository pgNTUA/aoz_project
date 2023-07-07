const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    

    //const { host, port, user, password, database } = config.database;
    const host = process.env.HOST;
    const port = process.env.DB_PORT;
    const user = process.env.DB_USER;
    const password = process.env.PASSWORD;
    const database = process.env.DATABASE;
    
    const connection = await mysql.createConnection({ host, port, user, password });

    // create db if it doesn't already exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Room = require('../rooms/room_model')(sequelize);
    db.Apartment = require('../apartments/apartment_model')(sequelize);
    db.User = require('../users/user_model')(sequelize);

    //apartment-room relationship
    db.Apartment.hasMany(db.Room, { as: "rooms" });
    db.Room.belongsTo(db.Apartment, {
        foreignKey: "ApartmentId"
    });

    // sync all models with database
    await sequelize.sync();

    
}