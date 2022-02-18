var gulp    = require('gulp');
var sass    = require('gulp-sass')(require('sass'));
var cleanss = require('gulp-clean-css')
var less    = require('gulp-less');
var cssmin  = require('gulp-cssmin')
var concat  = require('gulp-concat');
var merge   = require('merge-stream');
var bower   = require('bower');

gulp.task('default', function () {

    var lessStream = gulp.src('./assets/less/*.less')
        .pipe(less())
        .pipe(cssmin()) //I shrink less files with the help of "gulp-cssmin".
        .pipe(concat('style.less'));

    var scssStream = gulp.src('./assets/sass/*.scss')
        .pipe(sass({ outputStyle: "compressed" })) //I compress and write sass/scss files
        .pipe(concat('style.sass'));

    var cssStream = gulp.src('assets/css/*.css', {
            base: './'
        })
        .pipe(cleanss()) //I am compressing css files.
        .pipe(concat('main.css'));

    var mergedStream = merge(lessStream, scssStream, cssStream)
        .pipe(concat('min-css-file.css'))
        .pipe(cleanss())
        .pipe(gulp.dest('assets/min/'));

    return mergedStream;
    gulp.start('bower');
});

gulp.task('bower', () => {
    return gulp.src('assets/min/min-css-file.css')
        .pipe(wiredep())
        .pipe(gulp.dest('assets/min/'));
})
