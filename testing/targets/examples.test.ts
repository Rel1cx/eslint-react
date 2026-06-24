import { describe, expect, it } from "vitest";

import { expectNoFatalErrors, lintExample } from "../helpers";

const EXAMPLES = [
  { name: "react-dom", patterns: ["src/**/*.{ts,tsx}"] },
  { name: "react-dom-js", patterns: ["src/**/*.{js,jsx}"] },
  { name: "preact", patterns: ["src/**/*.{ts,tsx}"] },
  { name: "preact-compat", patterns: ["src/**/*.{ts,tsx}"] },
  { name: "react-dom-with-custom-rules", patterns: ["src/**/*.{ts,tsx}"] },
  { name: "next", patterns: ["app/**/*.{ts,tsx}"] },
] as const;

describe("example projects", () => {
  for (const { name, patterns } of EXAMPLES) {
    it(`lints "${name}" without fatal errors`, async () => {
      const results = await lintExample(name, [...patterns]);
      expect(results.length).toBeGreaterThan(0);
      expectNoFatalErrors(results);
    });
  }
});
