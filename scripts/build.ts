const packages = [
  "tools",
  "types",
  "shared",
  "utils",
  "ast",
  "jsx",
  "core",
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
