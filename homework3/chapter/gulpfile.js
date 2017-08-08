var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('gulpJs',function() {
    gulp.src('../js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../out'))
    .pipe(reload({
        stream: true
    }));
})

gulp.task('auto',function() {
    gulp.watch('../js/*.js',['gulpJs']);
    gulp.watch('../image/*',['imageMin']);
    gulp.watch('../less/*',['gulpLess']);
    gulp.watch('../sass/*.js',['gulpSass']);
})


gulp.task('browser-sync',function() {
    browserSync({
        server: {
            baseDir: '../'
        }
    })
    gulp.watch('../js/*.js',['gulpJs']);
    gulp.watch('../image/*',['imageMin']);
    gulp.watch('../less/*.less',['gulpLess']);
    gulp.watch('../sass/*.scss',['gulpSass']);
})


gulp.task('default',['gulpJs','auto','imageMin','gulpLess','gulpSass','browser-sync']);

gulp.task('imageMin',function() {
    gulp.src('../image/a.png')
    .pipe(imagemin({
         progressive: true
    }))
    .pipe(gulp.dest('../gulpimage'))
    .pipe(reload({
        stream: true
    }));
})

gulp.task('gulpLess',function() {
    gulp.src('../less/b.less')
        .pipe(less())
        .pipe(gulp.dest('../gulpLess'))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('gulpSass',function() {
    return gulp.src('../sass/*.scss')
          .pipe(sass().on('error',sass.logError))
          .pipe(gulp.dest('../gulpSass'))
          .pipe(reload({
              stream: true
          }))
})

