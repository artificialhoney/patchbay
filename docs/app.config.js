export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: "Patchbay Docs",
      description:
        "The brilliant cables.gl app on a state of the art full-stack platform.",
    },
    theme: {
      customizable: true,
      color: "zinc",
      radius: 0.5,
    },
    header: {
      title: "Patchbay",
      showTitle: true,
      darkModeToggle: true,
      logo: {
        light: "/logo.svg",
        dark: "/logo.svg",
      },
      nav: [],
      links: [
        {
          icon: "lucide:github",
          to: "https://github.com/artificialhoney/patchbay",
          target: "_blank",
        },
      ],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
    },
    footer: {
      credits: "Copyright © 2025",
      links: [
        {
          icon: "lucide:github",
          to: "https://github.com/artificialhoney/patchbay",
          target: "_blank",
        },
      ],
    },
    toc: {
      enable: true,
      title: "On This Page",
      links: [
        {
          title: "Star on GitHub",
          icon: "lucide:star",
          to: "https://github.com/artificialhoney/patchbay",
          target: "_blank",
        },
        {
          title: "Create Issue",
          icon: "lucide:circle-dot",
          to: "https://github.com/artificialhoney/patchbay/issues",
          target: "_blank",
        },
      ],
    },
    search: {
      enable: true,
      inAside: false,
    },
  },
});
