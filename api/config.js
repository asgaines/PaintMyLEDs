module.exports = {
    collection: 'paintings',
    db: {
        user: 'prometheus',
        password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    },
    particle: {
        deviceID: process.env.PARTICLE_DEVICE_ID,
        accessToken: process.env.PARTICLE_ACCESS_TOKEN,
    },
    port: 8080,
};

