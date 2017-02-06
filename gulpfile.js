var gulp =      require('gulp');
var foreach =   require('gulp-foreach');
var inject =    require('gulp-inject-string');
var sass =      require('gulp-sass');
var rename =    require('gulp-rename');

gulp.task('build', function() {
    return gulp.src('src/colors/**/*.scss')
        // foreach color
        .pipe(foreach(function(streama, color) {
            var c_name = color.relative.substring(1, color.relative.length-5);
            // foreach typography
            return gulp.src('src/typography/**/*.scss')
                .pipe(foreach(function(streamb, typography) {
                    var t_name = typography.relative.substring(1, typography.relative.length-5);
                    return gulp.src('src/instantbrand.scss')
                        .pipe(inject.prepend('@import "colors/'+ c_name +'";\n\n'))
                        .pipe(sass({outputStyle: 'compressed'}))
                        .pipe(rename('instantbrand-'+ c_name +'-'+ t_name +'.css'))
                        .pipe(gulp.dest('dist'));
                }));
        }));
});

gulp.task('watch', function() {
    gulp.watch('**/*.scss', ['build']);
});
gulp.task('default', ['build', 'watch']);
