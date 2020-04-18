
const gulp = require("gulp");
// 转换为ES5的代码
const babel = require('gulp-babel');
// 删除文件和文件夹
const del = require("del");
const uglify = require("gulp-uglify");
// css 压缩
const cssnano = require("gulp-cssnano");
// 代码调试的工具可以让压缩过的代码在监理所以可以已原始的状态显示
const sourcemaps = require('gulp-sourcemaps');
// 创建版本号
const rev = require("gulp-rev");
// 解决打包的html的文件中引用资源的问题
const revCollector = require('gulp-rev-collector');
// html的压缩工具
const minifyHtml = require('gulp-minify-html');
const fileInclude = require("gulp-file-include");
// 图片压缩
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass")
sass.compiler = require("node-sass")
// 线上的环境gulp的配置

// 删除的操作 先清空dist的目录
gulp.task("clean", async () => {
  await del(["./dist/**/*"]);
});

gulp.task("html", async () => {
  gulp.src(["./rev/**/*.json", "./src/html/**/*.html"])
    .pipe(fileInclude({
      prefix: "@@",
      basepath: "@file"
    }))
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(minifyHtml())
    .pipe(gulp.dest("./dist/"));
});

gulp.task("js", async () => {
  gulp.src(["./src/js/**/*.js"])
    // js转义 ESn => ES5;
    .pipe(babel({
      presets: ['@babel/env']
    }))
    // 索引简历
    .pipe(sourcemaps.init())
    .pipe(uglify())
    // 建立版本号
    .pipe(rev())
    // 写出map
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("./rev/js"))
});

gulp.task("css", async () => {
  gulp.src(["./src/css/**/*.css"])
    // 建立索引
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    // 创建版本号
    .pipe(rev())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("./rev/css"))
})
gulp.task("scss", async () => {
  gulp.src(["./src/scss/**/*.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    // 创建版本号
    .pipe(rev())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("./rev/scss"))

});
// 图片指令
gulp.task("img", async () => {

  gulp.src(["./src/images/*"])
    // 执行压缩
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images/"))
})
gulp.task("json", async () => {

  gulp.src(["./src/json//**/*.json"])
      .pipe(gulp.dest("./dist/json/"));
})
gulp.task("build", gulp.series("clean", "js", "html", "css", "img", "scss", "json"));
