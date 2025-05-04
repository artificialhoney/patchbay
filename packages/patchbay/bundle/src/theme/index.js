import "./style.css";

/** @type {import('@directus/themes').Theme} */
export default {
  id: "@patchbay/theme",
  name: "Patchbay Dark",
  appearance: "dark",
  rules: {
    borderRadius: "6px",
    borderWidth: "2px",
    foreground: "#bbbbbb",
    foregroundSubdued: "#aaaaaa",
    foregroundAccent: "#cccccc",
    background: "#333333",
    backgroundNormal: "#1a1a1a",
    backgroundAccent: "#222222",
    backgroundSubdued: "#010101",
    borderColor: "#1a1a1a",
    borderColorAccent: "#222222",
    borderColorSubdued: "#010101",
    primary: "#07f78c",
    secondary: "#5dc0fda5",
    success: "#07f78c",
    warning: "#ec9213",
    danger: "#dc5751",
    navigation: {
      background: "#1a1a1a",
      backgroundAccent: "#222222",
      borderWidth: "0px",
      borderColor: "transparent",
      project: {
        background: "#222222",
        borderWidth: "0px",
        borderColor: "transparent",
      },
      modules: {
        borderWidth: "0px",
        borderColor: "transparent",
        button: {
          foregroundHover: "#fff",
          background: "transparent",
          backgroundHover: "transparent",
          backgroundActive: "#1a1a1a",
        },
      },
      list: {
        background: "transparent",
        backgroundHover: "#222222",
        backgroundActive: "#222222",
        divider: {
          borderColor: "#222222",
        },
      },
    },
    header: {
      borderWidth: "0px",
      borderColor: "transparent",
      boxShadow: "0 4px 7px -4px black",
    },
    form: {
      columnGap: "32px",
      rowGap: "40px",
      field: {
        label: {
          fontWeight: "600",
        },
        input: {
          borderColor: "#1a1a1a",
          borderColorHover: "#222222",
          boxShadow: "none",
          boxShadowHover: "none",
          height: "60px",
          padding: "16px",
        },
      },
    },
    sidebar: {
      background: "#1a1a1a",
      borderWidth: "0px",
      borderColor: "transparent",
      section: {
        toggle: {
          background: "#222222",
          borderWidth: "0px",
          borderColor: "transparent",
        },
        form: {
          field: {
            input: {
              height: "52px",
              padding: "12px",
            },
          },
        },
      },
    },
    public: {
      art: {
        background: "#1a1a1a",
        speed: "1",
      },
    },
    popover: {
      menu: {
        background: "#222222",
        boxShadow: "0px 0px 6px 0px black",
      },
    },
    banner: {
      background: "#010101",
      padding: "40px",
      avatar: {
        background: "#fff",
        borderRadius: "50%",
      },
      headline: {
        foreground: "#fff",
      },
      title: {
        foreground: "#fff",
      },
      subtitle: {
        foreground: "#969696",
      },
      art: {
        foreground: "#1a1a1a",
      },
    },
  },
};
