const mode = process.argv[2];


switch (mode) {
    case "dev":
        require("./gulpfile-dev");
        break;
    case "build":
        require("./gulpfile-build");
        break;
}
