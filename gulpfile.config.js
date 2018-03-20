module.exports=function () {
    var config={
        root:'src',
        port:8004,
        devBaseUrl:'http:localhost',
        paths:{
            dest:'./src/libs',
            js:'./src/app/**/*.js'
        }
    }
    return config;
}