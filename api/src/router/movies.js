const { Router } = require('express');
const { createMovie, updateMovie, deleteMovie, getMovie, getMovies, getRandomMovie } = require("../controllers/movies.js");
const verifyJWT = require('../controllers/verifyJWT.js')

const router = Router();

router.post("/create", verifyJWT, createMovie);

router.put("/update/:id", verifyJWT, updateMovie);

router.delete("/delete/:id", verifyJWT, deleteMovie);

router.get("/movie/:id", getMovie);

router.get("/movies", getMovies);

router.get("/random", getRandomMovie)

module.exports = router;