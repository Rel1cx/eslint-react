/// <reference types="node" />

import { Check } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../test";
import { getFunctionInitPath } from "./function";
import {
  DEFAULT_COMPONENT_DETECTION_HINT,
  FunctionComponentDetectionHint,
  FunctionComponentFlag,
  getFunctionComponentFlagFromInitPath,
  getFunctionComponentId,
  isFunctionComponentDefinition,
  isFunctionComponentName,
  isFunctionComponentNameLoose,
  isFunctionComponentWrapperCall,
  isFunctionComponentWrapperCallback,
  isFunctionWithLooseComponentName,
} from "./function-component";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

function createMockContext(): RuleContext {
  return {
    sourceCode: {
      getText: (node: TSESTree.Node) => {
        if (node.type === AST.Identifier) {
          return node.name;
        }
        return "";
      },
      getScope: () => ({}),
    },
  } as unknown as RuleContext;
}

describe("isFunctionComponentName", () => {
  it.each([
    ["Component", true],
    ["MyComponent", true],
    ["A", true],
    ["component", false],
    ["myComponent", false],
    ["useState", false],
  ])("isFunctionComponentName(%s) === %s", (name, expected) => {
    expect(isFunctionComponentName(name)).toBe(expected);
  });
});

describe("isFunctionComponentNameLoose", () => {
  it.each([
    ["Component", true],
    ["MyComponent", true],
    ["A", true],
    ["RenderHeader", true],
    ["component", false],
    ["useState", false],
  ])("isFunctionComponentNameLoose(%s) === %s", (name, expected) => {
    expect(isFunctionComponentNameLoose(name)).toBe(expected);
  });
});

describe("getFunctionComponentFlagFromInitPath", () => {
  it("should detect memo flag", () => {
    const code = "const Component = memo(() => {})";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          expect(initPath).not.toBeNull();
          const flag = getFunctionComponentFlagFromInitPath(initPath);
          expect(flag & FunctionComponentFlag.Memo).not.toBe(0n);
          expect(flag & FunctionComponentFlag.ForwardRef).toBe(0n);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should detect forwardRef flag", () => {
    const code = "const Component = forwardRef(() => {})";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          expect(initPath).not.toBeNull();
          const flag = getFunctionComponentFlagFromInitPath(initPath);
          expect(flag & FunctionComponentFlag.ForwardRef).not.toBe(0n);
          expect(flag & FunctionComponentFlag.Memo).toBe(0n);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should detect both memo and forwardRef flags", () => {
    const code = "const Component = memo(forwardRef(() => {}))";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          expect(initPath).not.toBeNull();
          const flag = getFunctionComponentFlagFromInitPath(initPath);
          expect(flag & FunctionComponentFlag.Memo).not.toBe(0n);
          expect(flag & FunctionComponentFlag.ForwardRef).not.toBe(0n);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return None for null initPath", () => {
    expect(getFunctionComponentFlagFromInitPath(null)).toBe(FunctionComponentFlag.None);
  });
});

describe("isFunctionComponentWrapperCall", () => {
  const context = createMockContext();

  it.each([
    ["memo(() => {})", true],
    ["forwardRef(() => {})", true],
    ["React.memo(() => {})", true],
    ["React.forwardRef(() => {})", true],
    ["custom(() => {})", false],
  ])("isFunctionComponentWrapperCall(%s) === %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isFunctionComponentWrapperCall(context, node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isFunctionComponentWrapperCallback", () => {
  const context = createMockContext();

  it.each([
    ["memo(() => {})", true],
    ["forwardRef(() => {})", true],
    ["React.memo(() => {})", true],
    ["custom(() => {})", false],
  ])("isFunctionComponentWrapperCallback(%s) === %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionComponentWrapperCallback(context, node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("getFunctionComponentId", () => {
  const context = createMockContext();

  it.each([
    ["function Component() {}", AST.FunctionDeclaration, "Component"],
    ["const Component = () => {}", AST.ArrowFunctionExpression, "Component"],
    ["const Component = memo(() => {})", AST.ArrowFunctionExpression, "Component"],
    ["const Component = memo(forwardRef(() => {}))", AST.ArrowFunctionExpression, "Component"],
  ])("should get function component id for %s", (code, expectedType, expectedName) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node) && node.type === expectedType) {
          const id = getFunctionComponentId(context, node);
          expect(id).not.toBeNull();
          if (id?.type === AST.Identifier) {
            expect(id.name).toBe(expectedName);
          }
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isFunctionWithLooseComponentName", () => {
  const context = createMockContext();

  it.each([
    ["function Component() {}", true],
    ["function Render() {}", true],
    ["function helper() {}", false],
    ["const helper = () => {}", false],
  ])("isFunctionWithLooseComponentName(%s) === %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionWithLooseComponentName(context, node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should allow none when specified", () => {
    const code = "memo(() => {})";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionWithLooseComponentName(context, node, true)).toBe(true);
          expect(isFunctionWithLooseComponentName(context, node, false)).toBe(false);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isFunctionComponentDefinition", () => {
  const context = createMockContext();

  it.each([
    ["function Component() { return <div /> }", true],
    ["const Component = () => <div />", true],
    ["const Component = memo(() => <div />)", true],
    ["function helper() { return 1 }", false],
    ["const helper = () => 1", false],
  ])("isFunctionComponentDefinition(%s) === %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should exclude functions defined as object methods when hint is set", () => {
    const code = "const obj = { Component() { return <div /> } }";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
            | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsObjectMethod;
          expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);

          const hintWithoutExclude = DEFAULT_COMPONENT_DETECTION_HINT
            & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsObjectMethod;
          expect(isFunctionComponentDefinition(context, node, hintWithoutExclude)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should exclude functions defined as class methods when hint is set", () => {
    const code = "class Foo { Component() { return <div /> } }";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
            | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsClassMethod;
          expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should exclude functions in JSX expression containers", () => {
    const code = "const x = <div onClick={() => <div />} />";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(false);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});
