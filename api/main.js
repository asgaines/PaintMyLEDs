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

    let server = app.listen(conf.port, '0.0.0.0', _ => {
        let port = server.address().port;
        console.log('DB ready; app running on port', port);
    });

    particle.initStatus();

    app.io = socket.listen(server);

    app.io.sockets.on('connection', (socket) => {
        socket.on('status', (data) => {
            // When client connects, feed them the current state of the grid
            app.io.emit('status', {online: conf.particle.online});
        });
    });

    router.init(app);
});
