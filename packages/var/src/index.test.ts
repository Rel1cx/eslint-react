import { describe, expect, it } from "vitest";

import * as varModule from "./index";

const runtimeExports = [
  "createImportLookup",
  "isAssignmentTargetEqual",
  "isInitializedFromReact",
  "isInitializedFromReactNative",
  "isProvenanceEqual",
  "isValueEqual",
  "resolve",
  "resolveEnclosingAssignmentTarget",
  "resolveImportSource",
  "resolveObjectType",
  "resolveOrigin",
  "resolveOriginChain",
] as const;

describe("index", () => {
  it.each(runtimeExports)("should export %s as a function", (name) => {
    expect(typeof (varModule as unknown as Record<string, unknown>)[name]).toBe("function");
  });
});
