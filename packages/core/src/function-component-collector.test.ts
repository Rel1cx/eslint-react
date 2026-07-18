import { runCollector } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { DEFAULT_COMPONENT_DETECTION_HINT, FunctionComponentFlag } from "./function-component";
import { getFunctionComponentCollector } from "./function-component-collector";

function collectComponents(code: string) {
  return runCollector(
    code,
    (context) =>
      getFunctionComponentCollector(context as never, {
        hint: DEFAULT_COMPONENT_DETECTION_HINT,
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
});
