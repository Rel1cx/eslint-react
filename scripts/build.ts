const packages = [
    "tools",
    "types",
    "shared",
    "ast",
    "jsx",
    "core",
    "eslint-plugin-debug",
    "eslint-plugin-hooks",
    "eslint-plugin-jsx",
    "eslint-plugin-naming-convention",
    "eslint-plugin-react",
    "eslint-plugin",
];

for (const pkg of packages) {
    Bun.spawnSync(["pnpm", "run", "build"], {
        cwd: `packages/${pkg}`,
        stdio: ["inherit", "inherit", "inherit"],
    });
}
