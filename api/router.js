const express = require('express');
const path = require('path');
const distDir = path.resolve(__dirname, '../dist');
const handlers = require('./handlers');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = {
    init: function(app) {
        app.use(bodyParser.json());
        app.use(morgan('combined'));

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        app.use(express.static(distDir));

        app.get('/api/paintings', handlers.getPaintings);
        app.post('/api/paintings', handlers.postPainting);

        // Catch all remaining routes and redirect to index
        app.get('/*', (req, res) => {
            res.sendFile(distDir + '/index.html');
        });
    },
};
