# Paint in LEDs

Square grid of 256 LEDs individually controllable through web app. Paint on the web canvas and submit the drawing to be uploaded to the physical grid. Turn on grid syncing to paint in real-time with others, each update reflected both on the physical grid and on your web canvas.

LED grid soldered from scratch. LEDs states are managed by 4 MAX7219 display drivers and interfaced with internet via Particle Photon dev board. Web app written in Angular framework.

## Database initialization

- `docker-compose up -d db`

Create admin user
- `docker-compose exec db mongo admin`
- `> db.createUser({user: "prometheus", pwd: "<password>", roles: [{role: "userAdminAnyDatabase", db: "admin"}]})`

### Database Lock file

On sudden shutdown, a mongo lock file remains. Remove it to start instance:

- `sudo rm ~/db_volumes/paintinleds/mongod.lock` (or wherever the lock file exists)

## Environment Setup

Set environment variables required by docker-compose file, where `MONGO_INITDB_ROOT_PASSWORD` matches the password used in the admin creation step.

Ensure `PAINTINLEDS_MONGO_IMAGE` is set up accomodate the architecture of the running environment. (ex `andresvidal/rpi3-mongodb3` for arm64 arch)


## Particle Status

When Prometheus comes online/goes offline, Particle.io emits an event to the `/api/status` endpoint which registers the state and stores it for displaying of status in frontend.

## Development

Ensure above steps have been run first.

`docker-compose up --build app`

The API hosts the UI app. To develop UI, run `ng serve --host 0.0.0.0` and navigate to `localhost:4200`, or setup `ng` server to compile app to location served by API.

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

## Hosting Information

A running instance of this project is hosted at [paintinleds.com](http://paintinleds.com), registration managed by http://domain.com. Their DNS records can be updated to point to an IP address which serves the running instance.
