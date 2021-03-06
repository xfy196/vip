const gulp = require("gulp")
const connect = require("gulp-connect")
const del = require("del")
const sass = require("gulp-sass")
const proxy = require("http-proxy-middleware").createProxyMiddleware
const fileInclude = require("gulp-file-include");
sass.compiler = require("node-sass")
const imagemin = require("gulp-imagemin");


const connect_options = {
    root: "./dist",
    port: 2000,
    middleware: () => {
        return [
            proxy("/floor", {
                target: "https://www.vip.com/ajax/getBrandRank.php",
                changeOrigin: true,
                pathRewrite: {
                    "/floor": ""
                }
            }),
            proxy("/notice", {
                target: "https://www.vip.com/ajax/getReadyBrandRank.php",
                changeOrigin: true,
                pathRewrite: {
                    "/notice": ""
                }
            }),
            proxy("/api/register", {
                target : "http://localhost/vipPhp/register.php",
                changeOrigin : true,
                pathRewrite : {
                    "/api/register" : ""
                }
            }),
            proxy("/api/login", {
                target : "http://localhost/vipPhp/login.php",
                changeOrigin : true,
                pathRewrite : {
                    "/api/login" : ""
                }
            })
        ]
    }
}
gulp.task("clean", async () => {
    await del("./dist/");
})
gulp.task("connect", async () => {
    connect.server(connect_options);
})
gulp.task("html", async () => {

    gulp.src(["./src/html/**/*.html"])
        .pipe(fileInclude({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulp.dest("./dist/"))

        .pipe(connect.reload());
});
gulp.task("css", async () => {

    gulp.src(["./src/css/**/*.css"])
        .pipe(gulp.dest("./dist/css/")).pipe(connect.reload());
});

gulp.task("js", async () => {

    gulp.src(["./src/js/**/*.js"])
        .pipe(gulp.dest("./dist/js/")).pipe(connect.reload());
});

gulp.task("scss", async () => {
    gulp.src(["./src/scss/**/*.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./dist/css/")).pipe(connect.reload());
});

gulp.task("json", async () => {

    gulp.src(["./src/json//**/*.json"])
        .pipe(gulp.dest("./dist/json/")).pipe(connect.reload());
})
gulp.task("watch", async () => {
    gulp.watch(["./src/html/**/*.html"], gulp.series("html"));
    gulp.watch(["./src/js/**/*.js"], gulp.series("js"));
    gulp.watch(["./src/css/**/*.css"], gulp.series("css"));
    gulp.watch(["./src/scss/**/*.scss"], gulp.series("scss"));
    gulp.watch(["./src/json/**/*.json"], gulp.series("json"));
});
// 图片指令
gulp.task("img", async () => {

    gulp.src(["./src/images/**/*", "./src/img/**/*"])
      // 执行压缩
      .pipe(imagemin())
      .pipe(gulp.dest("./dist/images/"))
  })
gulp.task("dev", gulp.parallel("watch", "connect", gulp.series("clean", "html", "js", "css", "scss", "json", "img")));