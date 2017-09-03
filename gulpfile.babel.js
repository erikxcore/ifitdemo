'use strict';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'gulp-buffer';
import uglify from 'gulp-uglify';
import tap from 'gulp-tap';
import browserify from 'browserify';
import babel from 'babelify';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import replace from 'gulp-replace';
import imagemin from 'gulp-imagemin';
import del from 'del';
import server from 'gulp-server-livereload';
import pug from 'gulp-pug';
import sassify from 'sassify';
import es from 'event-stream';

const dirs = {
  src: 'source',
  dest: 'build',
   nodeDir: 'node_modules' 
};

const paths = {
  images: `${dirs.src}/img/**/*`,
  sass: `${dirs.src}/sass/**/*.scss`,
  pug: `${dirs.src}/pug/**`,
  babel: `${dirs.src}/js/*` //Should pick up both JS and JSX
};

gulp.task('clean', () => {
  return del(['build']);
});

//VENDOR SPECIFIC
/**************************/

gulp.task('bootstrap-icons', () => { 
    return gulp.src(`${dirs.nodeDir}/bootstrap-sass/assets/fonts/**`) 
        .pipe(gulp.dest(`${dirs.dest}/fonts`)); 
});

gulp.task('bootstrap-js', () => { 
    return gulp.src(`${dirs.nodeDir}/bootstrap-sass/assets/javascripts/**/*.min.js`) 
        .pipe(gulp.dest(`${dirs.dest}/js`)); 
});

gulp.task('bootstrap-select', () => { 
    return gulp.src(`${dirs.nodeDir}/bootstrap-select/dist/js/bootstrap-select.min.js`) 
        .pipe(gulp.dest(`${dirs.dest}/js`)); 
});

//If we ever need to implement dealing with two sources in the same task, this is an example:
// gulp.task('bootstrap-select-test', () => {
//   return es.concat(
//     gulp.src(`${dirs.nodeDir}/bootstrap-select/js//*.js`) 
//         .pipe(gulp.dest(`${dirs.dest}/js`)),

//   );
// });

gulp.task('jquery', () => { 
    return gulp.src(`${dirs.nodeDir}/jquery/dist/jquery.min.js`) 
        .pipe(gulp.dest(`${dirs.dest}/js`)); 
});

gulp.task('icons', () => { 
    return gulp.src(`${dirs.nodeDir}/font-awesome/fonts/**`) 
        .pipe(gulp.dest(`${dirs.dest}/fonts`)); 
});
/*************************/
//END VENDOR SPECIFIC

gulp.task('babel', () => {
  return gulp.src([paths.babel,`!${dirs.src}/js/{_includes,_includes/**}`], { read: false })
    .pipe(tap((file) => {
      file.contents = browserify(file.path, {
        debug: true,
      }).transform(babel, {
        presets: [ 'es2015']
      }).exclude('_includes').transform(sassify, {
        'auto-inject': true, // Inject css directly in the code
        base64Encode: false, // Use base64 to inject css
        sourceMap: true // Add source map to the code
      }).bundle();
    }))
    .pipe(buffer())
    //.pipe(sourcemaps.init({ loadMaps: true }))
    //.pipe(uglify())
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${dirs.dest}/js`));
});

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${dirs.dest}/css`));
});

gulp.task('images', () => {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(`${dirs.dest}/img`));
});

gulp.task('pug', () => {
  return gulp.src([`${paths.pug}/*.pug`, `!${paths.pug}/_includes/*`, `!${paths.pug}/_extends/*`, `!${paths.pug}/_components/*` ])
  .pipe(pug({})).pipe(gulp.dest(`${dirs.dest}`));
});

gulp.task('sass:watch', () => {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('babel:watch', () => {
  gulp.watch(paths.babel, ['babel']);
});

gulp.task('images:watch', () => {
  gulp.watch(paths.images, ['images']);
});

gulp.task('watch:babel', () => {
  gulp.watch(paths.babel, ['babel']);
  gulp.watch(paths.pug, ['pug']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('watch', () => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.pug, ['pug']);
});

gulp.task('webserver', ['watch:babel'], () => {
  gulp.src(`${dirs.dest}`)
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

gulp.task('build', ['bootstrap-icons','icons','babel','sass','pug','images']);

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});