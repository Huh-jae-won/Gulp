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
gulp.task('sprite', function () {
  const spriteData = gulp.src(`./${path.sprite_src}/*.png`)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: `${path.sprite_dest}/sprite.png`
    }));
  const imgStream = new Promise(function (resolve) {
    spriteData.img
      .pipe(gulp.dest(`${path.sprite_dest}`))
      .on('end', resolve);
  });
  const cssStream = new Promise(function (resolve) {
    spriteData.css
      .pipe(gulp.dest(`./${path.css_src}`))
      .on('end', resolve);
  });
  return Promise.all([imgStream, cssStream]);
});