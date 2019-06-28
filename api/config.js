module.exports = {
    collection: 'paintings',
    db: {
        user: 'prometheus',
        password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    },
    particle: {
        deviceID: process.env.PARTICLE_DEVICE_ID,
        accessToken: process.env.PARTICLE_ACCESS_TOKEN,
        online: false,
        auth: {
            username: 'prometheus',
            password: process.env.PARTICLE_AUTH_PASSWORD,
        },
        // Holds the state of the painting for interactive more, updated with each change
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    port: 8080,
};

