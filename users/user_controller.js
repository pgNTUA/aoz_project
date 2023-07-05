const express = require('express');
const router = express.Router();
const userService = require('./user_service');



router.post('/register', register);
router.post('/login', login);




function register(req, res, next) {
    userService.register(req, res)
        .catch(next);
}

function login(req, res, next) {
    userService.login(req, res)
        .catch(next);
}


module.exports = router;