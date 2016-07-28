# Mitasco [![Build Status](https://travis-ci.com/mathi123/mitasco.svg?token=higJw8z1ADo9Wsy5x1nX&branch=master)](https://travis-ci.com/mathi123/mitasco)

Mitasco project repository

## Quick start
### Requirements
- [node](https://nodejs.org/en/) & npm
- [typescript](http://www.typescriptlang.org/) compiler: npm install -g typescript
- typescript definition manager ( [typings](https://github.com/typings/typings) ): npm install -g typings
- [postgresql](https://www.postgresql.org/) database
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) : npm install -g db-migrate db-migrate-postgresql

### Setup
- git clone https://github.com/mathi123/mitasco
- npm install
- typings install

### Develop
- tsc -w

### Test
- npm test

### Run
- gulp
- node bin/app.js

## Mitasco application stack
### Overview
- database (postgresql)
- server (nodeJS/express)
- client (angular2 + bootstrap)
- tests

### Database
The database model is maintained in the solution dir */migrations*. Db-migrate is used to create and run database changes.

Different databases (dev, test, live) are defined in *database.json*. The default environment is *dev*.
By default, migrations are defined in an sql file in the folder */migrations/sqls*.

Create a dev database, if you don't have it:

    db-migrate db:create pg-mitasco

Or drop it:

    db-migrate db:drop pg-mitasco

Create a new migration:

    db-migrate create migrationName

Update the database to the latest database model:

    db-migrate up
    
 Downgrade the last migration:
 
    db-migrate down
 
Remove all migrations:

    db-migrate reset

Note:
- db-migrate creates a table *migrations* in the database.
- To switch from branch *dev-new-table* to *dev*, first perform a *db-migrate down* or *db-migrate reset*.
- Always provide seed data, so the test server can create the db from scratch.

### Server
The server runs on NodeJS. It provides a API to read/write data and a static folder to return client resources and static web pages.

- The source code for the server is under */src*, and is compiled with the typescript compiler to the */bin* folder.
- Data is read/written to the postgresql database using [*pg*](https://github.com/brianc/node-postgres).
- Data is formatted into Data Transfer Objects (DTOs) before returned.
- [ExpressJS](http://expressjs.com/) framework is used to receive requests and return values.
- Entrypoint is /bin/app.js.

### Building
Application code is compiled from typescript to JS (src -> bin) using typescript compiler. 
Other build tasks are managed by [Gulp](https://github.com/gulpjs/gulp) :
- copy other files to */bin* folder
- create production release

### Testing
- You can define tests in the folder */test*
- [Mocha](https://mochajs.org/#getting-started) and is used in combination with [Chai](http://chaijs.com/) for testing server code.

Application is deployed and tested to a Travis server on every push. The .travis.yml file configures the travis build and test configuration.

### package.json
The *package.json* file defines the dependencies needed by this project. Some dependencies are needed for development/testing only.

Production packages:
- express: server framework
- pg: js library to read/write to postgresql database
- request: needed by express
- body-parser: needed by express. This parses the post body of a request.

Development packages:
- chai: Behaviour driving test assertions
- gulp: used for build configuration
- istanbul: library to determine coverage of testing code
- mocha: unit testing framework to test server code
- typings: used to get typescript definitions of existing libraries like express and pg.
- run-sequence: needed to run gulp tasks in sequence
- del: needed to delete files during build

To install a package, type:

    npm install --saveDev package
    
Only install packages with good reason, and document what they are for.