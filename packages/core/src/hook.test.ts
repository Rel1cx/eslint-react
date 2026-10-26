import { Check, Traverse } from "@eslint-react/ast";
import { getFirstNodeOfType, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import {
  isHookCall,
  isHookDefinition,
  isHookId,
  isHookName,
  isHookTag,
  isUseEffectCleanupCallback,
  isUseEffectLikeCall,
  isUseEffectSetupCallback,
  isUseRefLikeCall,
  isUseStateLikeCall,
} from "./hook";

describe("isHookName", () => {
  it.each([
    ["useState", true],
    ["useEffect", true],
    ["use", true],
    ["useCustomHook", true],
    ["use123", true],
    ["user", false],
    ["use", true],
    ["use_lowercase", false],
    ["notAHook", false],
  ])("isHookName(%s) === %s", (name, expected) => {
    expect(isHookName(name)).toBe(expected);
  });
});

describe("isHookId", () => {
  it.each([
    ["useState", true],
    ["React.useState", true],
    ["notAHook", false],
    ["user", false],
    // Computed member expressions are not treated as hook ids
    [`React["useState"]`, false],
    ["obj[useState]", false],
    ["React[useState]", false],
  ])("isHookId for %s === %s", (expr, expected) => {
    const code = `${expr}()`;
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isHookId(node.callee)).toBe(expected);
  });
});

describe("isHookDefinition", () => {
  it.each([
    ["function useMyHook() {}", true],
    ["function useFoo() {}", true],
    ["function use() {}", true],
  ])("should return true for hook function declaration: %s", (code, expected) => {
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it.each([
    ["function notAHook() {}", false],
  ])("should return false for non-hook function declaration: %s", (code, expected) => {
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it.each([
    ["const useBar = () => {}", true],
  ])("should return true for arrow function with hook name: %s", (code, expected) => {
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it.each([
    ["const helper = () => {}", false],
  ])("should return false for arrow function without hook name: %s", (code, expected) => {
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for a function used as a destructuring default with a hook name", () => {
    const code = "const { useFoo = () => {} } = obj;";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for function assigned to a member expression with a hook name", () => {
    const code = "obj.useFoo = function() {};";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for function assigned to a computed member expression", () => {
    const code = "obj[useFoo] = function() {};";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });
});

describe("isHookCall", () => {
  it.each([
    ["useState()", true],
    ["useEffect(() => {})", true],
    ["useMemo(() => {}, [])", true],
    ["React.useState()", true],
  ])("should return true for hook call: %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isHookCall(node)).toBe(expected);
  });

  it.each([
    ["notAHook()", false],
    ["user()", false],
  ])("should return false for non-hook call: %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isHookCall(node)).toBe(expected);
  });

  it("should return true for hook call with callee wrapped in TSAsExpression", () => {
    const code = "(useState as any)()";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isHookCall(node)).toBe(true);
  });

  it("should return true for hook call with type arguments", () => {
    const code = "useState<number>()";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isHookCall(node)).toBe(true);
  });

  it("should return false for computed member callees", () => {
    const code = `React["useState"]()`;
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isHookCall(node)).toBe(false);
  });
});

describe("isHookTag", () => {
  it.each([
    ["useMotionTemplate`literal`", true],
    ["Motion.useMotionTemplate`literal`", true],
  ])("should return true for hook tag: %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.TaggedTemplateExpression>(code, AST.TaggedTemplateExpression);
    expect(isHookTag(node.tag)).toBe(expected);
  });

  it.each([
    ["notAHook`literal`", false],
    ["user`literal`", false],
  ])("should return false for non-hook tag: %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.TaggedTemplateExpression>(code, AST.TaggedTemplateExpression);
    expect(isHookTag(node.tag)).toBe(expected);
  });

  it("should return false for computed member tags", () => {
    const code = 'React["useMotionTemplate"]`literal`';
    const node = getFirstNodeOfType<TSESTree.TaggedTemplateExpression>(code, AST.TaggedTemplateExpression);
    expect(isHookTag(node.tag)).toBe(false);
  });

  it("should unwrap type expressions in tags", () => {
    const code = "(useMotionTemplate as any)`literal`";
    const node = getFirstNodeOfType<TSESTree.TaggedTemplateExpression>(code, AST.TaggedTemplateExpression);
    expect(isHookTag(node.tag)).toBe(true);
  });
});

describe("isUseEffectLikeCall", () => {
  it.each([
    ["useEffect(() => {})", true],
    ["useLayoutEffect(() => {})", true],
    ["useInsertionEffect(() => {})", true],
    ["React.useEffect(() => {})", true],
    ["useState()", false],
    ["useMemo(() => {}, [])", false],
    ["customHook()", false],
  ])("isUseEffectLikeCall(%s) === %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isUseEffectLikeCall(node)).toBe(expected);
  });

  it("should support custom effect hooks via regex", () => {
    const code = "useCustomEffect(() => {})";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isUseEffectLikeCall(node, /^useCustomEffect$/u)).toBe(true);
  });
});

describe("isUseStateLikeCall", () => {
  it.each([
    ["useState()", true],
    ["useState(0)", true],
    ["React.useState()", true],
    ["useEffect(() => {})", false],
    ["useReducer(() => {}, {})", false],
  ])("isUseStateLikeCall(%s) === %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isUseStateLikeCall(node)).toBe(expected);
  });

  it("should support custom state hooks via regex", () => {
    const code = "useCustomState()";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isUseStateLikeCall(node, /^useCustomState$/u)).toBe(true);
  });
});

