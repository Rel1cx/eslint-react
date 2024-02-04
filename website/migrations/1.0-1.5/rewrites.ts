export const rewrites = [
  {
    source: "/rules/jsx-:name",
    destination: "/rules/:name",
  },
  {
    source: "/rules/react-:name",
    destination: "/rules/:name",
  },
  {
    source: "/rules/react-hooks-:name",
    destination: "/rules/hooks-extra-:name",
  },
  {
    source: "/rules/no-spreading-key",
    destination: "/rules/no-implicit-key",
  },
  {
    source: "/rules/no-constructed-context-value",
    destination: "/rules/no-unstable-context-value",
  },
  {
    source: "/rules/no-unstable-nested-components",
    destination: "/rules/no-nested-components",
  },
] as const;
