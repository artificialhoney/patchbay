import gulp from "gulp";

import sass from "gulp-sass-no-nodesass";

import replace from "gulp-replace";
import svgmin from "gulp-svgmin";
import svgcss from "gulp-svg-css";
import rename from "gulp-rename";
import concat from "gulp-concat";
import sassCompiler from "sass";
import nunjucksRender from "gulp-nunjucks-render";
import data from "gulp-data";
import { readFileSync } from "node:fs";

sass.compiler = sassCompiler;

function _core() {
  return gulp.src(["../cables/dist/**/*.js"]).pipe(gulp.dest("dist/js"));
}

function _html() {
  return gulp
    .src([
      "html/ui/header.html",
      "html/ui/templates/*.html",
      "html/ui/footer.html",
    ])
    .pipe(concat("index.html"))
    .pipe(gulp.dest("dist/"));
}

function _sass() {
  return gulp
    .src("scss/style-dark.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("style-dark.css"))

    .pipe(gulp.dest("dist/css"));
}

function _svgcss() {
  return gulp
    .src("icons/**/*.svg")
    .pipe(svgmin())
    .pipe(
      svgcss({
        fileName: "icons",
        cssPrefix: "icon-",
        addSize: false,
      }),
    )
    .pipe(replace("background-image", "mask"))

    .pipe(rename("svgicons.scss"))
    .pipe(gulp.dest("scss/"));
}

function _fonts() {
  return gulp
    .src(["fonts/**/*"], { encoding: false })
    .pipe(gulp.dest("dist/fonts"));
}

function _images() {
  return gulp
    .src(["img/**/*"], { encoding: false })
    .pipe(gulp.dest("dist/img"));
}

const defaultSeries = gulp.series(
  _core,
  _html,
  _svgcss,
  _sass,
  _fonts,
  _images,
);

gulp.task("build", defaultSeries);
gulp.task("default", defaultSeries);

gulp.task("html", _html);
gulp.task("svgcss", _svgcss);
gulp.task("sass", _sass);
gulp.task("fonts", _fonts);
gulp.task("images", _images);
