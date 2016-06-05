var gulp = require('gulp');
var fs = require('fs');

gulp.task('default', function() {
  console.info("Empty task");
});

gulp.task('db-dev', function () {
  console.info("Copy pgconf.json to bin folder");

  var database = JSON.parse(fs.readFileSync('database.json'));

  var data = {
    user: database.dev.user,
    password: database.dev.password,
    database: database.dev.database,
    host: database.dev.host
  };

  fs.writeFileSync('bin/pgconf.json', JSON.stringify(data));
  fs.writeFileSync('test/pgconf.json', JSON.stringify(data));

  console.info("done");
});

gulp.task('db-test', function () {
  console.info("Copy pgconf.json to bin folder");

  var database = JSON.parse(fs.readFileSync('database.json'));

  var data = {
    user: database.test.user,
    password: database.test.password,
    database: database.test.database,
    host: database.test.host
  };

  fs.writeFileSync('bin/pgconf.json', JSON.stringify(data));
  fs.writeFileSync('test/pgconf.json', JSON.stringify(data));

  console.info("done");
});