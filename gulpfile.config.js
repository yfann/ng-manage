module.exports=function () {
    var config={
        port:8004,
        devBaseUrl:'http:localhost',
        paths:{
            dest:'./app/libs',
            js:'./app/scripts/**/*.js'
        }
    }
    return config;
}