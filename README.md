# Paint in LEDs

## Database initialization

- `docker-compose up -d db`

Create admin password
- `> db.createUser({user: "prometheus", pwd: "<password>", roles: [{role: "userAdminAnyDatabase", db: "admin"}]})`

Expose `MONGO_INITDB_ROOT_PASSWORD` to the environment for the docker build to pick up, matching the password in the user creation.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
