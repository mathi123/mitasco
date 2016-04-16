var clean = require('gulp-clean');
var gulp = require('gulp');
var fs = require('fs');
var gulpCopy = require('gulp-copy');

gulp.task('default', function() {
  console.log("Building...");
  
  console.log("Copy pgconf.json to bin folder");
  gulp.src("bin/pgconf.json", { read: false }).pipe(clean());
  gulp.src("pgconf.json").pipe(gulpCopy("bin", []));      
        
  console.log("done");
});