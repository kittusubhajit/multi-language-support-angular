'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify')
var reload = browserSync.reload;
var stringify = require('stringify');

// -----------------------------------------------------------------------------
// SASS
// -----------------------------------------------------------------------------

gulp.task('sass', function() {
    return gulp.src(['./scss/ltr-app.scss', './scss/rtl-app.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});


// -----------------------------------------------------------------------------
// JavaScript
// -----------------------------------------------------------------------------

gulp.task('js', function() {
    return gulp.src([
            './bower_components/angular/angular.js',
            './bower_components/angular-translate/angular-translate.js',
            './bower_components/angular-translate-handler-log/angular-translate-handler-log.js',

            './bower_components/angular-cookies/angular-cookies.js',
            './bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
            './bower_components/angular-translate-storage-local/angular-translate-storage-local.js',

            './bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',

            './js/app.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(browserify({
            transform: stringify({
                extensions: ['.html', '.tpl'],
                minify: true
            })
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});


// -----------------------------------------------------------------------------
// Watch Files & Reload
// -----------------------------------------------------------------------------

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./index.html'], [reload]);
    gulp.watch('./scss/**/*.scss', ['sass', reload]);
    gulp.watch('./js/app.js', ['js', reload]);
});


// -----------------------------------------------------------------------------
// Build
// -----------------------------------------------------------------------------

gulp.task('build', ['js'], function() {
    // runSequence('sass', 'js');
});


// -----------------------------------------------------------------------------
// Gulp Default
// -----------------------------------------------------------------------------

gulp.task('default', [], function() {
    gulp.start('serve');
});
