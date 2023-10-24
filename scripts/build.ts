const packages = [
    "tools",
    "types",
    "shared",
    "eslint-react-ast",
    "eslint-react-variable",
    "eslint-react-construction",
    "eslint-react-pragma",
    "eslint-react-element",
    "eslint-react-jsx",
    "eslint-react-context",
    "eslint-react-hooks",
    "eslint-react-render-prop",
    "eslint-react-component",
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
