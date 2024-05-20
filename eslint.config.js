const { bundleRequire } = require("bundle-require");

module.exports = bundleRequire({
  filepath: "./eslint.config.mts",
}).then(require => require.mod.default);
