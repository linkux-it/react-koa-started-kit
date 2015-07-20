var gulp = require('gulp');
var browserify = require('browserify');
var babelify = ('babelify');
var source = require('vinyl-source-stream');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');


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
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('public/scripts'))
  .pipe(livereload());
});

gulp.task('styles', function() {
  // sass and compass
  gulp.src('frontend/scss/**/*.scss')
    .pipe(plumber())
    .pipe(compass({
      css: 'frontend/css',
      sass: 'frontend/scss',
      image: 'frontend/images'
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/styles'))
    .pipe(livereload())
    .on('error', function(error) {
      // Would like to catch the error here
      console.log(error);
      this.emit('end');
    });
});

gulp.task('watch', function() {
  gulp.watch('./frontend/scss/*.scss', ['styles']);
  gulp.watch('./frontend/javascript/**/*.jsx', ['scripts']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({ script: 'app.js'
          , ext: 'html swig jsx js'
          , ignore: ['ignored.js']
          , watch: ['config', 'app', 'app.js', 'lib']
          , env: {NODE_PATH: 'app:lib:frontend/scripts'}
          , tasks: ['lint'] })
  .on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
    console.log('restarted!');
  });
});

gulp.task('default', ['styles', 'scripts', 'develop', 'watch']);
