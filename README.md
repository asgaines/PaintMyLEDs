# Paint in LEDs

## Database initialization

- `docker-compose up -d db`

Create admin user
- `docker-compose exec db mongo admin`
- `> db.createUser({user: "prometheus", pwd: "<password>", roles: [{role: "userAdminAnyDatabase", db: "admin"}]})`

## Environment Setup

Set environment variables required by docker-compose file, where `MONGO_INITDB_ROOT_PASSWORD` matches the password used in the admin creation step.

Ensure `PAINTINLEDS_MONGO_IMAGE` is set up accomodate the architecture of the running environment.

## Running app

Ensure above steps have been run first.

`docker-compose up --build app`

## Particle Status

When Prometheus comes online/goes offline, Particle.io emits an event to the `/api/status` endpoint which registers the state and stores it for displaying of status in frontend.

### Relevant for site admins

See https://console.particle.io/integrations/webhooks/5a0bae309a53a837bb7aab72 for integration configuration.

To simulate a call locally, run\
`curl -H 'Content-Type: application/json' -H 'Authorization: Basic <token>' -X PUT localhost:8080/api/status -d '{"data": "offline|online"}'`\
where the token is a base64 encoded join of username and password by colon (e.g. `username:password` => `dXNlcm5hbWU6cGFzc3dvcmQ=` <- token)


See [Particle documentation](https://docs.particle.io/reference/device-cloud/api/#special-events) for more information.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
