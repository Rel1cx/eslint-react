/// <reference types="node" />

import { fixturePath, parseCode } from "@local/testkit";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import { describe, expect, it } from "vitest";
import { resolveImportSource } from "./resolve-import-source";

function parse(code: string) {
  return parseCode(code, { filePath: fixturePath("file.ts"), sourceType: "module" });
}

/**
 * Returns the module scope (first child of the global scope) of a parsed
 * program.
 * @param parsed The result of `parseCode`.
 * @returns The module scope of the parsed program.
 */
function getModuleScope(parsed: ReturnType<typeof parseCode>): Scope.Scope {
  const ret = parsed.scopeManager.globalScope?.childScopes[0];
  if (ret == null) throw new Error('getModuleScope: the global scope has no child scopes; parse with sourceType: "module"');
  return ret;
}

describe("resolveImportSource", () => {
  it("should resolve a named import to its source module", () => {
    const code = `import { useState } from "react";`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("useState", moduleScope);

    expect(result).toBe("react");
  });

  it("should resolve a require call to its source module", () => {
    const code = `const React = require("react");`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("React", moduleScope);

    expect(result).toBe("react");
  });

  it("should return null for circular variable references instead of recursing infinitely", () => {
    const code = `const a = b;\nconst b = a;`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("a", moduleScope);

    expect(result).toBeNull();
  });

  it("should resolve a variable alias chain back to the import source", () => {
    const code = `import { useState } from "react";\nconst x = useState;`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("x", moduleScope);

    expect(result).toBe("react");
  });

  it("should resolve a member expression chain back to the namespace import source", () => {
    const code = `import * as React from "react";\nconst useState = React.useState;`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("useState", moduleScope);

    expect(result).toBe("react");
  });

  it("should return null for an unknown variable", () => {
    const code = `import { useState } from "react";`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("nonexistent", moduleScope);

    expect(result).toBeNull();
  });

  it("should resolve require call wrapped in TSAsExpression", () => {
    const code = `const React = require("react") as any;`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("React", moduleScope);

    expect(result).toBe("react");
  });

  it("should resolve identifier alias wrapped in TSAsExpression", () => {
    const code = `import { useState } from "react";\nconst x = useState as any;`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("x", moduleScope);

    expect(result).toBe("react");
  });

  it("should resolve member expression alias wrapped in TSAsExpression", () => {
    const code = `import * as React from "react";\nconst useState = React.useState as any;`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("useState", moduleScope);

    expect(result).toBe("react");
  });

  it("should resolve require call wrapped in TSAsExpression with member access", () => {
    const code = `const x = (require("react") as any).useState;`;
    const moduleScope = getModuleScope(parse(code));

    const result = resolveImportSource("x", moduleScope);

    expect(result).toBe("react");
  });
});
