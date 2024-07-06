export default {
  index: {
    title: "Home",
    type: "page",
    theme: {
      breadcrumb: false,
    },
    display: "hidden",
  },
  roadmap: {
    title: "Roadmap",
    type: "page",
  },
  docs: {
    title: "Documentation",
    type: "page",
  },
  rules: {
    title: "Rules",
    type: "page",
    href: "/docs/rules/overview",
  },
  presets: {
    title: "Presets",
    type: "page",
    href: "/docs/presets",
  },
} as const;
