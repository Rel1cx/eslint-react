import { runInRule } from "@local/testkit";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import { getJsxConfig, getJsxConfigFromAnnotation, getJsxConfigFromCompilerOptions } from "./jsx-config";

describe("getJsxConfigFromCompilerOptions", () => {
  it("should fall back to React defaults when no compiler options are available", () => {
    runInRule("const a = 1;", (context) => {
      // Parsed without type information, so parserServices.program is null.
      expect(context.sourceCode.parserServices?.program).toBeNull();
      expect(getJsxConfigFromCompilerOptions(context)).toEqual({
        jsx: ts.JsxEmit.ReactJSX,
        jsxFactory: "React.createElement",
        jsxFragmentFactory: "React.Fragment",
        jsxImportSource: "react",
      });
    });
  });
});

describe("getJsxConfigFromAnnotation", () => {
  it("should return an empty config when the file has no pragma comments", () => {
    runInRule("const a = 1;", (context) => {
      expect(getJsxConfigFromAnnotation(context)).toEqual({});
    });
  });

  it("should extract @jsx, @jsxFrag, @jsxRuntime and @jsxImportSource pragmas", () => {
    const code = [
      "/* @jsx h */",
      "/* @jsxFrag Fragment */",
      "/* @jsxRuntime classic */",
      "/* @jsxImportSource preact */",
      "const a = 1;",
    ].join("\n");
    runInRule(code, (context) => {
      expect(getJsxConfigFromAnnotation(context)).toEqual({
        jsx: ts.JsxEmit.React,
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "preact",
      });
    });
  });

  it("should let the last pragma win when a pragma appears multiple times", () => {
    const code = [
      "/* @jsx h */",
      "/* @jsx createElement */",
      "const a = 1;",
    ].join("\n");
    runInRule(code, (context) => {
      expect(getJsxConfigFromAnnotation(context).jsxFactory).toBe("createElement");
    });
  });

  it("should map '@jsxRuntime automatic' to ts.JsxEmit.ReactJSX", () => {
    runInRule("/* @jsxRuntime automatic */\nconst a = 1;", (context) => {
      expect(getJsxConfigFromAnnotation(context).jsx).toBe(ts.JsxEmit.ReactJSX);
    });
  });

  it("should map an unrecognized @jsxRuntime value to ts.JsxEmit.ReactJSX", () => {
    // Current behavior: any value other than "classic" is treated as the automatic
    // runtime instead of being rejected (tsc would report an error for this).
    runInRule("/* @jsxRuntime bogus */\nconst a = 1;", (context) => {
      expect(getJsxConfigFromAnnotation(context).jsx).toBe(ts.JsxEmit.ReactJSX);
    });
  });

  it("should pick up @jsxFrag in a file whose only pragma is @jsxFrag", () => {
    // Guards the fast path in getJsxConfigFromAnnotation: the '@jsx' substring
    // check must not skip files that only contain '@jsxFrag'/'@jsxRuntime'/etc.
    runInRule("/* @jsxFrag Fragment */\nconst a = 1;", (context) => {
      expect(getJsxConfigFromAnnotation(context)).toEqual({ jsxFragmentFactory: "Fragment" });
    });
  });

  it("should cache the result per sourceCode instance", () => {
    runInRule("/* @jsx h */\nconst a = 1;", (context) => {
      const first = getJsxConfigFromAnnotation(context);
      const second = getJsxConfigFromAnnotation(context);
      expect(second).toBe(first);
    });
  });
});

describe("getJsxConfig", () => {
  it("should merge pragma annotations over the compiler-option defaults", () => {
    runInRule("/* @jsx h */\nconst a = 1;", (context) => {
      expect(getJsxConfig(context)).toEqual({
        jsx: ts.JsxEmit.ReactJSX,
        jsxFactory: "h",
        jsxFragmentFactory: "React.Fragment",
        jsxImportSource: "react",
      });
    });
  });

  it("should cache the merged result per sourceCode instance", () => {
    runInRule("const a = 1;", (context) => {
      expect(getJsxConfig(context)).toBe(getJsxConfig(context));
    });
  });
});
