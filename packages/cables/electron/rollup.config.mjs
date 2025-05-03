import importAsString from "rollup-plugin-string-import";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
// import pkg from "rollup-plugin-banner";
// const banner = pkg.default;
import buildInfo from "@moreplease/rollup-plugin-build-info";
import { entryCodeInjector } from "rollup-plugin-entry-code-injector";

const plugins = [
  buildInfo(),
  entryCodeInjector({
    prepend: `
      import buildInfo from "build-info";
      var CABLES = CABLES || { \"ELECTRON\": {}}; CABLES.ELECTRON = CABLES.ELECTRON || {}; CABLES.ELECTRON.build = buildInfo;
    `,
  }),
  commonjs(),
  json(),
  // nodeResolve(),
  importAsString({
    include: ["**/*.txt", "**/*.wgsl", "**/*.frag", "**/*.vert"],
  }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(terser());
}

export default {
  input: "src/electron/main.js",
  output: [
    {
      dir: "dist/js",
      entryFileNames: "cables-electron.js",
      name: "CABLES",
      format: "cjs",
      sourcemap: process.env.NODE_ENV !== "production",
    },
  ],
  external: ["../../node_modules/npm/lib/npm.js"],
  plugins,
};
