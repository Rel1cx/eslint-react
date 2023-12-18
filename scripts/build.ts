const packages = [
  "tools",
  "types",
  "shared",
  "ast",
  "jsx",
  "core",
  "eslint-utils",
  "eslint-plugin-debug",
  "eslint-plugin-naming-convention",
  "eslint-plugin-jsx",
  "eslint-plugin-react",
  "eslint-plugin-react-hooks",
  "eslint-plugin",
];

for (const pkg of packages) {
  Bun.spawnSync(["pnpm", "run", "build"], {
    cwd: `packages/${pkg}`,
    stdio: ["inherit", "inherit", "inherit"],
  });
}
