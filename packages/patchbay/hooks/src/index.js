import theme from "../../theme/dist/index.js";

export default ({ filter }) => {
  filter("settings.read", (input) => {
    input[0].project_color = theme.rules.primary;
    input[0].default_appearance = "dark";
    input[0].default_theme_dark = "@patchbay/theme";

    return [...input];
  });
};
