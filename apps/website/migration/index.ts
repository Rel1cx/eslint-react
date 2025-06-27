/* eslint-disable perfectionist/sort-objects */
export const redirects = [
  // Redirects for old preset links
  {
    source: "/docs/rules/overview#core-rules",
    destination: "/docs/rules/overview#x-rules",
    permanent: true,
  },
  {
    source: "/docs/rules/overview#react-rules",
    destination: "/docs/rules/overview#x-rules",
    permanent: true,
  },
  {
    source: "/docs/rules/avoid-shorthand-:rest",
    destination: "/docs/rules/jsx-shorthand-:rest",
    permanent: true,
  },
  {
    source: "/docs/rules/prefer-shorthand-:rest",
    destination: "/docs/rules/jsx-shorthand-:rest",
    permanent: true,
  },
  {
    source: "/docs/rules/no-comment-textnodes",
    destination: "/docs/rules/jsx-no-comment-textnodes",
    permanent: true,
  },
  {
    source: "/docs/rules/prefer-react-namespace-import",
    destination: "/docs/rules/prefer-namespace-import",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-no-unnecessary-use-callback",
    destination: "/docs/rules/no-unnecessary-use-callback",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-no-unnecessary-use-memo",
    destination: "/docs/rules/no-unnecessary-use-memo",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-no-unnecessary-use-prefix",
    destination: "/docs/rules/no-unnecessary-use-prefix",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-prefer-use-state-lazy-initialization",
    destination: "/docs/rules/prefer-use-state-lazy-initialization",
    permanent: true,
  },
] as const;
