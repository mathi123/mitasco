var gulp = require('gulp'),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    del = require('del'),
    ts = require('gulp-typescript'),
    mocha = require('gulp-mocha'),
    environments = require('gulp-environments'),
    path = require('path'),
    config = require('./configuration.js'),
    sass = require('gulp-sass'),
    server = require('gulp-develop-server'),
    download = require("gulp-download"),
    unzip = require("gulp-unzip");

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
gulp.task('clean', function (callback) {
    runSequence('clean-server', 'clean-client', callback);
});
gulp.task('watch', ['build-and-start'], function (cb) {
    var other_client_files = config.src_files.client.non_scripts;
    other_client_files.push(config.src_files.client.js);

    gulp.watch([config.src_files.server.ts], ['build-restart-server']);
    gulp.watch([config.src_files.server.shared], ['copy-shared-files']);
    gulp.watch([config.src_files.client.ts], ['compile-client', 'build-restart-server']);
    gulp.watch(other_client_files, ['copy-other']);
    gulp.watch(config.src_files.client.sass, ['sass']);
    gulp.watch(config.src_files.server.apiDocumentation, ['copy-api-docs']);
});

gulp.task('build-and-start', function (callback) {
   runSequence('default', 'start', callback);
});

gulp.task('test', function (callback) {
    runSequence('test-server', callback);
});

gulp.task('start', function () {
    var options = { path:config[environment].runScript };
    server.listen(options);
});

gulp.task('restart', function () {
    server.restart();
});

gulp.task('build-swagger', function (callback) {
    runSequence('download-swagger', 'copy-swagger', 'delete-swagger-zip', 'copy-api-docs', callback);
});

gulp.task('download-swagger', function () {
    var documentationPath = path.join(config[environment].buildDir, config.docs);

    return download(config.docs_url)
        .pipe(unzip({
            filter: function (entry) {
                return entry.path.indexOf("/dist/") > 0;
            }
        }))
        .pipe(gulp.dest(documentationPath));
});

gulp.task('copy-swagger', function () {
    var documentationPath = path.join(config[environment].buildDir, config.docs);

    var docFiles = [path.join(documentationPath, "swagger-ui-2.2.6/dist/**")];

    return gulp.src(docFiles)
        .pipe(gulp.dest(documentationPath));
});

gulp.task('delete-swagger-zip', function () {
    var documentationPath = path.join(config[environment].buildDir, config.docs);

    del(path.join(documentationPath, "swagger-ui-2.2.6"), {force: true});
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

gulp.task('copy-https-config', function () {
    return gulp.src(['server.key','server.crt'])
        .pipe(gulp.dest(config[environment].buildDir));
});

gulp.task('build-restart-server', function(callback) {
   runSequence('build-server', 'restart', callback);
});

gulp.task('build-server', function(callback){
  runSequence('clean-server', 'compile-server', 'copy-db-config', 'copy-https-config', callback);
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
    // allow self signed certificates
    if(environment != 'production'){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    var executeTestPath = path.join(config[environment].buildDir, "test");

    return gulp.src(executeTestPath + '/**/*.test.js', {read: false})
        .pipe(mocha({reporter: 'mocha-circleci-reporter'}));
});

gulp.task('copy-api-docs', function () {
    return gulp.src(config.src_files.server.apiDocumentation)
        .pipe(gulp.dest(path.join(config[environment].buildDir, config.docs)));
});

////////////////////////
// CLIENT CONFIGURATION
////////////////////////

gulp.task('build-client', function (callback) {
    runSequence('clean-client', 'copy-imwa', 'copy-rxjs', 'copy-libs', 'copy-shared-files', 'copy-angular-libs', 'copy-other', 'sass', 'compile-client', 'copy-api-docs', callback);
});
gulp.task('clean-client', function () {
    return del([path.join(config[environment].buildDir, 'app')], {force: true});
});
gulp.task('copy-angular-libs', function () {
    var base = path.join(config[environment].buildDirClient, config.client.vendor_folder, 'angular2');

    for (var i = 0; i < config.client.ngPackageNames.length; i++) {
        var source = path.join('node_modules/@angular/', config.client.ngPackageNames[i], 'bundles', config.client.ngPackageNames[i] + '.umd.min.js');
        var target = path.join(base, config.client.ngPackageNames[i]);
        gulp.src(source)
            .pipe(gulp.dest(target));
    }
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
    for(var i = 0; i < config.client.js_dependencies.length ; i++){
        var lib = config.client.js_dependencies[i];
        gulp.src(lib.libs)
            .pipe(gulp.dest(path.join(config[environment].buildDirClient, lib.target)));
    }
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
gulp.task('sass', function () {
    var targetPath = path.join(config[environment].buildDirClient, "styles");
    return gulp.src(config.src_files.client.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(targetPath));
});