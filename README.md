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

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
