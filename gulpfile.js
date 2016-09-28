var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task('sass', function () {
  return gulp.src('./views/styles/*.scss')
    .pipe(sass.on('error', sass.logError))
    .pipe(gulp.dest('./views/styles'));
});
