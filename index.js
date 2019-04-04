/* eslint-disable no-use-before-define */
/* eslint-disable radix */
/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const movies = require('./routes/movies');
const home = require('./routes/home');

const app = express();

app.use('/', home);
app.use('api/movies/', movies);
app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
