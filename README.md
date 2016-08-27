# Mitasco [![Build Status](https://travis-ci.com/mathi123/mitasco.svg?token=higJw8z1ADo9Wsy5x1nX&branch=master)](https://travis-ci.com/mathi123/mitasco)

Mitasco project repository

## Quick start
### Requirements
- [node](https://nodejs.org/en/) & npm
- [typescript](http://www.typescriptlang.org/) compiler: npm install -g typescript@next
- typescript definition manager ([typings](https://github.com/typings/typings)): npm install -g typings
- [postgresql](https://www.postgresql.org/) database
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/): npm install -g db-migrate db-migrate-postgresql

### Setup
- git clone https://github.com/mathi123/mitasco
- npm install
- typings install

### Develop
Build all:

    gulp
Or to develop and build automatically: 

    gulp watch

### Test
- gulp test

### Run
- node bin/debug/server.js

## Mitasco application stack
### Overview
- database (postgresql)
- server (nodeJS with expressJS API)
- client (angular2)
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
- :exclamation: To switch from branch *dev-new-table* to *dev*, first perform a *db-migrate down* or *db-migrate reset*.
- Always provide seed data, so the test server can create the db from scratch.

### Server
The server runs on NodeJS. It provides a API to read/write data and a static folder to return client resources and static web pages.

- The source code for the server is under */src*, and is compiled with the typescript compiler to javascrit (ES6) in the */bin* folder.
- Data is read/written to the postgresql database using [*pg*](https://github.com/brianc/node-postgres) and [*pg-promise*](https://github.com/vitaly-t/pg-promise).
- Data is formatted into Data Transfer Objects (DTOs) before returned, the typescript definitions of these object are in *shared* folder.
- [ExpressJS](http://expressjs.com/) 4.x framework is used to receive requests and return values.
- Entrypoint is /bin/debug/server.js.

### Client
The client is build in Angular2 (HTML + CSS + javascript).
 
- Angular2 typescript code is compiled to javascript (ES5) with typescript compiler.
- Styling is defined with *sass* and compiled down to plain css

### Tasks
Build tasks are managed by [Gulp](https://github.com/gulpjs/gulp), and are defined in gulpfile.js and configuration.js. Following tasks are defined in Gulp:
- 'compile' typescript files to javascript for server and client
- copy other files to */bin* folder
- build production release
- build test release
- run tests

Gulp takes an '--env' argument for the environment:
- development
- test
- production

### Testing
- You can define tests in the folder */test*
- [Mocha](https://mochajs.org/#getting-started) and is used in combination with [Chai](http://chaijs.com/) for testing server code.

The application is deployed and tested on a CircleCI server on every push. The circle.yml file configures the build and test configuration.

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
- gulp-environments: allows gulp to user -e development/test/production flags
- mocha: unit testing framework to test server code
- mocha-circleci-reporter: used to report mocha test to 'test-results.xml', loaded by circleCI
- run-sequence: needed to run gulp tasks in sequence
- del: needed to delete files during gulp build
- gulp-typescript: needed to run typescript from gulp
- typescript: needed to compile server with typescrit 2.0 beta, and pass typescript lib to gulp-typescript.
- gulp-sass and sass: compiles sass to css

:exclamation: Only install packages with good reason, and document what they are for.

To install a package:

    npm install --save-dev package

To install a package for production environment:

    npm install --save package
 
Look for typings packages:

    typings search package

Install typing if you found it

    typings install --save [env/dt]~package [--global]

Add the new typing to the server/client typescript dependencies in *configuration.js*.

### Update production server
- stop application
- git pull
- gulp --env production
- db-migrate up
- start application