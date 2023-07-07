const express = require('express');
const router = express.Router();
const apartmentService = require('./apartment_service')
const multer = require('multer')
const upload = multer();
const auth = require("middleware/authorize");


router.get('/', auth, getAllApartments);
router.get('/:id', auth, getApartmentById);
router.post('/',  upload.single('image'), auth, create);
router.put('/:id',   upload.single('image'), auth, update);
router.delete('/:id',  auth, deleteapartment);


function getAllApartments(req, res, next) {

    apartmentService.getAll(res)
        .catch(next);   
}

function getApartmentById(req, res, next) {
    
    apartmentService.getById(req.params.id, res)
        .catch(next);
}


function create(req, res, next) {
    apartmentService.create(req,res)
        .catch(next);
}

function update(req, res, next) {

    apartmentService.update(req,res)
    .catch(next);
}


function deleteapartment(req, res, next) {
   
    apartmentService.delete(req.params.id,res)
        .catch(next);
}


module.exports = router;