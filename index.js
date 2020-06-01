const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
let upload = multer();
let app = express();
const port = 2000;

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(upload.array());

// Require the router we defined in movie.js
let movies = require('./movies.js');
app.use('/movies', movies);

app.listen(process.env.PORT || port, function() {
    console.log(`server starts at http://localhost:${port}`);
});
