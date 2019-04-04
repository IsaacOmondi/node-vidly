/* eslint-disable no-use-before-define */
/* eslint-disable radix */
/* eslint-disable no-console */
require('dotenv').config();

const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());

const movies = [
    { id: 1, name: 'Fight Club' },
    { id: 2, name: 'Inception' },
    { id: 3, name: 'The Raid' },
];

app.get('/api/movies/', (req, res) => {
    res.status(200).send(movies);
});

app.get('/api/movie/:id', (req, res) => {
    // eslint-disable-next-line radix
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found');
    }
    return res.status(200).send(movie);
});

app.post('/api/movies/', (req, res) => {
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

app.put('/api/movie/:id', (req, res) => {
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

app.delete('/api/movie/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found');
    }
    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    return res.status(204).send('Movie deleted successfully');
});

function validateMovie(movie) {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(movie, schema);
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
