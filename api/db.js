let mongodb = require('mongodb');
let ObjectID = mongodb.ObjectID;
let conf = require('./config');

const mongodbUri = 'mongodb://' + conf.db.user + ':' + conf.db.password + '@db:27017/leds?authSource=admin';

let db;

module.exports = {
    connect: (callback) => {
        mongodb.MongoClient.connect(mongodbUri, (err, client) => {
            db = client.db().collection(conf.collection);
            callback(err);
        });
    },

    getConn: () => {
        if (!db) {
            console.error('db connection is not yet initialized');
            process.exit(1);
        }

        return db;
    },
};
