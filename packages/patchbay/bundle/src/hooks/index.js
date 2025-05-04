import theme from "../theme/index.js";
// import express from "express";

export default ({ filter, init }) => {
  // init("app.before", ({ app }) => {
  //   app.use("/images", express.static("<path to your folder>"));
  // });
  filter("settings.read", (input) => {
    input[0].project_color = theme.rules.primary;
    input[0].default_appearance = "dark";
    input[0].default_theme_dark = "@patchbay/theme";

    return [...input];
  });
};
