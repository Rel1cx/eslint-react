/// <reference types="node" />

import { getFirstNodeOfType, getFixturesRootDir } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  is,
  isClass,
  isDirective,
  isExpression,
  isFunction,
  isIdentifier,
  isJSX,
  isJSXElement,
  isJSXElementOrFragment,
  isJSXFragment,
  isJSXTagNameExpression,
  isOneOf,
  isProperty,
  isPropertyOrMethod,
  isTypeAssertionExpression,
  isTypeExpression,
} from "./check";

describe("is", () => {
  it("should return true when the node matches the given type", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("const a = 1;", AST.Identifier);
    expect(is(AST.Identifier)(node)).toBe(true);
  });

  it("should return false when the node does not match the given type", () => {
    const node = getFirstNodeOfType<TSESTree.Literal>("const a = 1;", AST.Literal);
    expect(is(AST.Identifier)(node)).toBe(false);
  });
});

describe("isOneOf", () => {
  it("should return true when the node matches one of the given types", () => {
    const node = getFirstNodeOfType<TSESTree.Literal>("const a = 1;", AST.Literal);
    expect(isOneOf([AST.Identifier, AST.Literal])(node)).toBe(true);
  });

  it("should return false when the node matches none of the given types", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("const a = 1;", AST.Identifier);
    expect(isOneOf([AST.Literal, AST.CallExpression])(node)).toBe(false);
  });
});

describe("isDirective", () => {
  it("should return true for a string literal expression statement", () => {
    const node = getFirstNodeOfType<TSESTree.ExpressionStatement>('"use strict";', AST.ExpressionStatement);
    expect(isDirective(node)).toBe(true);
  });

  it("should return true for any ExpressionStatement when no directive name is provided", () => {
    const node = getFirstNodeOfType<TSESTree.ExpressionStatement>("foo();", AST.ExpressionStatement);
    expect(isDirective(node)).toBe(true);
  });

  it("should return false for a non-directive expression statement when a directive name is provided", () => {
    const node = getFirstNodeOfType<TSESTree.ExpressionStatement>("foo();", AST.ExpressionStatement);
    expect(isDirective(node, "use strict")).toBe(false);
  });

  it("should return true when the directive name matches", () => {
    const node = getFirstNodeOfType<TSESTree.ExpressionStatement>('"use strict";', AST.ExpressionStatement);
    expect(isDirective(node, "use strict")).toBe(true);
  });

  it("should return false when the directive name does not match", () => {
    const node = getFirstNodeOfType<TSESTree.ExpressionStatement>('"use strict";', AST.ExpressionStatement);
    expect(isDirective(node, "use asm")).toBe(false);
  });
});

describe("isIdentifier", () => {
  it("should return true for an Identifier node", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("const a = 1;", AST.Identifier);
    expect(isIdentifier(node)).toBe(true);
  });

  it("should return false for a non-Identifier node", () => {
    const node = getFirstNodeOfType<TSESTree.Literal>("const a = 1;", AST.Literal);
    expect(isIdentifier(node)).toBe(false);
  });

  it("should return true when the identifier name matches", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("const a = 1;", AST.Identifier);
    expect(isIdentifier(node, "a")).toBe(true);
  });

  it("should return false when the identifier name does not match", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("const a = 1;", AST.Identifier);
    expect(isIdentifier(node, "b")).toBe(false);
  });
});

describe("isClass", () => {
  it("should return true for a ClassDeclaration", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>("class A {}", AST.ClassDeclaration);
    expect(isClass(node)).toBe(true);
  });

  it("should return true for a ClassExpression", () => {
    const node = getFirstNodeOfType<TSESTree.ClassExpression>("const A = class {}", AST.ClassExpression);
    expect(isClass(node)).toBe(true);
  });

  it("should return false for a non-class node", () => {
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>("function f() {}", AST.FunctionDeclaration);
    expect(isClass(node)).toBe(false);
  });
});

describe("isFunction", () => {
  it("should return true for a FunctionDeclaration", () => {
    const node = getFirstNodeOfType<TSESTree.FunctionDeclaration>("function f() {}", AST.FunctionDeclaration);
    expect(isFunction(node)).toBe(true);
  });

  it("should return true for a FunctionExpression", () => {
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>("const f = function() {}", AST.FunctionExpression);
    expect(isFunction(node)).toBe(true);
  });

  it("should return true for an ArrowFunctionExpression", () => {
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>("const f = () => {}", AST.ArrowFunctionExpression);
    expect(isFunction(node)).toBe(true);
  });

  it("should return false for a non-function node", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>("class A {}", AST.ClassDeclaration);
    expect(isFunction(node)).toBe(false);
  });
});

