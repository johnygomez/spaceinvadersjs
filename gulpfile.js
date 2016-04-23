var concat = require('gulp-concat');
var gulp = require('gulp');
var sass = require('gulp-sass')
var using = require('gulp-using');

gulp.task('styles', function() {
  return gulp.src(['src/css/**/main.scss'])
    .pipe(using({
        prefix: 'Processing sass file'
      }))
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('static', function() {
  gulp.src(['src/images/**/*'])
    .pipe(gulp.dest('dist/images'));

  gulp.src(['src/static/**/*'])
    .pipe(gulp.dest('dist/static'));

  gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts'));

  gulp.src(['src/audio/**/*'])
    .pipe(gulp.dest('dist/audio'));

  gulp.src(['bower_components/materialize/dist/css/materialize.min.css'])
    .pipe(gulp.dest('dist/css'));

  gulp.src(['bower_components/materialize/dist/font/**/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/*.js'])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('3rd', function() {
  return gulp.src([
      'bower_components/materialize/dist/js/materialize.min.js',
      'bower_components/mixitup/build/jquery.mixitup.min.js',
      'bower_components/nicescroll/dist/jquery.nicescroll.min.js',
      'bower_components/wow/dist/wow.min.js',
    ]).pipe(concat('3rd.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/audio/*', ['static']);
  gulp.watch('src/images/*', ['static']);
  gulp.watch('src/fonts/*', ['static']);
  gulp.watch('src/static/*', ['static']);
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/css/*.scss', ['styles']);
  gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('build', ['html', 'styles', 'static', 'scripts', '3rd'], function() {
  console.log('Building project!');
});

gulp.task('default', ['build'], function() {});