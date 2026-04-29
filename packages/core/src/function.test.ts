/// <reference types="node" />

import { Check } from "@eslint-react/ast";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../test";
import {
  getFunctionDirectives,
  getFunctionId,
  getFunctionInitPath,
  isFunctionEmpty,
  isFunctionHasCallInInitPath,
  isFunctionHasDirective,
} from "./function";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
  });
}

describe("isFunctionHasCallInInitPath", () => {
  it("should detect memo call when callee is wrapped in TSAsExpression", () => {
    const code = "const Component = (memo as any)(() => {})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          if (initPath != null) {
            result = isFunctionHasCallInInitPath("memo", initPath);
          }
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should detect React.memo call when callee is wrapped in TSAsExpression", () => {
    const code = "const Component = (React.memo as any)(() => {})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          if (initPath != null) {
            result = isFunctionHasCallInInitPath("memo", initPath);
          }
        }
      },
    }, true);
    expect(result).toBe(true);
  });

  it("should detect memo call when callee is wrapped in TSSatisfiesExpression", () => {
    const code = "const Component = (memo satisfies typeof memo)(() => {})";
    let result = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          const initPath = getFunctionInitPath(node);
          if (initPath != null) {
            result = isFunctionHasCallInInitPath("memo", initPath);
          }
        }
      },
    }, true);
    expect(result).toBe(true);
  });
});

describe("getFunctionId", () => {
  it.each([
    ["function Component() {}", AST.FunctionDeclaration, "Component"],
    ["const Component = () => {}", AST.ArrowFunctionExpression, "Component"],
    ["const Component = function() {}", AST.FunctionExpression, "Component"],
    ["const Component = function Named() {}", AST.FunctionExpression, "Named"],
    ["Component = () => {}", AST.ArrowFunctionExpression, "Component"],
    ["const obj = { Component() {} }", AST.FunctionExpression, "Component"],
    ["const obj = { Component: () => {} }", AST.ArrowFunctionExpression, "Component"],
    ["class Foo { Component() {} }", AST.FunctionExpression, "Component"],
    ["class Foo { Component = () => {} }", AST.ArrowFunctionExpression, "Component"],
    ["const { Component = () => {} } = {}", AST.ArrowFunctionExpression, "Component"],
    ["const Component = condition ? () => {} : () => {}", AST.ArrowFunctionExpression, "Component"],
    ["const Component = (() => {})!", AST.ArrowFunctionExpression, "Component"],
    ["const Component = (() => {}) as FunctionComponent", AST.ArrowFunctionExpression, "Component"],
    ["const Component = (() => {}) satisfies FunctionComponent", AST.ArrowFunctionExpression, "Component"],
  ])("should get function id for %s", (code, expectedType, expectedName) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node) && node.type === expectedType) {
          const id = getFunctionId(node);
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

  it("should return null for anonymous function without binding", () => {
    const code = "(() => {})()";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          expect(getFunctionId(node)).toBeNull();
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("getFunctionInitPath", () => {
  it.each([
    ["function Component() {}", AST.FunctionDeclaration, true],
    ["const Component = () => {}", AST.ArrowFunctionExpression, true],
    ["const Component = memo(() => {})", AST.ArrowFunctionExpression, true],
    ["const Component = memo(forwardRef(() => {}))", AST.ArrowFunctionExpression, true],
    ["const Components = { Nav: () => {} }", AST.ArrowFunctionExpression, true],
    ["class Component { Nav() {} }", AST.FunctionExpression, true],
    ["class Component { Nav = () => {} }", AST.ArrowFunctionExpression, true],
    ["const Component = (() => {}) as any", AST.ArrowFunctionExpression, true],
  ])("should get init path for %s", (code, expectedType, expectedNotNull) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node) && node.type === expectedType) {
          const initPath = getFunctionInitPath(node);
          if (expectedNotNull) {
            expect(initPath).not.toBeNull();
          } else {
            expect(initPath).toBeNull();
          }
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return null for unrecognized patterns", () => {
    const code = "(() => {})()";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          expect(getFunctionInitPath(node)).toBeNull();
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isFunctionEmpty", () => {
  it.each([
    ["function Empty() {}", true],
    ["const Empty = () => {}", true],
    ["function NotEmpty() { return 1; }", false],
    ["const NotEmpty = () => 1", false],
  ])("isFunctionEmpty(%s) === %s", (code, expected) => {
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionEmpty(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("getFunctionDirectives", () => {
  it("should extract 'use strict' directive", () => {
    const code = `function Foo() { "use strict"; return 1; }`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const directives = getFunctionDirectives(node);
          expect(directives).toHaveLength(1);
          expect(directives[0]?.directive).toBe("use strict");
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return empty array for arrow function with expression body", () => {
    const code = "const Foo = () => 1";
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(getFunctionDirectives(node)).toHaveLength(0);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should extract multiple directives", () => {
    const code = `function Foo() { "use strict"; "use client"; return 1; }`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const directives = getFunctionDirectives(node);
          expect(directives).toHaveLength(2);
          expect(directives[0]?.directive).toBe("use strict");
          expect(directives[1]?.directive).toBe("use client");
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isFunctionHasDirective", () => {
  it("should detect 'use strict'", () => {
    const code = `function Foo() { "use strict"; }`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionHasDirective(node, "use strict")).toBe(true);
          expect(isFunctionHasDirective(node, "use client")).toBe(false);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});
