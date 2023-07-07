const db = require('../helpers/db');
const roomService = require('../rooms/room_service')

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteApartment
};

async function getAll(res) {
    const result = await db.Apartment.findAll();
   
    return res.status(200).json(result);
}

async function getById(id, res) {
    const apartment = await db.Apartment.findByPk(id, { include: ["rooms"] });
    if (!apartment) {
        return res.status(404).send("Apartment does not exist.");
    }
    return res.status(200).json(apartment);
}

async function create(req, res) {

    if (await db.Apartment.findOne({ where: { address: req.body.address } })) {
        return res.status(409).send('Apartment address: "' + req.body.address + '" is already registered');
    }

    const newapartment = { "address": req.body.address, "area": req.body.area, "price": req.body.price, "image": req.file.buffer };
    const apartment = new db.Apartment(newapartment);


    await apartment.save();
    //console.log(apartment.id);
    // JSON.parse(req.body.rooms).forEach(element => {
    //     console.log(element.type);
    //     console.log(element.count);
    // });

    // JSON.parse(req.body.types).forEach(element => {
    //     console.log(element);
    // });
    // JSON.parse(req.body.counts).forEach(element => {
    //     console.log(element);
    // });



    if (req.body.types && req.body.counts) {
        const types = JSON.parse(req.body.types);
        const counts = JSON.parse(req.body.counts);
        for (i = 0; i < types.length; i++) {
            const newroom = { "ApartmentId": apartment.id, "type": types[i], "count": counts[i] };
            roomService.create(newroom);
        }
    }



    return res.status(200).send("Apartment successfully created. ID = " + apartment.id);

}

async function update(req, res) {
    const apartment = await db.Apartment.findByPk(req.params.id, { include: ["rooms"] });
    if (!apartment) {
        return res.status(404).send("Apartment does not exist.");
    }

    const RoomIds = [];
    apartment.rooms.forEach(element => {
        RoomIds.push(element.dataValues.id);
    });



    if (req.body.types && req.body.counts) {
        const types = JSON.parse(req.body.types);
        const counts = JSON.parse(req.body.counts);
        if (types.length != counts.length)    return res.status(400).send("Array sizes of types and counts do not match.");
    }

    if (req.file) {
        apartment.image = req.file.buffer;

    }


    Object.assign(apartment, req.body);
    await apartment.save();


    if (req.body.types && req.body.counts) {

        const types = JSON.parse(req.body.types);
        const counts = JSON.parse(req.body.counts);
        if (types.length > RoomIds.length) {
            for (i = 0; i < types.length; i++) {
                const room = { "ApartmentId": req.params.id, "type": types[i], "count": counts[i] };
                if (i < RoomIds.length) {
                    roomService.update(RoomIds[i], room);
                }
                else {
                    roomService.create(room,res);
                }

            }

        }
        else if (types.length < RoomIds.length) {
            for (i = 0; i < RoomIds.length; i++) {

                if (i < types.length) {
                    const room = { "ApartmentId": req.params.id, "type": types[i], "count": counts[i] };
                    roomService.update(RoomIds[i], room);
                }
                else {
                    roomService.delete(RoomIds[i]);
                }

            }

        }
        else {
            for (i = 0; i < RoomIds.length; i++) {
                const room = { "ApartmentId": req.params.id, "type": types[i], "count": counts[i] };
                roomService.update(RoomIds[i], room);
            }

        }

    }


    return res.status(200).send("Apartment successfully updated.");

}

async function deleteApartment(id, res) {
    const apartment = await db.Apartment.findByPk(id, { include: ["rooms"] });
    if (!apartment) {
        return res.status(404).send("Apartment does not exist.");
    }
    if (apartment.rooms) {
        apartment.rooms.forEach(element => {
            roomService.delete(element.dataValues.id);
        });

    }
    
    await apartment.destroy();
    return res.status(200).send("Apartment successfully deleted.");
}
