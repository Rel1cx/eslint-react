import { findIdentifierReferences, runInRule } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { isInitializedFromReact } from "./is-initialized-from-react";

function isInitialized(code: string, name: string, importSource?: string) {
  return runInRule(code, (context, ast) => {
    const ref = findIdentifierReferences(ast, name).at(0);
    const scope = context.sourceCode.getScope(ref ?? ast);
    return isInitializedFromReact(name, scope, importSource);
  });
}

describe("isInitializedFromReact", () => {
  describe("imports", () => {
    it("should return true for a named import from 'react'", () => {
      expect(isInitialized('import { useState as use } from "react"; use();', "use")).toBe(true);
    });

    it("should return true for a default import from 'react'", () => {
      expect(isInitialized('import R from "react"; R;', "R")).toBe(true);
    });

    it("should return true for a namespace import from 'react'", () => {
      expect(isInitialized('import * as R from "react"; R;', "R")).toBe(true);
    });

    it("should return true for a require call", () => {
      expect(isInitialized('const R = require("react"); R;', "R")).toBe(true);
    });

    it("should follow an alias chain to the React import", () => {
      const code = 'import { useState } from "react"; const use = useState; use();';
      expect(isInitialized(code, "use")).toBe(true);
    });

    it("should match subpaths of the configured import source", () => {
      const code = 'import { flushSync } from "react-dom/client"; flushSync();';
      expect(isInitialized(code, "flushSync", "react-dom")).toBe(true);
    });

    it("should match packages sharing the prefix", () => {
      // Prefix matching is intentional: react-dom is treated as part of the
      // React family. Pass a more specific importSource to narrow it.
      const code = 'import { flushSync } from "react-dom"; flushSync();';
      expect(isInitialized(code, "flushSync")).toBe(true);
    });

    it("should use a custom import source", () => {
      const code = 'import { useState } from "preact/compat"; useState();';
      expect(isInitialized(code, "useState", "preact")).toBe(true);
    });

    it("should return false for imports from another source", () => {
      const code = 'import { useState } from "preact/hooks"; useState();';
      expect(isInitialized(code, "useState")).toBe(false);
    });

    it("should return false for an unknown variable", () => {
      expect(isInitialized("const x = 1;", "nonexistent")).toBe(false);
    });
  });

  describe("name heuristic", () => {
    it("should return true for a local named 'react' regardless of case", () => {
      expect(isInitialized("const x = 1;", "React")).toBe(true);
      expect(isInitialized("const x = 1;", "react")).toBe(true);
      expect(isInitialized("const x = 1;", "REACT")).toBe(true);
    });

    it("should not treat arbitrary names as React", () => {
      expect(isInitialized("const x = 1;", "useState")).toBe(false);
    });
  });
});
