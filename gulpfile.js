var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var browserSync = require('browser-sync').create();
var browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

gulp.task('sass', function() {
  return gulp.src('app/scss/style.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.reload({
      stream: true,
      notify: false
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'build/'
    },
  })
});

gulp.task('reactBuild', function() {
  return browserify('./app/js/app.js')
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js/'))
  .pipe(browserSync.reload({
    stream: true,
    notify: false
  }))
});

gulp.task('default', ['browserSync', 'sass', 'reactBuild'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/app.js', ['reactBuild']);

  gulp.watch('*.html', browserSync.reload);
});
