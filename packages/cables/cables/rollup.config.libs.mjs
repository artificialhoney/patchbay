import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import importAsString from "rollup-plugin-string-import";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const isLiveBuild = process.env.NODE_ENV === "production" || false;

const getDirectories = function (arr) {
  const names = [];
  for (let i = 0; i < arr.length; i++) {
    const dirent = arr[i];
    if (dirent.isDirectory() && !dirent.name.startsWith(".")) {
      names.push(dirent.name);
    }
  }
  return names;
};

const getJsFiles = function (arr) {
  const names = [];
  for (let i = 0; i < arr.length; i++) {
    const dirent = arr[i];
    if (
      !dirent.isDirectory() &&
      !dirent.name.startsWith(".") &&
      dirent.name.endsWith(".js")
    ) {
      names.push(dirent.name);
    }
  }
  return names;
};

const raiseFirstChar = (str) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};
const flattenArray = (arr) => {
  return [].concat.apply([], arr);
}; // .flat() only availible in Node 11+

const createOutputEntryObjectsNamespace = (namespace) => {
  const outputs = [];
  const dirContent = fs.readdirSync(
    path.join(__dirname, "src", "libs", namespace),
    { withFileTypes: true },
  );

  const namespaceFiles = getJsFiles(dirContent);
  const namespaceSubDirectories = getDirectories(dirContent);

  for (let i = 0; i < namespaceFiles.length; i++) {
    const file = namespaceFiles[i];
    const baseName = file.split(".")[0];
    const targetName =
      namespace === "cables" ? baseName : namespace + "_" + baseName;
    outputs.push({
      input: path.join(__dirname, "src", "libs", namespace, file),
      output: {
        entryFileNames: targetName + ".js",
        dir: path.join(__dirname, "dist", "libs"),
        name: [
          namespace.toUpperCase(),
          "COREMODULES",
          raiseFirstChar(baseName),
        ].join("."),
        // libraryExport: raiseFirstChar(namespace),
        // libraryTarget: "this",
        format: "cjs",
        sourcemap: process.env.NODE_ENV !== "production",
      },
    });
  }

  for (let i = 0; i < namespaceSubDirectories.length; i++) {
    const subdir = namespaceSubDirectories[i];
    const targetName =
      namespace === "cables" ? subdir : namespace + "_" + subdir;
    outputs.push({
      input: path.join(__dirname, "src", "libs", namespace, subdir, "index.js"),
      output: {
        entryFileNames: targetName + ".js",
        dir: path.join(__dirname, "dist", "libs"),
        name: [
          namespace.toUpperCase(),
          "COREMODULES",
          raiseFirstChar(subdir),
        ].join("."),
        // libraryExport: raiseFirstChar(subdir),
        // libraryTarget: "this",
        format: "cjs",
        sourcemap: process.env.NODE_ENV !== "production",
      },
    });
  }
  return outputs;
};

const readLibraryFiles = () => {
  const LIBDIR_ENTRIES = fs.readdirSync(path.join(__dirname, "src", "libs"), {
    withFileTypes: true,
  });

  const NAMESPACE_DIRS = getDirectories(LIBDIR_ENTRIES);

  const outputObjects = [];
  for (let i = 0; i < NAMESPACE_DIRS.length; i++) {
    const namespace = NAMESPACE_DIRS[i];
    outputObjects.push(
      createOutputEntryObjectsNamespace(namespace, isLiveBuild),
    );
  }

  return flattenArray(outputObjects);
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const entryAndOutputObjects = readLibraryFiles(isLiveBuild);
const defaultConfig = {
  plugins: [
    commonjs(),
    json(),
    nodeResolve(),
    importAsString({
      include: ["**/*.txt", "**/*.wgsl", "**/*.frag", "**/*.vert"],
    }),
  ],
};

if (process.env.NODE_ENV === "production") {
  defaultConfig.plugins.push(terser());
}

const configs = [];

for (let i = 0; i < entryAndOutputObjects.length; i++) {
  const entryAndOutput = entryAndOutputObjects[i];
  configs.push({ ...defaultConfig, ...entryAndOutput });
}

export default configs;
