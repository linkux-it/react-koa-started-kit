var gulp = require('gulp');
var browserify = require('browserify');
var babelify = ('babelify');
var source = require('vinyl-source-stream');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('development', function() {
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
  gulp.watch('./frontend/**/*.jsx', ['build']);
  gulp.watch(['./src/styles/**/*.styl', './src/components/**/*.styl'], ['stylus']);
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

gulp.task('build', ['development', 'production']);
