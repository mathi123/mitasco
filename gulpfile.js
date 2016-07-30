var gulp = require('gulp'),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    del = require('del'),
    ts = require('gulp-typescript'),
    mocha = require('gulp-mocha'),
    environments = require('gulp-environments'),
    path = require('path');

// Configuration
var config = require('./gulp.config.js');

// Environments
var development = environments.development;
var production = environments.production;
var test = environments.make("test");

// Current environment
var environment = 'development';
if(test()){
  environment = 'test';
}else if(production()){
  environment = 'production';
}

gulp.task('copy-db-config', function () {
  console.info("Copy pgconf.json to bin folder");

  var database = JSON.parse(fs.readFileSync('database.json'));

  if(!production()){
    var data = {
      user: database[environment].user,
      password: database[environment].password,
      database: database[environment].database,
      host: database[environment].host
    };

    fs.writeFileSync(path.join(config[environment].buildDir,'/pgconf.json'), JSON.stringify(data));
  }
});

gulp.task('build', function(callback){
  runSequence('clean', 'compile', 'copy-db-config', callback);
});

gulp.task('clean', function () {
  del([config[environment].buildDir], {force: true});
});

gulp.task('compile', function () {
  return gulp.src(['src/server/**/*.ts', 'typings/**/*.d.ts'])
      .pipe(development(ts({
        target: "ES6",
        module: "commonjs",
        sourceMap: true
      })))
      .pipe(test(ts({
          target: "ES6",
          module: "commonjs",
          sourceMap: false
      })))
      .pipe(production(ts({
          target: "ES6",
          module: "commonjs",
          sourceMap: false
      })))
      .pipe(gulp.dest(config[environment].buildDir));
});

gulp.task('test', function (callback) {
    runSequence('copy-tests', 'run-tests', callback);
});

gulp.task('run-tests', function () {
    var executeTestPath = path.join(config[environment].buildDir, "test");
    
    return gulp.src(executeTestPath + '/**/*.test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('copy-tests', function(){
    var copyTestPath = path.join(config[environment].buildDir, "test");

    return gulp.src("test/**/*.test.js")
        .pipe(gulp.dest(copyTestPath));

});