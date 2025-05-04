import theme from "../theme/index.js";
import logo from "../theme/reactor.svg.js";
// import express from "express";

export default ({ filter, embed }) => {
  // init("app.before", ({ app }) => {
  //   app.use("/images", express.static("<path to your folder>"));
  // });

  const logoBase64 = `data:image/svg+xml;base64,${btoa(logo)}`;

  embed(
    "head",
    `
    <link rel="shortcut icon" href="${logoBase64}" />
    <style>
      .module-bar-logo .logo {
        background-image: url("${logoBase64}") !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background-position: center center !important;
        background-size: 40px 40px !important;
      }
      .logo {
        background-image: url("${logoBase64}") !important;
        background-position: center center !important;
        background-size: 40px 40px !important;
        background-repeat: no-repeat !important;
      }
      .directus-logo {
          display: none !important;
      }
    </style>   
  `,
  );

  filter("settings.read", (input) => {
    input[0].project_name = "Patchbay";
    input[0].project_note =
      "A fork of the brilliant [cables.gl](https://cables.gl) application for maintaining and extending it to build a new robust full-stack.";
    input[0].project_color = theme.rules.primary;
    input[0].default_appearance = "dark";
    input[0].default_theme_dark = "@patchbay/theme";

    return [...input];
  });
};
