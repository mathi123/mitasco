let gulp = require('gulp'),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    del = require('del'),
    mocha = require('gulp-mocha'),
    environments = require('gulp-environments'),
    path = require('path'),
    config = require('./configuration.js'),
    sass = require('gulp-sass'),
    server = require('gulp-develop-server'),
    download = require("gulp-download"),
    unzip = require("gulp-unzip");

gulp.task('default', function (callback) {
    runSequence('start', callback);
});

gulp.task('start', function () {
    let options = {path: config.runScript};
    server.listen(options);
});

gulp.task('restart', function () {
    server.restart();
});

gulp.task('build-swagger', function (callback) {
    runSequence('download-swagger', 'copy-swagger', 'delete-swagger-zip', 'copy-api-docs', callback);
});

gulp.task('download-swagger', function () {
    let documentationPath = path.join(config.buildDir, config.docs);

    return download(config.docs_url)
        .pipe(unzip({
            filter: function (entry) {
                return entry.path.indexOf("/dist/") > 0;
            }
        }))
        .pipe(gulp.dest(documentationPath));
});

gulp.task('copy-swagger', function () {
    let documentationPath = path.join(config.buildDir, config.docs);

    let docFiles = [path.join(documentationPath, "swagger-ui-2.2.6/dist/**")];

    return gulp.src(docFiles)
        .pipe(gulp.dest(documentationPath));
});

gulp.task('delete-swagger-zip', function () {
    let documentationPath = path.join(config.buildDir, config.docs);

    del(path.join(documentationPath, "swagger-ui-2.2.6"), {force: true});
});


gulp.task('copy-api-docs', function () {
    return gulp.src(config.src_files.apiDocumentation)
        .pipe(gulp.dest(path.join(config.buildDir, config.docs)));
});

/////////////////////////
// SERVER CONFIGURATION
/////////////////////////

gulp.task('copy-db-config', function () {
  console.info("Copy pgconf.json to build folder");

    let database = JSON.parse(fs.readFileSync(config.dbConfig));

    let data = {
        user: database.development.user,
        password: database.development.password,
        database: database.development.database,
        host: database.development.host
    };

    fs.writeFileSync(path.join(config.buildDir, '/pgconf.json'), JSON.stringify(data));
});

gulp.task('copy-https-config', function () {
    return gulp.src(['server.key','server.crt'])
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('build-restart-server', function(callback) {
   runSequence('build-server', 'restart', callback);
});

gulp.task('test', function (callback) {
    runSequence('start', 'run-tests', callback);
});

gulp.task('run-tests', function () {
    // allow self signed certificates
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    return gulp.src(config.path_tests, {read: false})
        .pipe(mocha({reporter: 'mocha-circleci-reporter'}));
});