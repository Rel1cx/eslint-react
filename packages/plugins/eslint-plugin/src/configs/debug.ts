import reactDebug from "eslint-plugin-react-debug";

export const name = "@eslint-react/debug";

export const rules = {
  "@eslint-react/debug/no-unknown-attribute": "warn",
  "@eslint-react/debug/no-unknown-event": "warn",
  "@eslint-react/debug/no-unknown-property": "warn",
} as const;

export const plugins = {
  "@eslint-react/debug": reactDebug,
};
