const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { title: 'Node-Vivly', message: 'Hello' });
});

module.export = router;
