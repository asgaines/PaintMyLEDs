let express = require('express');
let bodyParser = require('body-parser');
let mongodb = require('mongodb');
let ObjectID = mongodb.ObjectID;
let Particle = require('particle-api-js');
// Request logger
let morgan = require('morgan');

let particle = new Particle();

const collection = 'paintings';

let app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));

const distDir = __dirname + '/dist/';
app.use(express.static(distDir));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

let db;
const user = 'prometheus';
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const particleDeviceID = process.env.PARTICLE_DEVICE_ID;
const particleAccessToken = process.env.PARTICLE_ACCESS_TOKEN;
const mongodbUri = 'mongodb://' + user + ':' + password + '@db:27017/leds?authSource=admin';


mongodb.MongoClient.connect(mongodbUri, (err, client) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = client.db();
    console.log('DB connection ready');

    let server = app.listen(8080, '0.0.0.0', _ => {
        let port = server.address().port;
        console.log('App now running on port', port);
    });
});

let handleError = (res, reason, message, code) => {
    console.log('ERROR: ' + reason);
    res.status(code || 500).json({'error': message});
}

app.get('/api/paintings', (req, res) => {
    db.collection(collection).find({}).sort({createDate: -1}).toArray((err, docs) => {
        if (err) {
            handleError(res, err.message, 'Failed to get paintings');
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post('/api/paintings', (req, res) => {
    let painting = req.body.painting;
    painting.createDate = new Date();

    if (!painting.rows) {
        handleError(res, 'Invalid input', 'Must provide painting data', 400);
    } else {

        fnPr = particle.callFunction({
            deviceId: particleDeviceID,
            name: 'led-data',
            argument: painting.rows.join(','),
            auth: particleAccessToken,
        });
        fnPr.then(
            data => {
                if (data.body.connected && data.body.return_value) {
                    // Take picture
                }
                //res.json(data.body);
            },
            err => {
                console.error(err);
                res.json(err);
            }
        );

        if (req.body.save) {
            db.collection(collection).insertOne(painting, (err, doc) => {
                if (err) {
                    handleError(res, err.message, 'Failed to create new painting');
                } else {
                    res.status(201).json(doc.ops[0]);
                    console.log('saved it');
                }
            });
            return;
        }

        console.log('end block');
        res.status(201).json({success: true});
    }
});

// Catch all remaining routes and redirect to index
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});
