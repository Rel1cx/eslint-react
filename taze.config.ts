import { defineConfig } from "taze";

export default defineConfig({
    force: false,
    install: false,
    packageMode: {
        // wait for plugins to be updated
        rollup: "3.29.4",
        // skip 1.3.1 because of a known issue
        "string-ts": "1.3.0",
        // skip 1.10.15 because of a known issue
        turbo: "1.10.14",
    },
    write: true,
});
