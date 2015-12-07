var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

function compile(watch) {
   var bundler = watchify(
      browserify(
         './src/app.js', 
         { debug: true }
      )
      .transform(babelify.configure({
         presets: ["es2015", "react"]
      })));

   function rebundle() {
      bundler.bundle()
         .on('error', function(err){
            console.error(err);
            this.emit('end');
         })
         .pipe(source('build.js'))
         .pipe(buffer())
         .pipe(sourcemaps.init({ loadMaps: true }))
         .pipe(sourcemaps.write('./'))
         .pipe(gulp.dest('./build'));
   }

   if(watch){
      bundler.on('update', function(){
         console.log('re-bundling...');
         rebundle();
      });
   }

   rebundle();
}

function watch() {
   return compile(true);
};

gulp.task('build', compile);
gulp.task('watch', watch);

gulp.task('default', ['watch']);