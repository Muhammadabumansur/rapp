"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var run = require("run-sequence");
var del = require("del");

gulp.task("style", function() {
  gulp.src("dev/sass/style.sass")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer({browsers: [
      "last 2 versions"
    ]})
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("html:copy", function() {
  return gulp.src("dev/*.html")
  .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("dev/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("dev/*.html", ["html:update"]);
  gulp.watch(["dev/img/**","dev/js/**"], ["copy"]);
})

gulp.task("build", function(fn) {
  run("clean", "copy", "style", "images", fn);
})

gulp.task("copy", function() {
  return gulp.src([
    "dev/fonts/**/*.{woff,woff2}",
    "dev/img/**",
    "dev/js/**",
    "dev/vendor-css/**",
    "dev/*.html"
  ], {
    base: "dev"
  })
  .pipe(gulp.dest("build"));
})

gulp.task("clean", function() {
  return del("build");
});

gulp.task("default", function() {
  run("build", "serve");
})