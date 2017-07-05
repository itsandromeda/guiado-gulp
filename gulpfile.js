/*global require*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    config = {
        source: './src/',
        dist: './public'
    },
    paths = {
        assets: 'assets/',
        html: '**/*.html',
        sass: 'scss/**/*.scss/',
        mainSass: 'scss/main.scss',
        mainJS: 'js/app.js'
    },
    sources = {
        assets: config.source + paths.assets,
        html: config.source + paths.html,
        sass: paths.assets + paths.sass,
        js: config.source + paths.js,
        rootSass: config.source + paths.assets + paths.mainSass,
        rootJS: config.source + paths.assets + paths.mainJS
    };

gulp.task('html', function () {
    gulp.src(sources.html).pipe(gulp.dest(config.dist));
});

gulp.task('sass', function () {
    gulp.src(sources.rootSass)
        .pipe(sass({
            outputStyle: 'Compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.dist + paths.assets + 'css'));
});

gulp.task('js', function () {
    gulp.src(sources.rootJS)
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest(config.dist + paths.assets + 'js'))
});

gulp.task('sass-watch', ['sass'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: config.dist + paths.assets
        }
    });
    gulp.watch(sources.html, ['html-watch']);
    gulp.watch(sources.sass, ['sass-watch']);
    gulp.watch(sources.js, ['js-watch']);
});