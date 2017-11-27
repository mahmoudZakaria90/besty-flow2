const gulp 				    = require('gulp');
const sass 				    = require('gulp-ruby-sass');
const autoprefixer 		= require('gulp-autoprefixer');
const browserSync 		= require('browser-sync').create();
const reload 			    = browserSync.reload;
const browserify      = require('browserify');
const source          = require('vinyl-source-stream');
const log 				    = require('gulp-util');
const uglify          = require('gulp-uglify');  
const pump            = require('pump');
const csso            = require('gulp-csso');
const jshint          = require('gulp-jshint');
const notificator     = require('gulp-jshint-notify-reporter'); 
const babel           = require('babelify');
const fs              = require('fs');    


//sass
gulp.task('sass', function () {
 sass('./src/sass/*.sass',{style:'compressed'})
 .on('error', sass.logError)
 .pipe(autoprefixer())
 .pipe(gulp.dest('./public/css'));
});

//watch 
gulp.task('watch',function(){
	gulp.watch(['./src/sass/*.sass', './src/sass/**/*.sass'],['sass']);
	gulp.watch(['./src/js/*.js','./src/js/**/*.js'],['bundle','hint']);
	gulp.watch('./public/*.html', function(){log.log(log.colors.green('HTML Updated!'))});
	gulp.watch(['./public/*.html','./public/css/*.css','./public/js/*.js'], reload);
})

//bundle
gulp.task('bundle', function(){
	return browserify("./src/js/main.js")
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(fs.createWriteStream("./public/js/main.js"));
 })

//CSS minify
gulp.task('minify', function () {
  return gulp.src('./public/css/*.css')
  .pipe(csso())
  .pipe(gulp.dest('./public/css/'));
});


//JS uglify
gulp.task('uglify', function (cb) {
 setTimeout(()=> {
   pump([
    gulp.src('./public/js/*.js'),
    uglify(),
    gulp.dest('./public/js/')
    ],
    cb
    );
 }, 500)
});


//JS Hint 
gulp.task('hint', function() {
  return gulp.src('./src/js/*.js')
  .pipe(jshint())
  .pipe(notificator())
});


//Localhost 
gulp.task('serve',function(){
	browserSync.init({
   server: {
     baseDir: "public"
   }
 });
})




//default
gulp.task('default',['serve','sass','bundle','hint','watch'])