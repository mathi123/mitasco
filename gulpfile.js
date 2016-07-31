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

gulp.task('default', function (callback) {
    runSequence('build-server', 'build-client', callback);
});

/////////////////////////
// SERVER CONFIGURATION
/////////////////////////

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

gulp.task('build-server', function(callback){
  runSequence('clean-server', 'compile-server', 'copy-db-config', callback);
});

gulp.task('clean-server', function () {
  del([config[environment].buildDir], {force: true});
});

gulp.task('compile-server', function () {
  return gulp.src(['src/server/**/*.ts', 'typings/globals/pg-promise/*.d.ts',
          'typings/globals/body-parser/*.d.ts','typings/globals/express/*.d.ts',
          'typings/globals/express-serve-static-core/*.d.ts',
          'typings/globals/node/*.d.ts', 'typings/globals/serve-static/*.d.ts',
          'typings/globals/spex/*.d.ts', 'typings/globals/mime/*.d.ts',
          'typings/modules/pg/*.d.ts'
  ])
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

////////////////////////
// CLIENT CONFIGURATION
////////////////////////

gulp.task('build-client', function (callback) {
   runSequence('clean-client', 'copy-imwa', 'copy-rxjs', 'copy-libs', 'copy-angular-libs', 'copy-other', 'compile-client', callback);
});
gulp.task('clean-client', function (callback) {
    del([path.join(config[environment].buildDir, 'app')], {force: true});
    callback();
});
gulp.task('copy-angular-libs', function () {
    return gulp.src(['node_modules/@angular/**'])
        .pipe(gulp.dest(path.join(config[environment].buildDir, 'app', 'libs', 'angular2')));
});
gulp.task('copy-imwa', function () {
    return gulp.src(['node_modules/angular2-in-memory-web-api/**'])
        .pipe(gulp.dest(path.join(config[environment].buildDir, 'app', 'libs', 'angular2-in-memory-web-api')));
});
gulp.task('copy-rxjs', function () {
    return gulp.src(['node_modules/rxjs/**'])
        .pipe(gulp.dest(path.join(config[environment].buildDir, 'app', 'libs', 'rxjs')));
});
gulp.task('copy-libs', function () {
    return gulp.src(['node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'])
            .pipe(gulp.dest(path.join(config[environment].buildDir, 'app', 'libs')));
});
gulp.task('copy-other', function () {
   return gulp.src(['src/client/**/*.html', 'src/client/**/*.css', 'src/client/**/*.conf.js'])
       .pipe(gulp.dest(path.join(config[environment].buildDir, 'app')));
});
gulp.task('compile-client', function () {
    return gulp.src(['src/client/**/*.ts',
            'typings/globals/core-js/*.d.ts',
            'typings/globals/jasmine/*.d.ts',
            'typings/globals/node/*.d.ts'
    ])
        .pipe(development(ts({
            target: "ES5",
            module: "commonjs",
            sourceMap: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            removeComments: false,
            noImplicitAny: false,
            moduleResolution: "node"
        })))
        .pipe(gulp.dest(path.join(config[environment].buildDir, 'app')));
});


///////////////////////
/// TESTING
///////////////////////

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