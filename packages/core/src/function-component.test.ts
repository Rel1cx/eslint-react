import { Check, Traverse } from "@eslint-react/ast";
import { createMockContext, getFirstNodeOfType, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

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

describe("isFunctionComponentName", () => {
  it.each([
    ["Component", true],
    ["MyComponent", true],
    ["A", true],
    ["component", false],
    ["myComponent", false],
    ["useState", false],
    ["_Component", false],
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
    ["_Component", true],
  ])("isFunctionComponentNameLoose(%s) === %s", (name, expected) => {
    expect(isFunctionComponentNameLoose(name)).toBe(expected);
  });
});

describe("getFunctionComponentFlagFromInitPath", () => {
  it("should detect memo flag", () => {
    const code = "const Component = memo(() => {})";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const initPath = getFunctionInitPath(node);
    expect(initPath).not.toBeNull();
    const flag = getFunctionComponentFlagFromInitPath(initPath);
    expect(flag & FunctionComponentFlag.Memo).not.toBe(0n);
    expect(flag & FunctionComponentFlag.ForwardRef).toBe(0n);
  });

  it("should detect forwardRef flag", () => {
    const code = "const Component = forwardRef(() => {})";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const initPath = getFunctionInitPath(node);
    expect(initPath).not.toBeNull();
    const flag = getFunctionComponentFlagFromInitPath(initPath);
    expect(flag & FunctionComponentFlag.ForwardRef).not.toBe(0n);
    expect(flag & FunctionComponentFlag.Memo).toBe(0n);
  });

  it("should detect both memo and forwardRef flags", () => {
    const code = "const Component = memo(forwardRef(() => {}))";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const initPath = getFunctionInitPath(node);
    expect(initPath).not.toBeNull();
    const flag = getFunctionComponentFlagFromInitPath(initPath);
    expect(flag & FunctionComponentFlag.Memo).not.toBe(0n);
    expect(flag & FunctionComponentFlag.ForwardRef).not.toBe(0n);
  });

  it("should keep the memo flag when the wrapper call is a later argument of a generic HOC", () => {
    // memo's own first argument is still the wrapped component; the outer call is
    // not a component wrapper, so its argument position carries no React semantics.
    const code = "const Component = compose(enhance, memo(() => {}))";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const initPath = getFunctionInitPath(node);
    expect(initPath).not.toBeNull();
    const flag = getFunctionComponentFlagFromInitPath(initPath);
    expect(flag & FunctionComponentFlag.Memo).not.toBe(0n);
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
    const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);
    expect(isFunctionComponentWrapperCall(context, node)).toBe(expected);
  });
});

