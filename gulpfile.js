var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    open = require('open');

gulp.task('less', function () {
    var autoprefix = new LessPluginAutoPrefix({
        browsers: ["last 5 versions"],
        cascade: true
    });
    gulp.src('./style/less/**/*.less')
        .pipe(plumber())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./style/css'))
        .pipe(connect.reload());
});
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function (event) {
    gulp.watch(['./*.html'], ['html']);
    gulp.watch('./style/less/**/*.less', ['less']);
});

gulp.task('connect', function() {
    var port = 8082;
    connect.server({
        name: 'Resume',
        root: './',
        port: port,
        livereload: true,
        middleware: function(connect, opt) {
            return []
        }
    });
    open("http://localhost:" + port)
});

gulp.task('default', ['connect', 'watch'], function () {
    console.log("gulp default");
});