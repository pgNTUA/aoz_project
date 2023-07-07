const express = require('express');
const router = express.Router();
const roomService = require('./room_service')
const auth = require("middleware/authorize");

router.get('/', auth, getAllRooms);

router.get('/:id', auth, getRoomById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteroom);


function getAllRooms(req, res, next) {

    roomService.getAll()
        .then(rooms => res.json(rooms))
        .catch(next);

}

function getRoomById(req, res, next) {

    roomService.getById(req.params.id)
        .then(rooms => res.json(rooms))
        .catch(next);
}

function create(req, res, next) {
    roomService.create(req.body)
        .then(rooms => res.send(rooms))
        .catch(next);
}

function update(req, res, next) {

    roomService.update(req.params.id, req.body)
        .then(rooms => res.send(rooms))
        .catch(next);
}


function deleteroom(req, res, next) {

    roomService.delete(req.params.id)
        .then(rooms => res.send(rooms))
        .catch(next);
}


module.exports = router;