const express = require('express');
const socket = require('socket.io');

const conf = require('./config');
const database = require('./db');
const router = require('./router');
const particle = require('./particle');

const app = express();

database.connect(err => {
    if (err) {
        console.error('Failed connecting to DB', err);
        process.exit(1);
    }

    const server = app.listen(conf.port, '0.0.0.0', _ => {
        console.log('DB ready; app running on port', server.address().port);
    });

    particle.initStatus();

    app.io = socket.listen(server);

    app.io.sockets.on('connection', (socket) => {
        socket.on('status', (data) => {
            // Feed client the current state of the grid
            app.io.emit('status', {online: conf.particle.online});
        });

        socket.on('sync', (data) => {
            // Feed client the current painting on the grid
            app.io.emit('sync', {data: conf.particle.data});
        });

        socket.on('uploadStroke', (data) => {
            // Feed client the current painting on the grid
            conf.particle.data = data;
            app.io.emit('sync', {data: conf.particle.data});
        });
    });

    router.init(app);
});