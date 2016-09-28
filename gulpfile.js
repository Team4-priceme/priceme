var gulp = require("gulp");
var sass = require("gulp-sass");
var run = require("gulp-run");

gulp.task("start", ["sass"], function() {
	return run("npm start").exec()
	.pipe(gulp.dest('logs'));
});

gulp.task("sass", function() {
  return gulp.src("./views/styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./views/styles"));
});
