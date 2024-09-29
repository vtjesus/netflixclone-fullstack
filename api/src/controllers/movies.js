const Movie = require("../models/Movie.js");

// CREATE MOVIE

const createMovie = async (req, res) => {
    if (req.user.isAdmin) {
    
        try{
            const newMovie = new Movie(req.body);
            const savedMovie = await newMovie.save();
            res.status(201).send(savedMovie)

        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("Permission denied")
    };
}

// UPDATE MOVIE

const updateMovie = async (req, res) => {
    if (req.user.isAdmin) {
    
        try{
            
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).send(updatedMovie)
            
        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("Permission denied")
    };
}

// DELETE MOVIE

const deleteMovie = async (req, res) => {
    if (req.user.isAdmin) {
    
        try{
            
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).send("Movie deleted successfully")
            
        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("Permission denied")
    }
}

// GET MOVIE

const getMovie = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("Movie not found");
        res.status(200).send(movie)
            
    } catch (err) {
        res.status(500).send(err);
    }
}

// GET MOVIES

const getMovies = async (req, res) => {
    if (req.user.isAdmin) {
        try{
            const movies = await Movie.find()
            res.status(200).send(movies)
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        return res.status(403).send("Permission denied");
    }  
}

// GET RANDOM MOVIE

const getRandomMovie = async (req, res) => {
    const type = req.query.type;
    let movie;

    try{
        if (type === "series") {
            movie = await Movie.aggregate([
                {
                    $match: {
                        isSeries: true
                    }
                }, {
                    $sample: {
                        size: 1
                    }
                }
            ]);
        } else {
            movie = await Movie.aggregate([
                {
                    $match: {
                        isSeries: false
                    }
                }, {
                    $sample: {
                        size: 1
                    }
                }
            ]);
        }

        res.status(200).send(movie)
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovie,
    getMovies,
    getRandomMovie
}