'use strict';
/* *
 * 
 * Load modules node
 =========================================*/
var gulp    = require('gulp'),
plumber     = require('gulp-plumber'),
gutil       = require('gulp-util'),
uglify      = require('gulp-uglify'),
concat      = require('gulp-concat'),
rename      = require('gulp-rename'),
minifyCSS   = require('gulp-minify-css'),
less        = require('gulp-less'),
path        = require('path'),
connect     = require('gulp-connect'),
ngAnnotate  = require('gulp-ng-annotate');

// Handle less error
var onError = function (err) {
    gutil.beep();
    console.log(err);
};

/* *
 * 
 * Compilador dos arquivos do front. (less / js)
 * Arquivos js e css referentes as views
 * 
 ============================================*/

var css_files    = 'src/views/assets/css/*.css',
    css_path     = 'src/views/assets/css/',
    js_files     = 'src/views/assets/js/*.js',
    less_files   = 'src/views/assets/less/core.less',
    less_path    = 'src/views/assets/less/**/*.less',
    dist_path    = 'src/views/dist';

function js(){
    return gulp.src([
                    'src/views/assets/js/lib/moment.js',
                    'src/views/assets/js/lib/jquery.min.js',
                    'src/views/assets/js/lib/bootstrap.js',
                    'src/views/assets/js/lib/daterangepicker.js',
                    'src/views/assets/js/lib/summernote.js',
                    'src/views/assets/js/forms/bootstrap-select.js',
                    
                    // Full Calendar
                    'src/views/assets/js/lib/fullcalendar.js',
                    'src/views/assets/js/lib/lang-all.js',
                    // Full Calendar
                    js_files
                ])
                .pipe(
                    plumber({
                        errorHandler: onError
                    })
                )
                .pipe(concat('dist'))
                .pipe(rename('all.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest(dist_path));
}
function css(){
    return gulp.src(css_files)
                .pipe(concat('dist'))
                .pipe(rename('all.min.css'))
                .pipe(minifyCSS({keepBreaks:false, keepSpecialComments: false}))
                .pipe(gulp.dest(dist_path));
}
function lessTask(){
    return gulp.src(less_files)
                .pipe(
                    plumber({
                        errorHandler: onError
                    })
                )
                .pipe(less({compress: true}).on('error', gutil.log))
                .pipe(gulp.dest(css_path));
}
//Tasks
gulp.task('js', function() {
    return js();
});
gulp.task('css', function(){
    return css();
});
gulp.task('less', function(){
    return lessTask();
});

/* *
 * 
 * Compilador das dependecias do angular
 * 
 ============================================*/

var angular_path  = 'src/app';

function angular(){
    return gulp.src([

                    //Angular
                    'src/app/angular/angular.min.js',

                    //Angular Components -->
                    'src/app/angular/angular-route.min.js',
                    'src/app/angular/angular-cookies.min.js',
                    'src/app/angular/angular-animate.min.js',
                    'src/app/angular/angular-loading-bar.js',
                    //'src/app/angular/angular-flow-standalone.js'
                    //Angular Components -->
                ])
                .pipe(
                    plumber({
                        errorHandler: onError
                    })
                )
                .pipe(concat('dist'))
                .pipe(rename('angular.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest(angular_path));
}

// Tasks
gulp.task('angular', function(){
    return angular();
});

/* *
 * 
 * Compilador do App
 * 
 ============================================*/

var app_files = [
        'src/app/main/main.js',
        'src/app/main/routes.js',
        'src/app/factories/**/*.js',
        'src/app/services/**/*.js',
        'src/app/directives/**/*.js',
        'src/app/controllers/**/*.js'
    ],
    app_path  = 'src/app';

function app(){
    
    return gulp.src( app_files )
                .pipe(
                    plumber({
                        errorHandler: onError
                    })
                )
                .pipe(ngAnnotate())
                .pipe(concat('dist'))
                .pipe(rename('app.js'))
                .pipe(uglify())
                .pipe(gulp.dest(app_path));
}
// Tasks
gulp.task('app', function(){
    return app();
});

/* *
 * 
 * Server
 * 
 ============================================*/

gulp.task('server', function () {
    connect.server({
        root: 'src',
        port: 8000,
        livereload: true,
        base : 'http://localhost',
        //fallback: 'src/index.html'
    });
});

/* *
 * 
 * Gulp Watch
 * 
 * Ouve as alteracoes nos arquivos js/css da view e do App
 * 
 ================================================= */

gulp.task('watch', function(){
    
    //Less view
    gulp.watch(less_path, function() {
        return lessTask();
    });
    
    //Css view
    gulp.watch(css_files, function() {
        console.log('CSS-View task completed!');
        return css();
    });

    //Js view
    gulp.watch(js_files, function() {
        console.log('JS-View task completed!');
        return js();
    });
    
    //App Js file
    gulp.watch(app_files, function() {
        console.log( 'App task Completed' );
        return app();
    });
});

/* *
 * Start build and init project
 */


//Start project
gulp.task('start', ['watch', 'angular', 'server']);
