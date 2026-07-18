import { Check } from "@eslint-react/ast";
import { parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
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
  ])("isHookId for %s === %s", (expr, expected) => {
    const code = `${expr}()`;
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isHookId(node.callee)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isHookDefinition", () => {
  it.each([
    ["function useMyHook() {}", true],
    ["function useFoo() {}", true],
    ["function use() {}", true],
  ])("should return true for hook function declaration: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["function notAHook() {}", false],
  ])("should return false for non-hook function declaration: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["const useBar = () => {}", true],
  ])("should return true for arrow function with hook name: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["const helper = () => {}", false],
  ])("should return false for arrow function without hook name: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isHookDefinition(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isHookDefinition(null)).toBe(false);
  });
});

describe("isHookCall", () => {
  it.each([
    ["useState()", true],
    ["useEffect(() => {})", true],
    ["useMemo(() => {}, [])", true],
    ["React.useState()", true],
  ])("should return true for hook call: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isHookCall(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["notAHook()", false],
    ["user()", false],
  ])("should return false for non-hook call: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isHookCall(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isHookCall(null)).toBe(false);
  });

  it("should return true for hook call with callee wrapped in TSAsExpression", () => {
    const code = "(useState as any)()";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isHookCall(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return true for hook call with type arguments", () => {
    const code = "useState<number>()";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isHookCall(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isHookTag", () => {
  it.each([
    ["useMotionTemplate`literal`", true],
    ["Motion.useMotionTemplate`literal`", true],
  ])("should return true for hook tag: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.TaggedTemplateExpression) {
          expect(isHookTag(node.tag)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it.each([
    ["notAHook`literal`", false],
    ["user`literal`", false],
  ])("should return false for non-hook tag: %s", (code, expected) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.TaggedTemplateExpression) {
          expect(isHookTag(node.tag)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isHookTag(null)).toBe(false);
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
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isUseEffectLikeCall(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should support custom effect hooks via regex", () => {
    const code = "useCustomEffect(() => {})";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isUseEffectLikeCall(node, /^useCustomEffect$/u)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isUseEffectLikeCall(null)).toBe(false);
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
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isUseStateLikeCall(node)).toBe(expected);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should support custom state hooks via regex", () => {
    const code = "useCustomState()";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          expect(isUseStateLikeCall(node, /^useCustomState$/u)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isUseStateLikeCall(null)).toBe(false);
  });
});

describe("isUseEffectSetupCallback", () => {
  it("should return true for first argument of useEffect", () => {
    const code = "useEffect(() => {})";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) {
          expect(isUseEffectSetupCallback(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for second argument of useEffect", () => {
    const code = "useEffect(() => {}, [])";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrayExpression) {
          expect(isUseEffectSetupCallback(node)).toBe(false);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isUseEffectSetupCallback(null)).toBe(false);
  });
});

describe("isUseEffectCleanupCallback", () => {
  it("should return true for cleanup function returned from useEffect setup", () => {
    const code = "useEffect(() => { return () => {}; })";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(true);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for unrelated nested functions", () => {
    const code = "const fn = () => { return () => {}; }";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression && node.parent.type === AST.ReturnStatement) {
          expect(isUseEffectCleanupCallback(node)).toBe(false);
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return false for null", () => {
    expect(isUseEffectCleanupCallback(null)).toBe(false);
  });
});
