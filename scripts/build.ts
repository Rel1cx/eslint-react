const packages = [
    "std",
    "shared",
    "eslint-react-ast",
    "eslint-react-variable",
    "eslint-react-construction",
    "eslint-react-pragma",
    "eslint-react-create-element",
    "eslint-react-jsx",
    "eslint-react-context",
    "eslint-react-hooks",
    "eslint-react-render-prop",
    "eslint-react-component-legacy",
    "eslint-react-component",
    "eslint-plugin",
];

for (const pkg of packages) {
    Bun.spawnSync(["pnpm", "run", "build"], {
        cwd: `packages/${pkg}`,
        stdio: ["inherit", "inherit", "inherit"],
    });
}

export {};
