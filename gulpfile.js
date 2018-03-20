"use strict";

var gulp=require('gulp');
var connect=require('gulp-connect');
var sourcemaps=require('gulp-sourcemaps');
var concat = require('gulp-concat');
var config=require('./gulpfile.config')();
var util=require('gulp-util');

log('gulp started');

gulp.task('connect',function () {
    connect.server({
        root:config.root,
        port:config.port,
        base:config.devBaseUrl,
        livereload:true
    });
});

gulp.task('javascript', function() {
    log('javascript concat');
    return gulp.src(config.paths.js)
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.paths.dest));
  });

gulp.task('watch',function(){
    gulp.watch(config.paths.js,['javascript']);
});


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


gulp.task('default',["javascript","connect",'watch']);