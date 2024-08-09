// @ts-check
import { bundleRequire } from "bundle-require";

// eslint-disable-next-line no-restricted-syntax
export default bundleRequire({
  filepath: "./eslint.config.mts",
}).then(require => require.mod.default);
