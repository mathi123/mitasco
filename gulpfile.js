var gulp = require('gulp'),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    del = require('del'),
    ts = require('gulp-typescript'),
    mocha = require('gulp-mocha'),
    environments = require('gulp-environments'),
    path = require('path'),
    config = require('./configuration.js');

/////////////////////////
// GENERAL CONFIGURATION
/////////////////////////

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

gulp.task('watch', ['default'], function (cb) {
    var other_client_files = config.src_files.client.non_scripts;
    other_client_files.push(config.src_files.client.js);

    gulp.watch([config.src_files.server.ts], ['compile-server']);
    gulp.watch([config.src_files.server.shared], ['copy-shared-files']);
    gulp.watch([config.src_files.client.ts], ['compile-client']);
    gulp.watch(other_client_files, ['copy-other']);
    gulp.watch(config.src_files.server.tests, ['test-server']);
});

gulp.task('test', function (callback) {
    runSequence('test-server', callback);
});

/////////////////////////
// SERVER CONFIGURATION
/////////////////////////

gulp.task('copy-db-config', function () {
  console.info("Copy pgconf.json to build folder");

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
  var files =[config[environment].buildDir+'/**/*',
      '!'+config[environment].buildDir+'/app',
      '!'+config[environment].buildDir+'/app/**/*'];
    return del(files, {force: true});
});

gulp.task('compile-server', function () {
    var files = config.server.ts_dependencies;
    files.push(config.src_files.server.ts);

    var tsConfig = config.server.ts_configuration;
    tsConfig.sourceMap = development();
    tsConfig.removeComments = !development();
    tsConfig.typescript = require('typescript');

    return gulp.src(files)
        .pipe(ts(tsConfig))
        .pipe(gulp.dest(config[environment].buildDir));
});

gulp.task('test-server', function (callback) {
    console.log("testing server");
    runSequence('copy-server-tests', 'run-server-tests', callback);
});

gulp.task('copy-server-tests', function(){
    var copyTestPath = path.join(config[environment].buildDir, "test");

    return gulp.src(config.server.path_tests)
        .pipe(gulp.dest(copyTestPath));
});

gulp.task('run-server-tests', function () {
    var executeTestPath = path.join(config[environment].buildDir, "test");

    return gulp.src(executeTestPath + '/**/*.test.js', {read: false})
        .pipe(mocha({reporter: 'mocha-circleci-reporter'}));
});

////////////////////////
// CLIENT CONFIGURATION
////////////////////////

gulp.task('build-client', function (callback) {
   runSequence('clean-client', 'copy-imwa', 'copy-rxjs', 'copy-libs', 'copy-shared-files', 'copy-angular-libs', 'copy-other', 'compile-client', callback);
});
gulp.task('clean-client', function () {
    return del([path.join(config[environment].buildDir, 'app')], {force: true});
});
gulp.task('copy-angular-libs', function () {
    return gulp.src(['node_modules/@angular/**'])
        .pipe(gulp.dest(path.join(config[environment].buildDirClient, 'libs', 'angular2')));
});
gulp.task('copy-imwa', function () {
    return gulp.src(['node_modules/angular2-in-memory-web-api/**/*.js'])
        .pipe(gulp.dest(path.join(config[environment].buildDirClient, 'libs', 'angular2-in-memory-web-api')));
});
gulp.task('copy-rxjs', function () {
    return gulp.src(['node_modules/rxjs/**'])
        .pipe(gulp.dest(path.join(config[environment].buildDirClient, 'libs', 'rxjs')));
});
gulp.task('copy-libs', function () {
    return gulp.src(config.client.js_dependencies)
            .pipe(gulp.dest(path.join(config[environment].buildDirClient, 'libs')));
});
gulp.task('copy-other', function () {
    var files = config.src_files.client.non_scripts;
    files.push(config.src_files.client.js);

   return gulp.src(files)
       .pipe(gulp.dest(config[environment].buildDirClient));
});
gulp.task('compile-client', function () {
    var files = config.client.ts_dependencies;
    files.push(config.src_files.client.ts);

    var tsConfig =  config.client.ts_configuration;
    tsConfig.sourceMap = development();
    tsConfig.removeComments = !development();

    return gulp.src(files)
        .pipe(ts(tsConfig))
        .pipe(gulp.dest(config[environment].buildDirClient));
});
gulp.task('copy-shared-files', function () {
    return gulp.src([config.src_files.server.shared])
        .pipe(gulp.dest(config.src_files.client.shared));
});