"use strict";

var gulp=require('gulp'),
    connect=require('gulp-connect'),
    sourcemaps=require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    config=require('./gulpfile.config')(),
    util=require('gulp-util'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

log('gulp started');

gulp.task('connect',function () {
    connect.server({
        root:config.root,
        port:config.port,
        base:config.devBaseUrl,
        livereload:true
    });
});

gulp.task('build-js', function() {
    log('build-js');
    return gulp.src(config.paths.js)
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.paths.dest));
  });

gulp.task('build-less', function(){
    gulp.src(config.paths.appless)
        .pipe(less({ compress: false }))
        .on('error', function(e){console.log(e);} )
        .pipe(gulp.dest('src/css/'))
        .pipe(rename({ suffix: '.min' })) 
        .pipe(minifycss())
        .pipe(gulp.dest('src/css/')); 
});

gulp.task('watch',function(){
    gulp.watch(config.paths.less, ['build-less']);
    gulp.watch(config.paths.js,['build-js']);
});

//fix 'build-less'
gulp.task('build',['build-js','build-less']);

function log(msg) {
    if(typeof(msg)==='object'){
        for(var item in msg){
            if(msg.hasOwnProperty(item)){
                util.log(util.color.yellow(msg[item]));
            }
        }
    }else{
        util.log(util.colors.yellow(msg));
    }
}


gulp.task('default',['build','watch',"connect"]);