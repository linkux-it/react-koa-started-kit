var gulp = require('gulp');
var browserify = require('browserify');
var babelify = ('babelify');
var source = require('vinyl-source-stream');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');


gulp.task('scripts', function() {
  // build frontend files
  browserify({
    entries: 'frontend/scripts/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('frontend/temp/scripts'));
});

gulp.task('styles', function() {
  // sass and compass
  gulp.src('frontend/scss/**/*.scss')
    .pipe(compass({
      css: 'frontend/temp/css',
      sass: 'frontend/scss',
      image: 'frontend/images'
    }))
    .on('error', function(error) {
      // Would like to catch the error here
      console.log(error);
      this.emit('end');
    });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./frontend/scripts/**/*.jsx', ['scripts']);
  gulp.watch(['./frontend/styles/**/*.*'], ['styles']);
});

gulp.task('production', function () {
  // minify css
  gulp.src('./frontend/temp/css/*.css')
  .pipe(minifyCSS())
  .pipe(gulp.dest('public/styles'));

  // replace html for performance

  // uglify
  gulp.src('./frontend/temp/scripts/**.*js')
  .pipe(uglify())
  .pipe(gulp.dest('public/scripts'));
});

gulp.task('development', ['scripts', 'styles']);
gulp.task('build', ['development', 'production']);

gulp.task('develop', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js'
          , ignore: ['ignored.js']
          , watch: ['controllers', 'app.js']
          , tasks: ['lint'] })
    .on('restart', function () {
      console.log('restarted!');
    });
});
