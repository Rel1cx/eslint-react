import type { RuleContext } from "@eslint-react/eslint";
import { runInRule } from "@local/testkit";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import { getJSXConfig, getJSXConfigFromAnnotation, getJSXConfigFromCompilerOptions } from "./jsx-config";

/**
 * Builds a rule-context-like object whose parser services expose the given
 * compiler options, without spinning up a real TypeScript program.
 */
function contextWithCompilerOptions(options: ts.CompilerOptions): RuleContext {
  return {
    sourceCode: {
      parserServices: {
        program: {
          getCompilerOptions: () => options,
        },
      },
    },
  } as unknown as RuleContext;
}

/**
 * Builds a rule-context-like object with both compiler options and the
 * comment-scanning surface used by `getJSXConfigFromAnnotation`.
 */
function contextWithProgramAndComments(options: ts.CompilerOptions, text: string, comments: string[]): RuleContext {
  return {
    sourceCode: {
      text,
      parserServices: {
        program: {
          getCompilerOptions: () => options,
        },
      },
      getAllComments: () => comments.map((value) => ({ value })),
    },
  } as unknown as RuleContext;
}

describe("getJSXConfigFromCompilerOptions", () => {
  it("should fall back to React defaults when no compiler options are available", () => {
    runInRule("const a = 1;", (context) => {
      // Parsed without type information, so parserServices.program is null.
      expect(context.sourceCode.parserServices?.program).toBeNull();
      expect(getJSXConfigFromCompilerOptions(context)).toEqual({
        jsx: ts.JsxEmit.ReactJSX,
        jsxFactory: "React.createElement",
        jsxFragmentFactory: "React.Fragment",
        jsxImportSource: "react",
      });
    });
  });

  it("should read JSX configuration from compiler options when a program is available", () => {
    const context = contextWithCompilerOptions({
      jsx: ts.JsxEmit.React,
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      jsxImportSource: "preact",
    });
    expect(getJSXConfigFromCompilerOptions(context)).toEqual({
      jsx: ts.JsxEmit.React,
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      jsxImportSource: "preact",
    });
  });

  it("should fall back per option when compiler options are partial", () => {
    const context = contextWithCompilerOptions({ jsxFactory: "h" });
    expect(getJSXConfigFromCompilerOptions(context)).toEqual({
      jsx: ts.JsxEmit.ReactJSX,
      jsxFactory: "h",
      jsxFragmentFactory: "React.Fragment",
      jsxImportSource: "react",
    });
  });
});

describe("getJSXConfigFromAnnotation", () => {
  it("should return an empty config when the file has no pragma comments", () => {
    runInRule("const a = 1;", (context) => {
      expect(getJSXConfigFromAnnotation(context)).toEqual({});
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
      expect(getJSXConfigFromAnnotation(context)).toEqual({
        jsx: ts.JsxEmit.React,
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "preact",
      });
    });
  });

  it("should let the first @jsx/@jsxFrag pragma win when it appears multiple times", () => {
    // tsc applies the first `@jsx`/`@jsxFrag` pragma and ignores later ones.
    const code = [
      "/* @jsx h */",
      "/* @jsx createElement */",
      "/* @jsxFrag Fragment */",
      "/* @jsxFrag F */",
      "const a = 1;",
    ].join("\n");
    runInRule(code, (context) => {
      const config = getJSXConfigFromAnnotation(context);
      expect(config.jsxFactory).toBe("h");
      expect(config.jsxFragmentFactory).toBe("Fragment");
    });
  });

  it("should let the last @jsxRuntime/@jsxImportSource pragma win when it appears multiple times", () => {
    // tsc applies the last `@jsxRuntime`/`@jsxImportSource` pragma.
    const code = [
      "/* @jsxRuntime classic */",
      "/* @jsxRuntime automatic */",
      "/* @jsxImportSource preact */",
      "/* @jsxImportSource react */",
      "const a = 1;",
    ].join("\n");
    runInRule(code, (context) => {
      const config = getJSXConfigFromAnnotation(context);
      expect(config.jsx).toBe(ts.JsxEmit.ReactJSX);
      expect(config.jsxImportSource).toBe("react");
    });
  });

  it("should map '@jsxRuntime automatic' to ts.JsxEmit.ReactJSX", () => {
    runInRule("/* @jsxRuntime automatic */\nconst a = 1;", (context) => {
      expect(getJSXConfigFromAnnotation(context).jsx).toBe(ts.JsxEmit.ReactJSX);
    });
  });

  it("should ignore an unrecognized @jsxRuntime value", () => {
    // tsc silently ignores a `@jsxRuntime` pragma whose value is neither
    // "classic" nor "automatic", leaving `jsx` unset so the compiler-option
    // defaults apply when the config is merged.
    runInRule("/* @jsxRuntime bogus */\nconst a = 1;", (context) => {
      expect(getJSXConfigFromAnnotation(context)).toEqual({});
    });
  });

  it("should pick up @jsxFrag in a file whose only pragma is @jsxFrag", () => {
    // Guards the fast path in getJSXConfigFromAnnotation: the '@jsx' substring
    // check must not skip files that only contain '@jsxFrag'/'@jsxRuntime'/etc.
    runInRule("/* @jsxFrag Fragment */\nconst a = 1;", (context) => {
      expect(getJSXConfigFromAnnotation(context)).toEqual({ jsxFragmentFactory: "Fragment" });
    });
  });

  it("should read pragmas from line comments", () => {
    runInRule("// @jsx h\nconst a = 1;", (context) => {
      expect(getJSXConfigFromAnnotation(context)).toEqual({ jsxFactory: "h" });
    });
  });

  it("should cache the result per sourceCode instance", () => {
    runInRule("/* @jsx h */\nconst a = 1;", (context) => {
      const first = getJSXConfigFromAnnotation(context);
      const second = getJSXConfigFromAnnotation(context);
      expect(second).toBe(first);
    });
  });
});

describe("getJSXConfig", () => {
  it("should merge pragma annotations over the compiler-option defaults", () => {
    runInRule("/* @jsx h */\nconst a = 1;", (context) => {
      expect(getJSXConfig(context)).toEqual({
        jsx: ts.JsxEmit.ReactJSX,
        jsxFactory: "h",
        jsxFragmentFactory: "React.Fragment",
        jsxImportSource: "react",
      });
    });
  });

  it("should merge pragma annotations over provided compiler options", () => {
    const context = contextWithProgramAndComments(
      {
        jsx: ts.JsxEmit.React,
        jsxFactory: "createElement",
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "react",
      },
      "/* @jsx h */",
      [" @jsx h "],
    );
    expect(getJSXConfig(context)).toEqual({
      jsx: ts.JsxEmit.React,
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      jsxImportSource: "react",
    });
  });

  it("should cache the merged result per sourceCode instance", () => {
    runInRule("const a = 1;", (context) => {
      expect(getJSXConfig(context)).toBe(getJSXConfig(context));
    });
  });
});
