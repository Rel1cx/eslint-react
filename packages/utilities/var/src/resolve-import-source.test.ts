/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { resolveImportSource } from "./resolve-import-source";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "file.ts"),
    sourceType: "module",
  });
}

describe("resolveImportSource", () => {
  it("should resolve a named import to its source module", () => {
    const code = `import { useState } from "react";`;
    const { scopeManager } = parse(code);
    const moduleScope = scopeManager.globalScope!.childScopes[0]!;

    const result = resolveImportSource("useState", moduleScope);

    expect(result).toBe("react");
  });

  it("should resolve a require call to its source module", () => {
    const code = `const React = require("react");`;
    const { scopeManager } = parse(code);
    const moduleScope = scopeManager.globalScope!.childScopes[0]!;

    const result = resolveImportSource("React", moduleScope);

    expect(result).toBe("react");
  });

  it("should return null for circular variable references instead of recursing infinitely", () => {
    const code = `const a = b;\nconst b = a;`;
    const { scopeManager } = parse(code);
    const moduleScope = scopeManager.globalScope!.childScopes[0]!;

    const result = resolveImportSource("a", moduleScope);

    expect(result).toBeNull();
  });

  it("should resolve a variable alias chain back to the import source", () => {
    const code = `import { useState } from "react";\nconst x = useState;`;
    const { scopeManager } = parse(code);
    const moduleScope = scopeManager.globalScope!.childScopes[0]!;

    const result = resolveImportSource("x", moduleScope);

    expect(result).toBe("react");
  });

  it("should resolve a member expression chain back to the namespace import source", () => {
    const code = `import * as React from "react";\nconst useState = React.useState;`;
    const { scopeManager } = parse(code);
    const moduleScope = scopeManager.globalScope!.childScopes[0]!;

    const result = resolveImportSource("useState", moduleScope);

    expect(result).toBe("react");
  });

  it("should return null for an unknown variable", () => {
    const code = `import { useState } from "react";`;
    const { scopeManager } = parse(code);
    const moduleScope = scopeManager.globalScope!.childScopes[0]!;

    const result = resolveImportSource("nonexistent", moduleScope);

    expect(result).toBeNull();
  });
});