describe("isProperty", () => {
  it("should return true for a PropertyDefinition", () => {
    const node = getFirstNodeOfType<TSESTree.PropertyDefinition>("class A { x = 1; }", AST.PropertyDefinition);
    expect(isProperty(node)).toBe(true);
  });

  it("should return true for a TSPropertySignature", () => {
    const node = getFirstNodeOfType<TSESTree.TSPropertySignature>("interface A { x: number; }", AST.TSPropertySignature);
    expect(isProperty(node)).toBe(true);
  });

  it("should return true for a TSIndexSignature", () => {
    const node = getFirstNodeOfType<TSESTree.TSIndexSignature>("interface A { [key: string]: number; }", AST.TSIndexSignature);
    expect(isProperty(node)).toBe(true);
  });

  it("should return true for a TSParameterProperty", () => {
    const node = getFirstNodeOfType<TSESTree.TSParameterProperty>("class A { constructor(private x: number) {} }", AST.TSParameterProperty);
    expect(isProperty(node)).toBe(true);
  });

  it("should return false for a MethodDefinition", () => {
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>("class A { m() {} }", AST.MethodDefinition);
    expect(isProperty(node)).toBe(false);
  });
});

describe("isPropertyOrMethod", () => {
  it("should return true for a PropertyDefinition", () => {
    const node = getFirstNodeOfType<TSESTree.PropertyDefinition>("class A { x = 1; }", AST.PropertyDefinition);
    expect(isPropertyOrMethod(node)).toBe(true);
  });

  it("should return true for a MethodDefinition", () => {
    const node = getFirstNodeOfType<TSESTree.MethodDefinition>("class A { m() {} }", AST.MethodDefinition);
    expect(isPropertyOrMethod(node)).toBe(true);
  });

  it("should return false for a TSPropertySignature", () => {
    const node = getFirstNodeOfType<TSESTree.TSPropertySignature>("interface A { x: number; }", AST.TSPropertySignature);
    expect(isPropertyOrMethod(node)).toBe(false);
  });
});

describe("JSX guards", () => {
  it("isJSXElement should return true for a JSXElement", () => {
    const node = getFirstNodeOfType<TSESTree.JSXElement>("<div />", AST.JSXElement);
    expect(isJSXElement(node)).toBe(true);
  });

  it("isJSXElement should return false for a JSXFragment", () => {
    const node = getFirstNodeOfType<TSESTree.JSXFragment>("<></>", AST.JSXFragment);
    expect(isJSXElement(node)).toBe(false);
  });

  it("isJSXFragment should return true for a JSXFragment", () => {
    const node = getFirstNodeOfType<TSESTree.JSXFragment>("<></>", AST.JSXFragment);
    expect(isJSXFragment(node)).toBe(true);
  });

  it("isJSXFragment should return false for a JSXElement", () => {
    const node = getFirstNodeOfType<TSESTree.JSXElement>("<div />", AST.JSXElement);
    expect(isJSXFragment(node)).toBe(false);
  });

  it("isJSXElementOrFragment should return true for a JSXElement", () => {
    const node = getFirstNodeOfType<TSESTree.JSXElement>("<div />", AST.JSXElement);
    expect(isJSXElementOrFragment(node)).toBe(true);
  });

  it("isJSXElementOrFragment should return true for a JSXFragment", () => {
    const node = getFirstNodeOfType<TSESTree.JSXFragment>("<></>", AST.JSXFragment);
    expect(isJSXElementOrFragment(node)).toBe(true);
  });

  it("isJSXTagNameExpression should return true for a JSXIdentifier", () => {
    const node = getFirstNodeOfType<TSESTree.JSXIdentifier>("<div />", AST.JSXIdentifier);
    expect(isJSXTagNameExpression(node)).toBe(true);
  });

  it("isJSXTagNameExpression should return true for a JSXMemberExpression", () => {
    const node = getFirstNodeOfType<TSESTree.JSXMemberExpression>("<A.B />", AST.JSXMemberExpression);
    expect(isJSXTagNameExpression(node)).toBe(true);
  });

  it("isJSXTagNameExpression should return true for a JSXNamespacedName", () => {
    const node = getFirstNodeOfType<TSESTree.JSXNamespacedName>("<ns:name />", AST.JSXNamespacedName);
    expect(isJSXTagNameExpression(node)).toBe(true);
  });

  it("isJSXTagNameExpression should return false for a JSXAttribute", () => {
    const node = getFirstNodeOfType<TSESTree.JSXAttribute>('<div id="a" />', AST.JSXAttribute);
    expect(isJSXTagNameExpression(node)).toBe(false);
  });

  it("isJSX should return true for JSX nodes", () => {
    const node = getFirstNodeOfType<TSESTree.JSXElement>("<div />", AST.JSXElement);
    expect(isJSX(node)).toBe(true);
  });

  it("isJSX should return false for non-JSX nodes", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("const a = 1;", AST.Identifier);
    expect(isJSX(node)).toBe(false);
  });
});

