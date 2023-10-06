import { defineConfig } from "taze";

export default defineConfig({
    force: false,
    install: false,
    packageMode: {
        "bun-types": "patch",
        rollup: "3.29.4",
    },
    write: true,
});
