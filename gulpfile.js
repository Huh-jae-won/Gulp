const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const spritesmith = require('gulp.spritesmith');


const path = {
  html_path: 'src',
  css_src: 'src/scss',
  css_dest: 'src/css',
  sprite_src: 'src/sprites',
  sprite_dest: 'src/img/sprites',
  img_dest: 'src/img',
}

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gulp.dest('src/css/'));
});