describe("isExpression", () => {
  it("should return true for a JavaScript expression", () => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>("foo();", AST.CallExpression);
    expect(isExpression(node)).toBe(true);
  });

  it("should return true for a JSX expression", () => {
    const node = getFirstNodeOfType<TSESTree.JSXElement>("<div />", AST.JSXElement);
    expect(isExpression(node)).toBe(true);
  });

  it("should return true for a TypeScript expression", () => {
    const node = getFirstNodeOfType<TSESTree.TSAsExpression>("const a = 1 as number;", AST.TSAsExpression);
    expect(isExpression(node)).toBe(true);
  });

  it("should return true for a pattern included in TSESTree.Expression", () => {
    const node = getFirstNodeOfType<TSESTree.ArrayPattern>("const [a] = value;", AST.ArrayPattern);
    expect(isExpression(node)).toBe(true);
  });

  it("should return false for a non-expression node", () => {
    const node = getFirstNodeOfType<TSESTree.ExpressionStatement>("foo();", AST.ExpressionStatement);
    expect(isExpression(node)).toBe(false);
  });
});

describe("TypeScript type guards", () => {
  it("isTypeExpression should return true for a TSAsExpression", () => {
    const node = getFirstNodeOfType<TSESTree.TSAsExpression>("const a = 1 as number;", AST.TSAsExpression);
    expect(isTypeExpression(node)).toBe(true);
  });

  it("isTypeExpression should return true for a TSTypeAssertion", () => {
    const node = getFirstNodeOfType<TSESTree.TSTypeAssertion>("const a = <number>1;", AST.TSTypeAssertion, {
      filePath: path.join(getFixturesRootDir(), "estree.ts"),
      jsx: false,
    });
    expect(isTypeExpression(node)).toBe(true);
  });

  it("isTypeExpression should return true for a TSNonNullExpression", () => {
    const node = getFirstNodeOfType<TSESTree.TSNonNullExpression>("const a = b!;", AST.TSNonNullExpression);
    expect(isTypeExpression(node)).toBe(true);
  });

  it("isTypeExpression should return true for a TSSatisfiesExpression", () => {
    const node = getFirstNodeOfType<TSESTree.TSSatisfiesExpression>("const a = 1 satisfies number;", AST.TSSatisfiesExpression);
    expect(isTypeExpression(node)).toBe(true);
  });

  it("isTypeExpression should return true for a TSInstantiationExpression", () => {
    const node = getFirstNodeOfType<TSESTree.TSInstantiationExpression>("const a = foo<number>;", AST.TSInstantiationExpression);
    expect(isTypeExpression(node)).toBe(true);
  });

  it("isTypeAssertionExpression should return true for a TSAsExpression", () => {
    const node = getFirstNodeOfType<TSESTree.TSAsExpression>("const a = 1 as number;", AST.TSAsExpression);
    expect(isTypeAssertionExpression(node)).toBe(true);
  });

  it("isTypeAssertionExpression should return true for a TSTypeAssertion", () => {
    const node = getFirstNodeOfType<TSESTree.TSTypeAssertion>("const a = <number>1;", AST.TSTypeAssertion, {
      filePath: path.join(getFixturesRootDir(), "estree.ts"),
      jsx: false,
    });
    expect(isTypeAssertionExpression(node)).toBe(true);
  });

  it("isTypeAssertionExpression should return true for a TSNonNullExpression", () => {
    const node = getFirstNodeOfType<TSESTree.TSNonNullExpression>("const a = b!;", AST.TSNonNullExpression);
    expect(isTypeAssertionExpression(node)).toBe(true);
  });

  it("isTypeAssertionExpression should return true for a TSSatisfiesExpression", () => {
    const node = getFirstNodeOfType<TSESTree.TSSatisfiesExpression>("const a = 1 satisfies number;", AST.TSSatisfiesExpression);
    expect(isTypeAssertionExpression(node)).toBe(true);
  });

  it("isTypeAssertionExpression should return false for a TSInstantiationExpression", () => {
    const node = getFirstNodeOfType<TSESTree.TSInstantiationExpression>("const a = foo<number>;", AST.TSInstantiationExpression);
    expect(isTypeAssertionExpression(node)).toBe(false);
  });

  it("isTypeExpression should return false for a non-type-expression node", () => {
    const node = getFirstNodeOfType<TSESTree.Identifier>("const a = 1;", AST.Identifier);
    expect(isTypeExpression(node)).toBe(false);
  });
});
