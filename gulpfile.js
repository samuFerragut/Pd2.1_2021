const gulp = require("gulp");

const htmlmin = require("gulp-htmlmin");

const imagemin = require("gulp-imagemin");

const sass = require('gulp-sass');

const del = require("del");

// To prevent rewriting the source and build folder locations
const paths = {
  source: "./src",
  build: "./dist"
};


// Write our html task in a seperate function
function htmlBuild() {
  return gulp
    .src(`${paths.source}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.build));
}


//image minifier
function imgSquash() {
  return gulp
    .src("./src/images/*")
    .pipe(imagemin([imagemin.optipng()]))
    .pipe(gulp.dest(`${paths.build}/images`));
}

//style paths
const scssFiles = 'src/css/*.scss'
function sassFiles() {
    return gulp
        .src(scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${paths.build}/styles`));
};

function cleanup() {
  // Simply execute del with the build folder path
  return del([paths.build]);
}

// We have to change our exposed task, these functions can be ran in parallel as they do not depend on eachother.
// If your functions should run synchronously use gulp.series()

// We have to run the cleanup task first, after which we can run the build tasks
exports.build = gulp.series(
  cleanup,
  htmlBuild,
  gulp.parallel(sassFiles, imgSquash)
);

exports.clean = gulp.series(
    cleanup
  );