import reactDebug from "eslint-plugin-react-debug";

export const name = "@eslint-react/debug";

export const rules = {
  "@eslint-react/debug/class-component": "warn",
  "@eslint-react/debug/function-component": "warn",
  "@eslint-react/debug/hook": "warn",
  "@eslint-react/debug/is-from-react": "warn",
} as const;

export const plugins = {
  "@eslint-react/debug": reactDebug,
};
