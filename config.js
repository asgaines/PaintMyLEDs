var config = {
  mongo: {
    uri: process.env.MONGODB_URI
  },
  particle: {
    accessToken: process.env.PARTICLE_ACCESS_TOKEN,
    deviceId: process.env.PARTICLE_DEVICE_ID,
  },
}

module.exports = config;
