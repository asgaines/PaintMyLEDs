const express = require('express');
const conf = require('./config');
const database = require('./db');
const router = require('./router');

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

    router.init(app);
});
