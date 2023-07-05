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
    return await getRoom(id);
}

async function create(params) {

    if (await db.Room.findOne({ where: { ApartmentId: params.ApartmentId, type:params.type } })) {
        throw 'Room type"' + params.type + '" is already registered for this apartment';
    }

    const room = new db.Room(params);
    
    await room.save();
}

async function update(id, params) {
    const room = await getRoom(id);
    Object.assign(room, params);
    await room.save();
}

async function deleteRoom(id) {
    const room = await getRoom(id);
    await room.destroy();
}


async function getRoom(id) {
    const room = await db.Room.findByPk(id);
    if (!room) throw 'Room not found';
    return room;
}