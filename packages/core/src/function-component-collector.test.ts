import { runCollector } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { DEFAULT_COMPONENT_DETECTION_HINT, FunctionComponentFlag } from "./function-component";
import { getFunctionComponentCollector } from "./function-component-collector";

function collectComponents(code: string) {
  return runCollector(
    code,
    (context) =>
      getFunctionComponentCollector(context, {
        hint: DEFAULT_COMPONENT_DETECTION_HINT,
      }),
    (api, program) => api.getAllComponents(program),
  );
}

function collectComponentsWithDisplayName(code: string) {
  return runCollector(
    code,
    (context) =>
      getFunctionComponentCollector(context, {
        hint: DEFAULT_COMPONENT_DETECTION_HINT,
        collectDisplayName: true,
      }),
    (api, program) => api.getAllComponents(program),
  );
}

describe("getFunctionComponentCollector", () => {
  it("should collect regular hook calls in components", () => {
    const components = collectComponents(
      "function Component() { const [state, setState] = useState(0); return <div />; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.hookCalls).toHaveLength(1);
  });

  it("should not attribute nested function hook calls to the component", () => {
    const components = collectComponents(
      "function Component() { function helper() { useState(0); } helper(); return <div />; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.hookCalls).toHaveLength(0);
  });

  it("should collect a component that uses a regular hook without JSX", () => {
    const components = collectComponents("function App() { useEffect(() => {}); }");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBe("App");
    expect(components[0]?.hookCalls).toHaveLength(1);
  });

  it("should collect arrow function components", () => {
    const components = collectComponents("const App = (props) => <div>foo</div>;");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBe("App");
    expect(components[0]?.hookCalls).toHaveLength(0);
  });

  it("should detect memo-wrapped components", () => {
    const components = collectComponents("const App = React.memo(() => <div>foo</div>);");
    expect(components).toHaveLength(1);
    const component = components[0]!;
    expect(component.name).toBe("App");
    expect(component.hookCalls).toHaveLength(0);
    expect(component.flag & FunctionComponentFlag.Memo).not.toBe(0n);
  });

  it("should detect forwardRef-wrapped components", () => {
    const components = collectComponents("const App = React.forwardRef(() => <div>foo</div>);");
    expect(components).toHaveLength(1);
    const component = components[0]!;
    expect(component.name).toBe("App");
    expect(component.hookCalls).toHaveLength(0);
    expect(component.flag & FunctionComponentFlag.ForwardRef).not.toBe(0n);
  });

  it("should collect nested function components", () => {
    const components = collectComponents(
      "function ParentComponent() { function ChildComponent() { return <div />; } return <ChildComponent />; }",
    );
    expect(components).toHaveLength(2);
    expect(components.map((c) => c.name).sort()).toEqual(["ChildComponent", "ParentComponent"]);
  });

  it("should collect components using createElement", () => {
    const components = collectComponents("const App = () => React.createElement('div', null, 'foo');");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBe("App");
    expect(components[0]?.hookCalls).toHaveLength(0);
  });

  it("should collect hook calls via tagged template literals in components", () => {
    const components = collectComponents(
      "function Component() { const shadow = useMotionTemplate`literal`; return <div style={{ filter: shadow }} />; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.hookCalls).toHaveLength(1);
    expect(components[0]?.hookCalls[0]?.type).toBe("TaggedTemplateExpression");
  });

  it("should collect member expression hook tags in components", () => {
    const components = collectComponents(
      "function Component() { const shadow = Motion.useMotionTemplate`literal`; return <div style={{ filter: shadow }} />; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.hookCalls).toHaveLength(1);
    expect(components[0]?.hookCalls[0]?.type).toBe("TaggedTemplateExpression");
  });

  it("should not collect non-hook tagged templates in components", () => {
    const components = collectComponents(
      "function Component() { const x = notAHook`literal`; return <div />; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.hookCalls).toHaveLength(0);
  });

  it("should recognize a component that only uses a tagged template hook", () => {
    const components = collectComponents(
      "function Component() { const shadow = useMotionTemplate`literal`; return null; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.hookCalls).toHaveLength(1);
    expect(components[0]?.hookCalls[0]?.type).toBe("TaggedTemplateExpression");
  });

  it("should not collect helper functions using tagged template hooks as components", () => {
    const components = collectComponents(
      "function helper() { const shadow = useMotionTemplate`literal`; return shadow; }",
    );
    expect(components).toHaveLength(0);
  });

  it("should collect both regular and tagged template hook calls", () => {
    const components = collectComponents(
      "function Component() { const [state] = useState(0); const shadow = useMotionTemplate`literal`; return <div />; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.hookCalls).toHaveLength(2);
    expect(components[0]?.hookCalls.some((call) => call.type === "CallExpression")).toBe(true);
    expect(components[0]?.hookCalls.some((call) => call.type === "TaggedTemplateExpression")).toBe(true);
  });

  it("should collect displayName assignment for a component", () => {
    const components = collectComponentsWithDisplayName(
      "const Component = () => <div />; Component.displayName = 'MyComponent';",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.displayName).not.toBeNull();
    expect(components[0]?.displayName?.type).toBe("Literal");
  });

  it("should not collect displayName assignment without collectDisplayName option", () => {
    const components = collectComponents(
      "const Component = () => <div />; Component.displayName = 'MyComponent';",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.displayName).toBeNull();
  });

  it("should not match nested member expression displayName assignment", () => {
    const components = collectComponentsWithDisplayName(
      "const Components = { Nav: () => <div /> }; Components.Nav.displayName = 'Nav';",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.displayName).toBeNull();
  });

  it("should not collect displayName assigned before the component definition (mounting happens at visit time)", () => {
    const components = collectComponentsWithDisplayName(
      "Component.displayName = 'MyComponent'; function Component() { return <div />; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.displayName).toBeNull();
  });

  it("should mount displayName on the only same-name component collected at assignment time", () => {
    const components = collectComponentsWithDisplayName(
      "function outer1() { const App = () => <div>1</div>; App.displayName = 'First'; return App; }"
        + " function outer2() { const App = () => <div>2</div>; return App; }",
    );
    expect(components).toHaveLength(2);
    const [first, second] = components;
    expect(first?.displayName).not.toBeNull();
    expect(first?.displayName?.type).toBe("Literal");
    expect((first?.displayName as TSESTree.StringLiteral).value).toBe("First");
    expect(second?.displayName).toBeNull();
  });

  // Known failure: the collector selects the last same-name component instead of resolving the lexical binding.
  it.fails("should mount displayName on the lexically referenced component when nested scopes reuse its name", () => {
    const components = collectComponentsWithDisplayName(
      "const App = () => <div>outer</div>;"
        + " function nested() { const App = () => <div>inner</div>; App.displayName = 'Inner'; }"
        + " App.displayName = 'Outer';",
    );
    expect(components).toHaveLength(2);
    const displayNames = components.map((component) => component.displayName?.type === AST.Literal ? component.displayName.value : null);
    expect(displayNames).toEqual(["Outer", "Inner"]);
  });

  it("should collect displayName assignment with a non-literal right side", () => {
    const components = collectComponentsWithDisplayName(
      "const Component = () => <div />; Component.displayName = makeName();",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.displayName).not.toBeNull();
    expect(components[0]?.displayName?.type).toBe("CallExpression");
  });

  it("should collect displayName assignment with a computed string literal key", () => {
    const components = collectComponentsWithDisplayName(
      "const Component = () => <div />; Component['displayName'] = 'MyComponent';",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.displayName).not.toBeNull();
    expect(components[0]?.displayName?.type).toBe("Literal");
  });

  it("should not collect displayName assignment with a runtime-computed key", () => {
    const components = collectComponentsWithDisplayName(
      "const Component = () => <div />; Component[displayName] = 'MyComponent';",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.displayName).toBeNull();
  });

  it("should collect a named component with a 'use memo' directive even without JSX or hooks", () => {
    const components = collectComponents("function Component() { 'use memo'; return 1; }");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBe("Component");
    expect(components[0]?.directives[0]?.directive).toBe("use memo");
  });

  it("should collect a named component with a 'use no memo' directive even without JSX or hooks", () => {
    const components = collectComponents("function Component() { 'use no memo'; return 1; }");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBe("Component");
  });

  it("should collect anonymous default-exported components with a null name", () => {
    const components = collectComponents("export default function () { return <div />; }");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBeNull();
    expect(components[0]?.isExportDefault).toBe(true);
    expect(components[0]?.isExportDefaultDeclaration).toBe(true);
  });

  it("should not mark wrapper-call default exports as the default export declaration itself", () => {
    const components = collectComponents("export default memo(() => <div />);");
    expect(components).toHaveLength(1);
    expect(components[0]?.isExportDefault).toBe(true);
    expect(components[0]?.isExportDefaultDeclaration).toBe(false);
  });

  it("should mark anonymous arrow default exports as the default export declaration", () => {
    const components = collectComponents("export default () => <div />;");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBeNull();
    expect(components[0]?.isExportDefault).toBe(true);
    expect(components[0]?.isExportDefaultDeclaration).toBe(true);
  });

  it("should mark nested components inside a default export as inside (but not as) the default export declaration", () => {
    const components = collectComponents(
      "export default function ParentComponent() { function ChildComponent() { return <div />; } return <ChildComponent />; }",
    );
    expect(components).toHaveLength(2);
    const child = components.find((c) => c.name === "ChildComponent");
    expect(child?.isExportDefault).toBe(true);
    expect(child?.isExportDefaultDeclaration).toBe(false);
  });

  it("should collect components returning optional-chained createElement calls", () => {
    const components = collectComponents("const App = () => React?.createElement('div', null);");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBe("App");
  });

  it("should collect return expressions of block-bodied components", () => {
    const components = collectComponents(
      "function App() { if (condition) return <div />; return null; }",
    );
    expect(components).toHaveLength(1);
    expect(components[0]?.rets).toHaveLength(2);
    expect(components[0]?.rets[0]?.type).toBe(AST.JSXElement);
    expect(components[0]?.rets[1]?.type).toBe(AST.Literal);
  });

  it("should collect the expression body of arrow function components", () => {
    const components = collectComponents("const App = () => <div />;");
    expect(components).toHaveLength(1);
    expect(components[0]?.rets).toHaveLength(1);
    expect(components[0]?.rets[0]?.type).toBe(AST.JSXElement);
  });

  it("should populate the initialization path of wrapper-call components", () => {
    const components = collectComponents("const App = memo(() => <div />);");
    expect(components).toHaveLength(1);
    expect(components[0]?.initPath?.map((node) => node.type)).toEqual([
      AST.VariableDeclaration,
      AST.VariableDeclarator,
      AST.CallExpression,
      AST.ArrowFunctionExpression,
    ]);
  });

  it("should name components assigned to member expressions by their fully qualified name", () => {
    const components = collectComponents("obj.App = () => <div />;");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBe("obj.App");
  });

  it("should not collect memo's propsAreEqual comparator as a component", () => {
    const components = collectComponents("const Component = memo(ComponentImpl, () => <div />);");
    expect(components).toHaveLength(0);
  });
});
