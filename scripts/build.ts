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
];

for (const pkg of packages) {
    Bun.spawnSync(["pnpm", "run", "build"], {
        cwd: `packages/${pkg}`,
        stdio: ["inherit", "inherit", "inherit"],
    });
}

export {};
