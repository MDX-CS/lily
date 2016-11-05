import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';

gulp.task('default', ['lint', 'test']);

gulp.task('babel', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('test', ['babel'], () => {
  return gulp.src('tests/*.js')
    .pipe(mocha())
    .on('error', () => {
      gulp.emit('end');
    });
});

gulp.task('watch', ['test'], () => {
  return gulp.watch(['src/**/*.js', 'tests/**/*.js'], ['test']);
});

gulp.task('lint', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
})
