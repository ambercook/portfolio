var gulp        = require('gulp'),
	browserSync = require('browser-sync'),
    cp          = require('child_process'),
	sass        = require('gulp-sass'),
    jekyll      = 'jekyll';


var reload  = browserSync.reload;

gulp.task('sass', function() {
    gulp.src(['./assets/scss/style.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('jekyll-build', function (done) {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


gulp.task('watch', function () {
    gulp.watch('./assets/scss/*.scss',['sass','jekyll-rebuild']);
    gulp.watch(['./index.html', './_includes/*.html'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch' ]);
