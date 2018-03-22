module.exports=function () {
    var config={
        root:'src',
        port:8004,
        devBaseUrl:'http:localhost',
        paths:{
            dest:'./src/libs',
            js:'./src/app/**/*.js',
            appless:'src/css/less/app.less',
            less:'src/css/less/*.less'
        }
    }
    return config;
}