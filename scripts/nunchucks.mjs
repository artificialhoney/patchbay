import nunjucks from "nunjucks";
import path from "node:path";
import fs from "node:fs";
import pkg from "../package.json" with { type: "json" };

const FILE = process.argv[2];

const render = (file) => {
  nunjucks.configure({ autoescape: true });
  console.log(nunjucks.renderString(`${fs.readFileSync(file)}`, pkg));
};

if (fs.existsSync(FILE)) {
  render(path.resolve(FILE));
} else if (fs.existsSync(path.resolve(FILE))) {
  render(path.resolve(FILE));
} else {
  console.error("⚔🥷⚔");
}
