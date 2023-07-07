const db = require('../helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete:deleteRoom
};

async function getAll() {
    return await db.Room.findAll();

}

async function getById(id) {
    const room = await db.Room.findByPk(id);
    if (!room) return "Room not found.";
    return room;
}

async function create(params) {

    if (await db.Room.findOne({ where: { ApartmentId: params.ApartmentId, type:params.type } })) {
        return 'Room type "' + params.type + '" is already registered';
    }

    const room = new db.Room(params);
    
    await room.save();
    return "Apartment successfully created. ID = " + room.id;
}

async function update(id, params) {
    const room = await db.Room.findByPk(id);
    if (!room) return "Room not found.";
    Object.assign(room, params);
    await room.save();
    return 'Room successfully updated.';
}

async function deleteRoom(id) {
    const room = await db.Room.findByPk(id);
    if (!room) {
        return "Room not found.";
    }
    await room.destroy();
    return 'Room successfully deleted.';
}
