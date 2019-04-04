/* eslint-disable radix */
const express = require('express');
const Joi = require('joi');

const router = express.Router();

const movies = [
    { id: 1, name: 'Fight Club' },
    { id: 2, name: 'Inception' },
    { id: 3, name: 'The Raid' },
];

function validateMovie(movie) {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(movie, schema);
}


router.get('/api/movies/', (req, res) => {
    res.status(200).send(movies);
});

router.get('/api/movie/:id', (req, res) => {
    // eslint-disable-next-line radix
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found');
    }
    return res.status(200).send(movie);
});

router.post('/api/movies/', (req, res) => {
    // eslint-disable-next-line no-use-before-define
    const { error } = validateMovie(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    if (!req.body.name || req.body.name.length < 5) {
        return res.status(400).send('No cool movie that I know of has less than 5 characters, can\'t convince me otherwise');
    }
    const movie = {
        id: movies.length + 1,
        name: req.body.name,
    };
    movies.push(movie);
    return res.status(201).send('Movie successfully added to Database');
});

router.put('/api/movie/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found');
    }
    const { error } = validateMovie(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    movie.name = req.body.name;
    return res.status(200).send(movie);
});

router.delete('/api/movie/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found');
    }
    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    return res.status(204).send('Movie deleted successfully');
});
module.exports = router;
