var config = {
  dist: {
    root: './dist'
  },
  isProd: false
};

var gulp   = require('gulp');
var del    = require('del');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var streamify = require('gulp-streamify');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var partialify = require('partialify');
var babelify = require('babelify');
var aliasify = require('aliasify');
var derequire = require('gulp-derequire');

var customOpts = {
  entries: ['./index.js'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true,
  standalone: 'myModule'
};

gulp.task('default', function() {
  return browserify(customOpts)
    .transform(babelify)
    .transform(aliasify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(derequire())
    .pipe(gulp.dest(config.dist.root));
});

gulp.task('clean', function(cb) {

  del([config.dist.root], cb);

});