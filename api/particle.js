const rxjs = require('rxjs');
const Particle = require('particle-api-js');

const conf = require('./config');

const particle = new Particle();

module.exports = {
    initStatus: () => {
        rxjs.from(particle.getDevice({
            deviceId: conf.particle.deviceID,
            auth: conf.particle.accessToken,
        })).subscribe(
            data => {
                conf.particle.online = data.body.connected;
                console.log('Successfully initialized particle online status to', conf.particle.online);
            },
            err => {
                console.error('Particle API failed:', err);
                process.exit(1);
            });
    },

    submit: (data) => {
        return rxjs.from(particle.callFunction({
            deviceId: conf.particle.deviceID,
            name: 'led-data',
            argument: data.join(','),
            auth: conf.particle.accessToken,
        }));
    }
}
