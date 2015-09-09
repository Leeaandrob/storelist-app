var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

var pkg = {
      src: {
              base: './source/'
            , sass: './source/sass/**/*.sass'
            , js: './source/apps/**/*.js'
            , angularModules: './source/apps/**/*.module.js'
            , angularTemplates: './source/apps/**/*.html'
            , images: './source/images/**/*'
            , html: './source/index.html'
            , fonts: './source/fonts/**/*'
        }
    , dest: {
            www: ['./www/**/*', '!./www/lib/']
        }
};

gulp.task('default', [
      'build'
    , 'watch'
    , 'connect'
]);

gulp.task('build', [
      'sass'
    , 'scripts'
    , 'images'
    , 'html'
    , 'fonts'
]);

gulp.task('scripts', function () {
    gulp.src([
              pkg.src.angularModules
            , pkg.src.js
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.min.js', {newLine: ';'}))
        .pipe(ngAnnotate({ add: true }))
        .pipe(bytediff.start())
        .pipe(uglify({mangle: true}))
        .pipe(bytediff.stop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./www/js/'));
    gulp.src(pkg.src.angularTemplates)
        .pipe(gulp.dest('./www/apps/'));
});

gulp.task('images', function () {
    gulp.src(pkg.src.images)
        .pipe(gulp.dest('./www/images/'));
});

gulp.task('html', function () {
    gulp.src(pkg.src.html)
        .pipe(gulp.dest('./www/'));
});

gulp.task('fonts', function () {
    gulp.src(pkg.src.fonts)
        .pipe(gulp.dest('./www/fonts/'));
});

gulp.task('sass', function (done) {
    gulp.src(pkg.src.base + 'sass/bundle.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(bytediff.start())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(bytediff.stop())
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch([pkg.src.sass],      ['sass']);
    gulp.watch([
          pkg.src.js
        , pkg.src.angularTemplates
    ],                              ['scripts']);
    gulp.watch([pkg.src.images],    ['images']);
    gulp.watch([pkg.src.html],      ['html']);
    gulp.watch([pkg.src.fonts],     ['fonts']);
    gulp.watch(pkg.dest.www,        ['reload']);
});

gulp.task('reload', function () {
    gulp.src(pkg.dest.www)
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
