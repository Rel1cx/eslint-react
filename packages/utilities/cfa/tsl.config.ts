import { defineConfig } from "tsl";

import { glob } from "../../../scripts/lib/glob";

export default defineConfig({
  ignore: [
    ...glob([
      "**/*.d.ts",
      "**/dist/**",
      "**/build/**",
      "src/index.ts",
    ]),
  ],
  rules: [],
});