describe("isFunctionComponentWrapperCallback", () => {
  const context = createMockContext();

  it.each([
    ["memo(() => {})", true],
    ["forwardRef(() => {})", true],
    ["React.memo(() => {})", true],
    ["memo((() => {}) as any)", true],
    ["custom(() => {})", false],
  ])("isFunctionComponentWrapperCallback(%s) === %s", (code, expected) => {
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionComponentWrapperCallback(context, node)).toBe(expected);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("treats only the first argument of memo() as a wrapper callback", () => {
    const code = "memo(() => <div />, () => true)";
    const fns: TSESTree.ArrowFunctionExpression[] = [];
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) fns.push(node);
      },
      setParentPointers: true,
    });
    expect(fns).toHaveLength(2);
    expect(isFunctionComponentWrapperCallback(context, fns[0]!)).toBe(true);
    expect(isFunctionComponentWrapperCallback(context, fns[1]!)).toBe(false);
  });

  it("does not treat a named propsAreEqual comparator as a wrapper callback", () => {
    const code = "memo(Component, function propsAreEqual() { return true })";
    const fn = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    expect(isFunctionComponentWrapperCallback(context, fn)).toBe(false);
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
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node) && node.type === expectedType) {
          const id = getFunctionComponentId(context, node);
          expect(id).not.toBeNull();
          if (id != null && Check.isIdentifier(id)) {
            expect(id.name).toBe(expectedName);
          }
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should not resolve the id of memo's propsAreEqual comparator", () => {
    const code = "const Component = memo(ComponentImpl, (prev, next) => true)";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionComponentId(context, node)).toBeNull();
  });

  it("should resolve the id of a type-wrapped first argument", () => {
    const code = "const Component = memo((() => {}) as any)";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const id = getFunctionComponentId(context, node);
    expect(id?.type).toBe(AST.Identifier);
    if (id?.type === AST.Identifier) expect(id.name).toBe("Component");
  });

  it("should recognize only the first argument of each nested wrapper call", () => {
    const code = "const Component = memo(forwardRef((props, ref) => null), (prev, next) => true)";
    const fns: TSESTree.ArrowFunctionExpression[] = [];
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ArrowFunctionExpression) fns.push(node);
      },
      setParentPointers: true,
    });
    expect(fns).toHaveLength(2);
    expect(getFunctionComponentId(context, fns[0]!)?.type).toBe(AST.Identifier);
    expect(getFunctionComponentId(context, fns[1]!)).toBeNull();
  });

  it("should not resolve the id of a function wrapped by a call in a later wrapper argument", () => {
    const code = "const Component = memo(ComponentImpl, forwardRef((props, ref) => null))";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(getFunctionComponentId(context, node)).toBeNull();
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
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionWithLooseComponentName(context, node)).toBe(expected);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should allow none when specified", () => {
    const code = "memo(() => {})";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionWithLooseComponentName(context, node, true)).toBe(true);
          expect(isFunctionWithLooseComponentName(context, node, false)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should accept a member expression assignment target whose property is a component name", () => {
    const code = "obj.Component = () => {}";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(isFunctionWithLooseComponentName(context, node)).toBe(true);
  });

  it("should reject a member expression assignment target whose property is not a component name", () => {
    const code = "obj.helper = () => {}";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(isFunctionWithLooseComponentName(context, node)).toBe(false);
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
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(expected);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should exclude functions defined as object methods when hint is set", () => {
    const code = "const obj = { Component() { return <div /> } }";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
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
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should exclude functions defined as class methods when hint is set", () => {
    const code = "class Foo { Component() { return <div /> } }";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
            | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsClassMethod;
          expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should exclude functions defined as class properties when hint is set", () => {
    const code = "class Foo { Component = () => { return <div /> } }";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
            | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsClassProperty;
          expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);

          const hintWithoutExclude = DEFAULT_COMPONENT_DETECTION_HINT
            & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsClassProperty;
          expect(isFunctionComponentDefinition(context, node, hintWithoutExclude)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should exclude functions in JSX expression containers", () => {
    const code = "const x = <div onClick={() => <div />} />";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("does not exclude named callbacks in arbitrary calls even when hint is set", () => {
    const code = "const x = someHelper(function Component() { return <div /> })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
            | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback;
          expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("excludes named callbacks in array map calls when hint is set (unlike the arbitrary call case)", () => {
    const code = "const x = items.map(function Item() { return <div /> })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
            | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;
          expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("excludes anonymous callbacks in array map calls when hint is set", () => {
    const code = "const x = items.map(() => <div />)";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
            | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;
          expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("includes named callbacks in array map calls when hint is not set", () => {
    const code = "const x = items.map(function Item() { return <div /> })";
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isFunction(node)) {
          const hintWithoutExclude = DEFAULT_COMPONENT_DETECTION_HINT
            & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;
          expect(isFunctionComponentDefinition(context, node, hintWithoutExclude)).toBe(true);
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("excludes functions used as array pattern element defaults when hint is set", () => {
    // Defaults sit under an AssignmentPattern (`[Nav = () => {}]`); direct element
    // forms are covered by the separate parser-accepted case below.
    const code = "const [Nav = () => <div />] = arr;";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
      | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement;
    expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
    const hintWithoutExclude = DEFAULT_COMPONENT_DETECTION_HINT
      & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement;
    expect(isFunctionComponentDefinition(context, node, hintWithoutExclude)).toBe(true);
    // The hint is part of the default set.
    expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(false);
  });

  it("excludes parser-accepted direct array pattern elements when hint is set", () => {
    // `[function Helper() {}] = arr` is rejected by tsc/V8 at runtime but accepted
    // by @typescript-eslint/parser, which places the function directly under the
    // ArrayPattern. The defensive exclusion still applies to that shape.
    const code = "[function Helper() { return <div />; }] = arr;";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
      | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement;
    expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
    const hintWithoutExclude = DEFAULT_COMPONENT_DETECTION_HINT
      & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement;
    expect(isFunctionComponentDefinition(context, node, hintWithoutExclude)).toBe(true);
    expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(false);
  });

  it("excludes functions in array expressions when hint is set", () => {
    const code = "const xs = [function Nav() { return <div />; }];";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
      | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement;
    expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
    const hintWithoutExclude = DEFAULT_COMPONENT_DETECTION_HINT
      & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement;
    expect(isFunctionComponentDefinition(context, node, hintWithoutExclude)).toBe(true);
  });

  it("excludes named callbacks in flatMap calls when hint is set", () => {
    const code = "const xs = items.flatMap(function Item() { return <div />; });";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
      | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback;
    expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
    const hintWithoutExclude = DEFAULT_COMPONENT_DETECTION_HINT
      & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback;
    expect(isFunctionComponentDefinition(context, node, hintWithoutExclude)).toBe(true);
  });

  it("excludes anonymous callbacks in arbitrary calls when hint is set", () => {
    const code = "const x = someHelper(() => <div />);";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const hintWithExclude = DEFAULT_COMPONENT_DETECTION_HINT
      | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback;
    expect(isFunctionComponentDefinition(context, node, hintWithExclude)).toBe(false);
    const hintWithoutExclude = DEFAULT_COMPONENT_DETECTION_HINT
      & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback;
    expect(isFunctionComponentDefinition(context, node, hintWithoutExclude)).toBe(true);
  });

  it("does not exclude wrapper call callbacks via the arbitrary call hint", () => {
    const code = "const Component = memo(() => <div />);";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    const hint = DEFAULT_COMPONENT_DETECTION_HINT
      | FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback;
    expect(isFunctionComponentDefinition(context, node, hint)).toBe(true);
  });

  it("excludes functions passed as createElement children arguments", () => {
    const code = "const x = createElement('div', null, function Nav() { return <div />; });";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(false);
  });

  it("excludes type-wrapped functions passed as createElement children arguments", () => {
    const code = "const x = createElement('div', null, (function Nav() { return <div />; }) as any);";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(false);
  });

  it("should exclude memo's propsAreEqual comparator regardless of detection hints", () => {
    const code = "const Component = memo(ComponentImpl, () => <div />);";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(false);
    // The exclusion is structural (non-first wrapper argument), not hint-driven.
    const hintWithoutArbitraryCallback = DEFAULT_COMPONENT_DETECTION_HINT
      & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback;
    expect(isFunctionComponentDefinition(context, node, hintWithoutArbitraryCallback)).toBe(false);
  });

  it("should exclude named functions in non-first wrapper argument positions", () => {
    const code = "const Component = memo(ComponentImpl, function Compare() { return <div />; });";
    const node = getFirstNodeOfType<TSESTree.FunctionExpression>(code, AST.FunctionExpression);
    expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(false);
    const hintWithoutArbitraryCallback = DEFAULT_COMPONENT_DETECTION_HINT
      & ~FunctionComponentDetectionHint.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback;
    expect(isFunctionComponentDefinition(context, node, hintWithoutArbitraryCallback)).toBe(false);
  });

  it("should exempt the first argument of memo from the arbitrary call hint", () => {
    const code = "const Component = memo(() => <div />);";
    const node = getFirstNodeOfType<TSESTree.ArrowFunctionExpression>(code, AST.ArrowFunctionExpression);
    expect(isFunctionComponentDefinition(context, node, DEFAULT_COMPONENT_DETECTION_HINT)).toBe(true);
  });
});
