const express = require('express');
const router = express.Router();

let movies = [
    {
        id : 101,
        name : 'Fight Club',
        year: 1990, 
        rating: 9.8
    },
    {
        id: 102,
        name: 'Inception',
        year: 2010,
        rating: 8.8
    },
    {
        id: 103,
        name: 'The Dark Knight',
        year: 2008,
        rating: 9
    }, {
        id: 104,
        name: '12 Angry Man',
        year: 1957,
        rating: 8.9
    }
];

// to get all the movies 
router.get('/list-movies', function(req, res) {
    res.json(movies);
});

// to get specific movie
router.get('/:id([0-9]{3,})', function(req, res) {
    let currMovie = movies.filter(function(movie) {
        // console.log(movie.id);
        if(movie.id == req.params.id){
            return true;
        }
    });
    // console.log(req.params.id);
    // console.log(currMovie); 
    if(currMovie.length == 1){
        res.json(currMovie[0]);
        console.log(res.statusCode);
    }else{
        res.status(404);
        res.json({message : "Not Found"});
    }
})

// POST route save the data into the memory
router.post('/', function(req, res) {
    // check if all fields are provided and are valid
    if(!req.body.name || 
        !req.body.year.toString().match(/^[0-9]{4}$/g) 
        || !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)) {
            res.status(400);
            res.json({message : "Bad Request"});
    }else{
        let newId = movies[movies.length - 1].id + 1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: +req.body.year,
            rating: +req.body.rating
        });   
        res.json({message:"New Movies created", location: "/movies/" + newId});
    }
});

// PUT route 
router.put('/:id', function(req, res) {
  
    let updateIndex = -1;
    // console.log(typeof req.params.id);
    if(!req.body.name || 
        !req.body.year.toString().match(/^[0-9]{4}$/g) || 
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)){
            res.status(400);
            res.json({message : "Bad Request"});
    }else{
        updateIndex = movies.map(function(movie) {
            return movie.id
        }).indexOf(parseInt(req.params.id));
    }

    if(updateIndex === -1) {
        // if no existing movies not found then add new Movie
        movies.push({
            id : +req.params.id,
            name : req.body.name,
            year : +req.body.year,
            rating :+req.body.rating
        });
        res.json({message : "New Movie Created", location: "/movies/" + req.params.id});
    }else{
        // Update the existing Movie Content
        movies[updateIndex] = {
            id : +req.params.id,
            name: req.body.name,
            year: +req.body.year,
            rating: +req.body.rating
        };
        res.json({
            message : "Movie ID " + req.params.id + " Updated.",
            location : '/movies/' + req.params.id
        });
    }
});

// DELETE route
router.delete('/:id', function(req, res) {
    let removeIndex = movies.map(function(movie) {
        return movie.id;
    }).indexOf(parseInt(req.params.id));

    if(removeIndex === -1){
        res.status(400);
        res.json({
            message: "Bad Request! Movies Not Found in the List",
        });
    }else{
        movies.splice(removeIndex, 1);
        res.send({
            message: "Movie Id "+req.params.id+" Deleted From the List"
        });
    }
});


// export this router to use in index.js
module.exports = router;