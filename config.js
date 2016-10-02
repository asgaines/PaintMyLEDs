var config = {
  mongo: {
    uri: process.env.MONGODB_URI
  },
  particle: {
    access_token: process.env.PARTICLE_ACCESS_TOKEN
  },
}

module.exports = config;