describe("isUseRefLikeCall", () => {
  it.each([
    ["useRef()", true],
    ["React.useRef()", true],
    ["useState()", false],
    ["notAHook()", false],
    [`React["useRef"]()`, false],
  ])("isUseRefLikeCall(%s) === %s", (code, expected) => {
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isUseRefLikeCall(node)).toBe(expected);
  });

  it("should support custom ref hooks via regex", () => {
    const code = "useCustomRef()";
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isUseRefLikeCall(node, /^useCustomRef$/u)).toBe(true);
    expect(isUseRefLikeCall(node)).toBe(false);
  });
});

describe("isUseEffectSetupCallback", () => {
  it("should return true for first argument of useEffect", () => {
    const code = "useEffect(() => {})";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(isUseEffectSetupCallback(node)).toBe(true);
  });

  it("should return false for second argument of useEffect", () => {
    const code = "useEffect(() => {}, [])";
    const node = getFirstNodeOfType<TSESTree.ArrayExpression>(code, AST.ArrayExpression);
    expect(isUseEffectSetupCallback(node)).toBe(false);
  });

  it("should return false for a function passed as a non-first argument", () => {
    const code = "useEffect(() => {}, () => {})";
    const fns: TSESTree.ArrowFunctionExpression[] = [];
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) fns.push(node);
      },
      setParentPointers: true,
    });
    expect(fns).toHaveLength(2);
    expect(isUseEffectSetupCallback(fns[0]!)).toBe(true);
    expect(isUseEffectSetupCallback(fns[1]!)).toBe(false);
  });

  it("should return true when the setup callback is wrapped in a type expression", () => {
    const code = "useEffect((() => {}) as any)";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(isUseEffectSetupCallback(node)).toBe(true);
  });
});

describe("isUseEffectCleanupCallback", () => {
  it("should return true for cleanup function returned from useEffect setup", () => {
    const code = "useEffect(() => { return () => {}; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for unrelated nested functions", () => {
    const code = "const fn = () => { return () => {}; }";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for cleanup function returned via variable reference", () => {
    const code = "useEffect(() => { const cleanup = () => {}; return cleanup; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.VariableDeclarator) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for cleanup function returned via arrow expression body", () => {
    const code = "useEffect(() => () => {})";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ArrowFunctionExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for an expression-body cleanup wrapped in a type expression", () => {
    const code = "useEffect(() => (() => {}) as any)";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.TSAsExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for arrow function passed as argument to the returned expression", () => {
    const code = "useEffect(() => { return foo(() => {}); })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.CallExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for the innermost arrow nested deeper than the cleanup", () => {
    const code = "useEffect(() => () => () => {})";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (
          node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ArrowFunctionExpression
          && node.parent.parent.type === AST.ArrowFunctionExpression
        ) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for cleanup function wrapped in a type expression", () => {
    const code = "useEffect(() => { return (() => {}) as any; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.TSAsExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for cleanup behind a conditional return (not the direct return value)", () => {
    const code = "useEffect(() => { return cond ? () => {} : null; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ConditionalExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for cleanup behind a logical expression return", () => {
    const code = "useEffect(() => { return maybeCleanup ?? (() => {}); })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.LogicalExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for cleanup via arrow expression body when the useEffect call is nested in an outer return", () => {
    const code = "function outer() { return useEffect(() => () => {}); }";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ArrowFunctionExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for cleanup returned from setup when the useEffect call is nested in an outer return", () => {
    const code = "function outer() { return useEffect(() => { return () => {}; }); }";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for cleanup via arrow expression body when the useEffect call is nested in a conditional outer return", () => {
    const code = "function useCustom() { return cond ? useEffect(() => () => {}) : null; }";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ArrowFunctionExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for cleanup returned from a function expression setup", () => {
    const code = "useEffect(function setup() { return () => {}; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for cleanups returned from multiple return statements of the setup", () => {
    const code = "useEffect(() => { if (cond) { return () => {}; } return () => {}; })";
    let count = 0;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          count += 1;
        }
      },
      setParentPointers: true,
    });
    expect(count).toBe(2);
  });

  it("should return false for a function returned from a nested function inside the setup", () => {
    const code = "useEffect(() => { function inner() { return () => {}; } })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for a function returned from the cleanup itself (return nested inside cleanup)", () => {
    const code = "useEffect(() => { return () => { return () => {}; }; })";
    let cleanupFound = false;
    let nestedFound = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type !== AST.ArrowFunctionExpression || node.parent.type !== AST.ReturnStatement) return;
        // the cleanup is returned directly from the setup: ReturnStatement -> BlockStatement -> setup arrow -> CallExpression
        if (node.parent.parent.parent?.parent?.type === AST.CallExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          cleanupFound = true;
        } else {
          // the innermost arrow is returned from the cleanup, not from the setup
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          nestedFound = true;
        }
      },
      setParentPointers: true,
    });
    expect(cleanupFound).toBe(true);
    expect(nestedFound).toBe(true);
  });

  it("should return false for a function nested in the returned object literal", () => {
    const code = "useEffect(() => { return { cleanup: () => {} }; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.Property) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return false for an arrow nested in an IIFE inside the setup", () => {
    const code = "useEffect(() => { const g = (() => () => {})(); })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ArrowFunctionExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for an expression-body cleanup whose own body contains a bare return", () => {
    const code = "useEffect(() => () => { return; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ArrowFunctionExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for a named function referenced in the setup's return statement", () => {
    const code = "useEffect(() => { const cleanup = () => {}; return cleanup; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.Identifier && node.name === "cleanup" && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for a cleanup returned from a setup wrapped in a TS as-expression", () => {
    const code = "useEffect((() => { return () => {}; }) as any)";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return true for a cleanup wrapped in a TS as-expression in the return statement", () => {
    const code = "useEffect(() => { return (() => {}) as any; })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.TSAsExpression) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });
});
