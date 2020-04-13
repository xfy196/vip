
let gulp         = require("gulp");
// 转换为ES5的代码
let babel        = require('gulp-babel');
// 删除文件和文件夹
let del          = require("del");
let uglify       = require("gulp-uglify");
// css 压缩
let cssnano      = require("gulp-cssnano");
// 代码调试的工具可以让压缩过的代码在监理所以可以已原始的状态显示
let sourcemaps   = require('gulp-sourcemaps');
// 创建版本号
let rev          = require("gulp-rev");
// 解决打包的html的文件中引用资源的问题
let revCollector = require('gulp-rev-collector');
// html的压缩工具
let minifyHtml   = require('gulp-minify-html');

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
  gulp.src(["./rev/**/*.json","./src/html/**/*.html"])
  .pipe(revCollector({
    replaceReved : true
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
      .pipe(gulp.dest("./dist/css/"));
});
// 图片指令
gulp.task("img", async ()=>{

  gulp.src(["./src/images/*"])
  // 执行压缩
  .pipe(imagemin())
  .pipe(gulp.dest("./dist/images/"))
})
gulp.task("build", gulp.series("clean", "js", "html", "css", "img", "scss"));
