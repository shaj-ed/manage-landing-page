// Select Dependencies
const { src, dest, watch, series } = require("gulp");
const scss = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// SCSS Task
function scssTask() {
  return src("src/scss/**/*.scss")
    .pipe(scss().on("error", scss.logError))
    .pipe(
      postcss([
        autoprefixer("last 2 versions", { grid: "autoplace " }),
        cssnano(),
      ])
    )
    .pipe(dest("dist/css"));
}

// JS Task
function jsTask() {
  return src("src/js/*.js").pipe(terser()).pipe(dest("dist/js"));
}

// Image Optimization Task
function imageOpti() {
  return src("src/images/*")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

// Browsersync Task
function brosersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browserReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("index.html", browserReload);
  watch(
    ["src/scss/**/*.scss", "src/js/*.js"],
    series(scssTask, jsTask, browserReload)
  );
  watch("src/images/*", series(imageOpti, browserReload));
}

// Default Gulp Run
exports.default = series(
  scssTask,
  jsTask,
  imageOpti,
  brosersyncServe,
  watchTask
);
