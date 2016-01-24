var gulp = require('gulp'),
  minifycss = require('gulp-cssnano'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  changed = require('gulp-changed'),
  rev = require('gulp-rev'),
  browserSync = require('browser-sync'),
  ngannotate = require('gulp-ng-annotate'),
  del = require('del');

// JS Hints
gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//  Use Min
gulp.task('usemin', ['jshint'], function() {
  return gulp.src('./app/**/*.html')
    // .pipe(usemin({
    //   css: [minifycss(), rev()],
    //   js: [ngannotate(), uglify(), rev()]
    // }).on('error', function(e) {
    //   console.log(e);
    // }))
    .pipe(gulp.dest('dist/'));
});

//  Css Min
gulp.task('cssmin', ['jshint'], function() {
  return gulp.src('./app/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('dist/'));
});

//  JS Min
gulp.task('jsmin', ['jshint'], function() {
  return gulp.src('./app/**/*.js')
    .pipe(usemin({
      js: [ngannotate(), uglify(), rev()]
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({
      message: 'Images task complete'
    }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

// Copy Fonts
gulp.task('copyfonts', ['clean'], function() {
  gulp.src(
      './bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/bower_components/font-awesome/fonts'));
  gulp.src(
      './bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/bower_components/bootstrap/dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', [
    'usemin'
  ]);
  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function() {
  var files = [
    'app/**/*.html',
    'app/styles/**/*.css',
    'app/images/**/*.png',
    'app/scripts/**/*.js',
    'dist/**/*'
  ];

  browserSync.init(files, {
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('usemin', 'cssmin', 'jsmin', 'imagemin', 'copyfonts');
});
