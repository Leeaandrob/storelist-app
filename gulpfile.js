var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

var paths = {
    sass: ['./scss/**/*.scss'],
    www: ['./www/**/*', '!./www/lib/']
};

gulp.task('default', ['sass', 'watch', 'connect']);

gulp.task('sass', function (done) {
    gulp.src('./scss/bundle.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('reload', function () {
    gulp.src(paths.www)
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'www',
        port: 8080,
        host: '0.0.0.0',
        livereload: true
    });
});
