/* eslint-disable no-use-before-define */


/* eslint-disable radix */
/* eslint-disable no-console */
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const movies = require('./routes/movies');
const home = require('./routes/home');
const authentication = require('./logger');

const app = express();

app.use((req, res, next) => {
    console.log('Logging...');
    next();
});
app.use(authentication);
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use('/', home);
app.use('/api/movies/', movies);
app.use(express.json());
app.use(express.static('public'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
