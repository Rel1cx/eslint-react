import { Check } from "@eslint-react/ast";
import { getFirstNodeOfType, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { getFunctionDirectives, getFunctionId, getFunctionInitPath, isFunctionEmpty, isFunctionHasCallInInitPath, isFunctionHasDirective } from "./function";

describe("isFunctionHasCallInInitPath", () => {
  it("should detect memo call when callee is wrapped in TSAsExpression", () => {
    const code = "const Component = (memo as any)(() => {})";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const initPath = getFunctionInitPath(node);
    const result = initPath != null && isFunctionHasCallInInitPath("memo", initPath);
    expect(result).toBe(true);
  });

  it("should detect React.memo call when callee is wrapped in TSAsExpression", () => {
    const code = "const Component = (React.memo as any)(() => {})";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const initPath = getFunctionInitPath(node);
    const result = initPath != null && isFunctionHasCallInInitPath("memo", initPath);
    expect(result).toBe(true);
  });

  it("should detect memo call when callee is wrapped in TSSatisfiesExpression", () => {
    const code = "const Component = (memo satisfies typeof memo)(() => {})";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const initPath = getFunctionInitPath(node);
    const result = initPath != null && isFunctionHasCallInInitPath("memo", initPath);
    expect(result).toBe(true);
  });

  it("should detect memo in nested HOC init path", () => {
    const code = "const Component = memo(forwardRef(() => {}))";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const initPath = getFunctionInitPath(node);
    const result = initPath != null && isFunctionHasCallInInitPath("memo", initPath);
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
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node) && node.type === expectedType) {
          const id = getFunctionId(node);
          expect(id).not.toBeNull();
          if (id != null && Check.isIdentifier(id)) {
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
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionId(node)).toBeNull();
  });

  it("should return null for computed object property key", () => {
    const code = `const obj = { ["Component"]: () => {} }`;
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionId(node)).toBeNull();
  });

  it("should return null for computed class property key (consistent with object property case)", () => {
    const code = `class A { ["Component"] = () => {} }`;
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionId(node)).toBeNull();
  });

  it("should return null for function in conditional test position", () => {
    const code = "const x = (() => {}) ? a : b";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionId(node)).toBeNull();
  });

  it("should return null for type-wrapped function in conditional test position", () => {
    const code = "const x = ((() => {}) as any) ? a : b";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionId(node)).toBeNull();
  });

  it("should get function id for function in conditional alternate position", () => {
    const code = "const x = cond ? a : () => {}";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const id = getFunctionId(node);
    expect(id).not.toBeNull();
    if (id != null && Check.isIdentifier(id)) {
      expect(id.name).toBe("x");
    }
  });

  it("should return member expression for assignment to member expression", () => {
    const code = "obj.Component = () => {}";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const id = getFunctionId(node);
    expect(id?.type).toBe(AST.MemberExpression);
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
    simpleTraverse(parseCode(code).ast, {
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
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).toBeNull();
  });

  it("should return null for HOC inside object property (not supported by getFunctionInitPath)", () => {
    const code = "const Components = { Nav: memo(() => {}) }";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).toBeNull();
  });

  it("should return null for nested HOC inside object property (not supported by getFunctionInitPath)", () => {
    const code = "const Components = { Nav: memo(forwardRef(() => {})) }";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).toBeNull();
  });

  it("should return null for triple-nested HOC", () => {
    const code = "const Component = memo(memo(forwardRef(() => {})))";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).toBeNull();
  });

  it("should return null for IIFE callee arrow function (not an HOC argument)", () => {
    const code = "const f = (() => {})()";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).toBeNull();
  });

  it("should return null for IIFE callee function expression (not an HOC argument)", () => {
    const code = "const f = (function(){})()";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    expect(getFunctionInitPath(node)).toBeNull();
  });

  it("should return null for type-wrapped IIFE callee (not an HOC argument)", () => {
    const code = "const f = ((() => {}) as any)()";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).toBeNull();
  });

  it("should still recognize HOC argument position", () => {
    const code = "const f = memo(() => {})";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).not.toBeNull();
  });

  it("should still recognize a type-wrapped HOC argument", () => {
    const code = "const f = memo((() => {}) as any)";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).not.toBeNull();
  });

  it("should still recognize a type-wrapped nested HOC argument", () => {
    const code = "const f = memo(forwardRef((() => {}) as any))";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionInitPath(node)).not.toBeNull();
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
    simpleTraverse(parseCode(code).ast, {
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
    simpleTraverse(parseCode(code).ast, {
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
    simpleTraverse(parseCode(code).ast, {
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
    simpleTraverse(parseCode(code).ast, {
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

  it("should not treat a string literal statement after other statements as a directive", () => {
    const code = `function Foo() { bar(); "use strict"; }`;
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(getFunctionDirectives(node)).toHaveLength(0);
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
    simpleTraverse(parseCode(code).ast, {
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
