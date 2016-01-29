var gulp        = require('gulp');
var htmlreplace = require('gulp-html-replace');
var gulpDoxx    = require('gulp-doxx');
var path        = require('path');
gulp.task('assets:replace', function() {
  // this file will be generated from webpack, so make sure you run that first
  // better yet, just run npm run build and it will work
  var assets = require('./build/assets.json');

  gulp.src('./public/index.html')
  .pipe(htmlreplace({
    'css': assets.app.css,
    'js': assets.app.js,
  }))
  .pipe(gulp.dest('build/'));
});

console.log('PATH', path.join(__dirname,'./'));
gulp.task('docs', function() {

  gulp.src(['./app/**/*.js', 'README.md'], {base: '.'})
    .pipe(gulpDoxx({
      title: 'mylocal-hq',
      urlPrefix: path.join(__dirname,'./docs'),
    }))
    .pipe(gulp.dest('docs'));

});
