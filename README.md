# Mitasco [![Build Status](https://travis-ci.com/mathi123/mitasco.svg?token=higJw8z1ADo9Wsy5x1nX&branch=master)](https://travis-ci.com/mathi123/mitasco)

Mitasco project repository

## Quick start
### Requirements
- node & npm
- typescript compiler: npm install -g typescript
- typescript definition manager (typings): npm install -g typings
- postgresql
- db-migrate: npm install -g db-migrate db-migrate-postgresql

### Setup
- git clone https://github.com/mathi123/mitasco
- npm install

### Develop
- tsc -w

### Test
- npm test

### Run
- gulp
- node bin/app.js

## Solution structure
### Overview
- database (postgresql)
- server (nodeJS/express)
- client (angular2 + bootstrap)
- tests (karma)

### Database
The database model is maintained in the solution dir */migrations*. Db-migrate is used to create and run database changes.

Different databases (dev, test, live) are defined in *database.json*. The default environment is *dev*.
By default, migrations are defined in an sql file in the folder */migrations/sqls*.

Create a new migration

    db-migrate add migrationName

Update the database to the latest database model

    db-migrate up
    
 

To switch from branch *dev-new-table* to *dev*, first perform a *db-migrate down* or *db-migrate reset*.

### Server application
The server runs on NodeJS.
- The api manages all data interaction
- The client

entrypoint is /bin/app.js

### Testing
Application is deployed and tested to a Travis server on every push.