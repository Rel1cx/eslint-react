import { defineConfig } from "taze";

export default defineConfig({
    force: false,
    install: false,
    packageMode: {
        rollup: "3.29.4",
    },
    write: true,
});
