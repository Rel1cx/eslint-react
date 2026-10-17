import { type ParseCodeOptions, collectNodes, fixturePath, getFirstExpression, getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { KNOWN_MUTATING_HOOKS, KNOWN_MUTATING_METHODS, hasRefLikeNameInChain, isNodeWithin, isRefLikeName } from "./helpers";

describe("KNOWN_MUTATING_METHODS", () => {
  it("should contain the in-place array and collection mutators", () => {
    for (const method of ["push", "pop", "shift", "unshift", "splice", "sort", "reverse", "fill", "copyWithin", "set", "add", "delete", "clear"]) {
      expect(KNOWN_MUTATING_METHODS.has(method)).toBe(true);
    }
  });

  it("should not contain non-mutating accessors", () => {
    for (const method of ["map", "filter", "reduce", "forEach", "get", "has", "concat", "slice", "includes"]) {
      expect(KNOWN_MUTATING_METHODS.has(method)).toBe(false);
    }
  });
});

describe("KNOWN_MUTATING_HOOKS", () => {
  it("should contain the navigation hooks whose return values collide with mutating method names", () => {
    for (const hook of ["useHistory", "useNavigate", "useNavigation", "useRouter"]) {
      expect(KNOWN_MUTATING_HOOKS.has(hook)).toBe(true);
    }
  });

  it("should not contain state or ref hooks", () => {
    for (const hook of ["useState", "useReducer", "useRef", "useEffect"]) {
      expect(KNOWN_MUTATING_HOOKS.has(hook)).toBe(false);
    }
  });
});

describe("isRefLikeName", () => {
  it("should match the exact name ref", () => {
    expect(isRefLikeName("ref")).toBe(true);
  });

  it("should match names ending with Ref", () => {
    expect(isRefLikeName("myRef")).toBe(true);
    expect(isRefLikeName("containerRef")).toBe(true);
    expect(isRefLikeName("Ref")).toBe(true);
  });

  it("should not match names merely containing ref", () => {
    expect(isRefLikeName("myref")).toBe(false);
    expect(isRefLikeName("refs")).toBe(false);
    expect(isRefLikeName("reference")).toBe(false);
    expect(isRefLikeName("reflow")).toBe(false);
  });
});

describe("hasRefLikeNameInChain", () => {
  it("should match a chain rooted at a ref-like identifier", () => {
    expect(hasRefLikeNameInChain(getFirstExpression("ref.current;"))).toBe(true);
    expect(hasRefLikeNameInChain(getFirstExpression("myRef.current.value;"))).toBe(true);
  });

  it("should match a chain with a ref-like property segment", () => {
    expect(hasRefLikeNameInChain(getFirstExpression("props.myRef.current;"))).toBe(true);
  });

  it("should match a chain with a ref-like computed key", () => {
    expect(hasRefLikeNameInChain(getFirstExpression("foo[ref];"))).toBe(true);
  });

  it("should not match a chain without any ref-like segment", () => {
    expect(hasRefLikeNameInChain(getFirstExpression("foo.bar.baz;"))).toBe(false);
    expect(hasRefLikeNameInChain(getFirstExpression("foo;"))).toBe(false);
  });

  it("should unwrap optional chains", () => {
    expect(hasRefLikeNameInChain(getFirstExpression("ref?.current;"))).toBe(true);
    expect(hasRefLikeNameInChain(getFirstExpression("foo?.bar;"))).toBe(false);
  });

  it("should unwrap TS type wrappers", () => {
    const options: ParseCodeOptions = { filePath: fixturePath("file.ts") };
    expect(hasRefLikeNameInChain(getFirstExpression("(ref.current as any);", options))).toBe(true);
    expect(hasRefLikeNameInChain(getFirstExpression("(foo.bar)!;", options))).toBe(false);
  });

  it("should not match non-expression nodes", () => {
    const declaration = getFirstNodeOfType<TSESTree.VariableDeclaration>("const ref = null;", AST.VariableDeclaration);
    expect(hasRefLikeNameInChain(declaration)).toBe(false);
  });
});

describe("isNodeWithin", () => {
  it("should match a node within its ancestor", () => {
    const program = getFirstNodeOfType<TSESTree.Program>("function f() { return x; }", AST.Program);
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration);
    const id = getFirstNodeOfType<TSESTree.Identifier>(program, AST.Identifier);
    expect(isNodeWithin(id, fn)).toBe(true);
    expect(isNodeWithin(id, program)).toBe(true);
  });

  it("should match a node within itself", () => {
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>("function f() { return x; }", AST.FunctionDeclaration);
    expect(isNodeWithin(fn, fn)).toBe(true);
  });

  it("should not match an ancestor within its descendant", () => {
    const program = getFirstNodeOfType<TSESTree.Program>("function f() { return x; }", AST.Program);
    const fn = getFirstNodeOfType<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration);
    const id = getFirstNodeOfType<TSESTree.Identifier>(program, AST.Identifier);
    expect(isNodeWithin(fn, id)).toBe(false);
  });

  it("should not match nodes from separate subtrees", () => {
    const program = getFirstNodeOfType<TSESTree.Program>("function f() { return x; } function g() { return y; }", AST.Program);
    const functions = collectNodes<TSESTree.FunctionDeclaration>(program, AST.FunctionDeclaration);
    const x = getFirstNodeOfType<TSESTree.Identifier>(functions.at(0)!, AST.Identifier);
    expect(isNodeWithin(x, functions.at(1)!)).toBe(false);
  });
});
