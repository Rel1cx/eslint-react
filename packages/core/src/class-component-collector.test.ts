import { runCollector } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getClassComponentCollector } from "./class-component-collector";

function collectComponents(code: string) {
  return runCollector(
    code,
    (context) => getClassComponentCollector(context),
    (api, program) => api.getAllComponents(program),
  );
}

describe("getClassComponentCollector", () => {
  it("should collect a class declaration component", () => {
    const components = collectComponents("class Component extends React.Component {}");
    expect(components).toHaveLength(1);
    const component = components[0]!;
    expect(component.kind).toBe("class-component");
    expect(component.name).toBe("Component");
    expect(component.node.type).toBe(AST.ClassDeclaration);
  });

  it("should collect a class expression assigned to a variable", () => {
    const components = collectComponents("const Component = class extends React.PureComponent {};");
    expect(components).toHaveLength(1);
    expect(components[0]?.name).toBe("Component");
    expect(components[0]?.node.type).toBe(AST.ClassExpression);
  });

  it("should collect multiple class components", () => {
    const components = collectComponents(
      "class A extends Component {} class B extends React.PureComponent {}",
    );
    expect(components).toHaveLength(2);
    expect(components.map((c) => c.name).sort()).toEqual(["A", "B"]);
  });

  it("should not collect classes that do not extend Component or PureComponent", () => {
    const components = collectComponents("class A {} class B extends SomethingElse {}");
    expect(components).toHaveLength(0);
  });

  it("should collect a component with null id and name when anonymous", () => {
    const components = collectComponents("export default class extends Component {}");
    expect(components).toHaveLength(1);
    expect(components[0]?.id).toBeNull();
    expect(components[0]?.name).toBeNull();
  });

  it("should initialize the semantic fields", () => {
    const components = collectComponents("class Component extends React.Component {}");
    expect(components).toHaveLength(1);
    const component = components[0]!;
    expect(component.displayName).toBeNull();
    expect(component.flag).toBe(0n);
    expect(component.hint).toBe(0n);
    expect(component.methods).toEqual([]);
  });
});
