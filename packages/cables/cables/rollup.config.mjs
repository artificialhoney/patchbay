import importAsString from "rollup-plugin-string-import";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
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
      var CABLES = CABLES || {}; CABLES.build = buildInfo;
    `,
  }),
  commonjs(),
  json(),
  nodeResolve({
    browser: true,
  }),
  importAsString({
    include: ["**/*.txt", "**/*.wgsl", "**/*.frag", "**/*.vert"],
  }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(terser());
}

export default {
  input: "src/core/index.js",
  output: [
    {
      dir: "dist",
      entryFileNames: "cables.js",
      name: "CABLES",
      format: "iife",
      sourcemap: process.env.NODE_ENV !== "production",
    },
  ],
  plugins,
};
