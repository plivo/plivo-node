var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-babel-istanbul');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var del = require('del');
var isparta = require('isparta');

const merge = require("merge-stream");
// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-register');

gulp.task('static', function () {
  return gulp.src(['lib/**/*.js', '!lib/rest/request-test.js', '!lib/rest/client-test.js'])
    .pipe(excludeGitignore())
    .pipe(eslint({
      rules: {
        'symbol-description': 0,
        'no-negated-condition': 0,
        'new-cap': 0,
        'no-use-before-define': 0,
        'camelcase': 0
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: false,
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', gulp.series('pre-test', function (cb) {
  var mochaErr;

  console.log('Running tests with node version', process.version);

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', function (err) {
      mochaErr = err;
      throw (err)
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
}));

gulp.task('watch', function () {
  gulp.watch(['lib/**/*.js', 'test/**'], ['test']);
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('babel', gulp.series('clean', function () {
  return merge([
    gulp.src('types/**/*.d.ts')
    .pipe(gulp.dest('dist/')),
    gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
]);
}));

gulp.task('lintFix', function () {
  return gulp.src('lib/**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint({
      fix: true
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('prepublish', gulp.series('babel'));
gulp.task('default', gulp.series('static', 'test'));
