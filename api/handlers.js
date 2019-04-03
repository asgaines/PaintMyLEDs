const db = require('./db');
const conf = require('./config');
const particle = require('./particle');
const rxjs = require('rxjs');
const operators = require('rxjs/operators');

module.exports = {
    getPaintings: (req, res) => {
        db.getConn().find({}).sort({createDate: -1}).toArray((err, docs) => {
            if (err) {
                console.error('Failed to get paintings:', err)
                res.status(500).json({error: err.message});
            } else {
                res.status(200).json(docs);
            }
        });
    },

    postPainting: (req, res) => {
        let painting = req.body.painting;

        if (!painting.rows) {
            console.error('Invalid input:', painting.rows);
            res.status(400).json({error: 'Invalid input. Please provide painting data'});
            return;
        }

        let particleStatus = -1;
        let databaseStatus = -1;

        let particleSubscription = particle.submit(painting.rows);

        let insertSubscription = rxjs.of(0);

        if (req.body.save) {
            painting.createDate = new Date();
            insertSubscription = rxjs.from(db.getConn().insertOne(painting));
        }

        if (insertSubscription !== false) {
            rxjs.forkJoin(
                particleSubscription.pipe(operators.catchError(error => {
                    particleStatus = 0;
                    return rxjs.of(error);
                })),
                insertSubscription.pipe(operators.catchError(error => {
                    databaseStatus = 0;
                    return rxjs.of(error);
                }))
            ).subscribe(
                ([particleResp, insertResp]) => {
                    if (particleStatus !== 0) {
                        particleStatus = particleResp.body.connected && particleResp.body.return_value >= 0 ? 1 : 0;
                    }

                    if (databaseStatus !== 0 && req.body.save) {
                        databaseStatus = 1;
                    }

                    let code = particleStatus !== 0 && databaseStatus !== 0 ? 201 : 500;

                    res.status(code).json({
                        upload: particleStatus,
                        save: databaseStatus,
                    });
                }
            );
        }
    },

    updateStatus: (req, res) => {
        conf.particle.online = req.body.connected;
        req.app.io.emit('status', {online: conf.particle.online});
        console.log(req.body);
        res.status(200).json({ok: true});
    }
};
