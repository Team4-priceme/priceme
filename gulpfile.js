var gulp = require("gulp");
var sass = require("gulp-sass");
var child = require('child_process');
var fs = require("fs");

gulp.task("default", ["start"]);

gulp.task("start", ["sass"], function(cb) {
	var server = child.spawn('node', ['app.js']);
  var log = fs.createWriteStream('server.log', {flags: 'a'});
  server.stdout.pipe(log);
  server.stderr.pipe(log);
	return;
});

gulp.task("sass", function() {
  return gulp.src("./views/styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./views/styles"));
});
