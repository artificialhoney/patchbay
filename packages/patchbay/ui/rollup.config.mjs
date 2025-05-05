import summary from "rollup-plugin-summary";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import htmlTemplate from "rollup-plugin-generate-html-template";

export default {
  input: "src/main.js",
  output: {
    file: "dist/patchbay-ui.js",
    format: "iife",
    name: "PATCHBAY.UI",
  },
  plugins: [
    resolve(),
    terser(),
    summary(),
    htmlTemplate({
      template: "src/index.html",
      target: "dist/index.html",
    }),
  ],
};
