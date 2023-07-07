require('rootpath')();
require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('middleware/error-handler');
const mysql = require('mysql')
const multer = require('multer')


const upload = multer();





app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


// routes
app.use('/users',require('./users/user_controller'));
app.use('/rooms', require('./rooms/room_controller'));
app.use('/apartments', require('./apartments/apartment_controller'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form.html");
  });

  app.post('/form', upload.any(), function(req,res){
    console.log('Received files from client: ', req.files);
    console.log('Received form data from client: ', req.body);

    
    res.json( { "status": "ok" } );
})


// global error handler
app.use(errorHandler);


// Database connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

// start server

const port = process.env.NODE_ENV === 'production' ? (process.env.API_PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));