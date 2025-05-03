import gulp from "gulp";
import fs from "fs";
import path from "path/posix";
import mkdirp from "mkdirp";
import jsonfile from "jsonfile";
import { execa } from "execa";

const defaultConfigLocation = "./cables.json";

let configLocation = defaultConfigLocation;
if (process.env.npm_config_apiconfig)
  configLocation =
    "./dist/js/cables_env_" + process.env.npm_config_apiconfig + ".json";

if (!fs.existsSync(configLocation)) {
  if (fs.existsSync(defaultConfigLocation)) {
    console.warn(
      "config file not found at",
      configLocation,
      "copying from cables.json",
    );
    let defaultConfig = JSON.parse(
      fs.readFileSync(defaultConfigLocation, "utf-8"),
    );
    // defaultConfig.path.assets = "./resources/assets/";
    // defaultConfig.path.uiDist = path.join(uiPath, "dist/");
    // defaultConfig.path.ops = path.join(corePath, "src/ops/");
    // defaultConfig.path.libs = path.join(sharedPath, "src/libs/");
    // defaultConfig.path.corelibs = path.join(corePath, "dist/libs/");
    jsonfile.writeFileSync(configLocation, defaultConfig, {
      encoding: "utf-8",
      spaces: 2,
    });
  } else {
    console.error(
      "config file found at neither",
      configLocation,
      "nor",
      defaultConfigLocation,
    );
    process.exit(1);
  }
}

let defaultConfig = JSON.parse(fs.readFileSync(defaultConfigLocation, "utf-8"));
let config = defaultConfig;
if (configLocation !== defaultConfigLocation) {
  const localConfig = JSON.parse(fs.readFileSync(configLocation, "utf-8"));
  config = { ...config, ...localConfig };
  jsonfile.writeFileSync(configLocation, config, {
    encoding: "utf-8",
    spaces: 4,
  });
}

const watchers = [];
function _watch(done) {
  const watchOptions = { ignored: "./**/node_modules/" };
  watchers.push(
    gulp.watch(
      ["../client/**/*.js", "../../../shared_constants.json"],
      watchOptions,
      gulp.series(defaultSeries),
    ),
  );
  watchers.push(
    gulp.watch(
      ["src/**/*.js", "../api/**/*.js"],
      watchOptions,
      gulp.series(electronChanges),
    ),
  );
  done();
}

function electronChanges(done) {
  console.log(
    "\x1b[33m Registered changes that require a restart of electron! \x1b[0m",
  );
  done();
}

function _analyze(done) {
  analyze = true;
  done();
}

function _serve(done) {
  let args = process.argv.slice(3);
  execa("pnpm", ["dlx", "electron", ".", ...args], {
    preferLocal: true,
    stdout: "inherit",
    stderr: "inherit",
  }).then((o, te, thr) => {
    watchers.forEach((watcher) => {
      watcher.close();
    });
  });
  done();
}

function _libs_copy(done) {
  const source = path.join(config.sourcePath.libs);
  const target = path.join(config.path.standaloneDist, "libs");
  mkdirp.sync(target);
  if (fs.existsSync(source)) {
    console.info("copying libs from", source, "to", target);
    return gulp
      .src(source + "/**", { encoding: false })
      .pipe(gulp.dest(target));
  } else {
    console.error("FAILED to copy libs from", source, "to", target);
    done();
  }
}

function _corelibs_copy(done) {
  const source = path.join(config.sourcePath.corelibs);
  const target = path.join(config.path.standaloneDist, "js", "libs");
  mkdirp.sync(target);
  if (fs.existsSync(source)) {
    console.info("copying corelibs from", source, "to", target);
    return gulp
      .src(source + "/**", { encoding: false })
      .pipe(gulp.dest(target));
  } else {
    console.error("FAILED to copy corelibs from", source, "to", target);
    done();
  }
}

function _core_ops_copy(done) {
  const source = path.join(config.sourcePath.ops, "base");
  const target = path.join(config.path.standaloneDist, "ops", "base");
  mkdirp.sync(target);
  if (fs.existsSync(source)) {
    console.info("copying ops from", source, "to", target);
    return gulp
      .src(source + "/**/*", { encoding: false })
      .pipe(gulp.dest(target));
  } else {
    console.error("FAILED to copy ops from", source, "to", target);
    done();
  }
}

function _extension_ops_copy(done) {
  const source = path.join(config.sourcePath.ops, "extensions");
  const target = path.join(config.path.standaloneDist, "ops", "extensions");
  mkdirp.sync(target);
  if (fs.existsSync(source)) {
    console.info("copying extensions from", source, "to", target);
    return gulp
      .src(source + "/**/*", { encoding: false })
      .pipe(gulp.dest(target));
  } else {
    console.warn("FAILED to copy extensions from", source, "to", target);
    done();
  }
}

function _ui_copy(done) {
  const source = path.join(config.sourcePath.uiDist);
  const target = path.join(config.path.standaloneDist, "ui");
  mkdirp.sync(target);
  if (fs.existsSync(source)) {
    console.info("copying ui from", source, "to", target);
    return gulp
      .src(source + "/**", { encoding: false })
      .pipe(gulp.dest(target));
  } else {
    console.error("FAILED to copy ui from", source, "to", target);
    done();
  }
}

function _assets_copy(done) {
  const source = ["./index.html"];
  const target = path.join(defaultConfig.path.standaloneDist);
  mkdirp.sync(target);
  if (source.every((s) => fs.existsSync(s))) {
    console.info("copying assets from", source, "to", target);
    return gulp.src(source, { encoding: false }).pipe(gulp.dest(target));
  } else {
    console.error("FAILED to copy assets from", source, "to", target);
    done();
  }
}

/*
 * -------------------------------------------------------------------------------------------
 * MAIN TASKS
 * -------------------------------------------------------------------------------------------
 */

const defaultSeries = gulp.parallel(
  _assets_copy,
  _corelibs_copy,
  _core_ops_copy,
  _extension_ops_copy,
  _libs_copy,
  _ui_copy,
);

gulp.task("build", defaultSeries);
gulp.task("analyze", gulp.series(_analyze, defaultSeries));
gulp.task("watch", gulp.parallel(_watch, _serve));
