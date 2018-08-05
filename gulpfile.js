// HTML GULP FILE.

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect-php');


//////
var sassFiles = ['assets/*.scss']
gulp.task('sass', function(){
return gulp.src(sassFiles)
.pipe(concat('sassCompiled.css'))
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('assets/css/compiledSass'))
.pipe(browserSync.stream());
});


gulp.task('watch', function(){
    //static server
    // browserSync.init({
    //     server:{
    //         baseDir: "./"
    //     }
    // });

    //PHP server
    connect.server({}, function(){
        browserSync.init({
            proxy : '127.0.0.1/SASS',
            port : 3306
        })
    })

    gulp.watch("assets/*.scss", ['sass']);
    gulp.watch(['**/*.html', '!node_modules/**/*']).on('change',browserSync.reload );
    gulp.watch(['**/*.js', '!node_modules/**/*']).on('change',browserSync.reload );
    gulp.watch(['**/*.php', '!node_modules/**/*']).on('change',browserSync.reload );
});




//////

