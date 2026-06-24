import eslintReact from "@eslint-react/eslint-plugin";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { expectNoFatalErrors, lintWithConfig } from "../helpers";

const FIXTURE = path.resolve(import.meta.dirname, "..", "samples", "sample-component-button.tsx");

const PRESETS = [
  "recommended",
  "recommended-typescript",
  "strict",
  "strict-typescript",
] as const;

describe("@eslint-react/eslint-plugin presets", () => {
  for (const preset of PRESETS) {
    it(`loads and runs the "${preset}" preset without fatal errors`, async () => {
      const config = eslintReact.configs[preset];
      expect(config).toBeDefined();

      const results = await lintWithConfig(config, [FIXTURE]);
      expectNoFatalErrors(results);
      expect(results).toHaveLength(1);
      expect(results[0]?.filePath).toBe(FIXTURE);
    });
  }
});
