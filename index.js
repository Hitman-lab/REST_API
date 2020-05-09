const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
let upload = multer();
let app = express();

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(upload.array());

// Require the router we defined in movie.js
let movies = require('./movies.js');
app.use('/movies', movies);

app.listen(2000, function() {
    console.log('Server starts at 2000');
});
