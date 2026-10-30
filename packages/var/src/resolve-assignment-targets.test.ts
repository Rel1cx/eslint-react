import { getFirstNodeOfType, getTextOf } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { resolveAssignmentTargets } from "./resolve-assignment-targets";

describe("resolveAssignmentTargets", () => {
  function getTargets(code: string): string[] {
    const node = getFirstNodeOfType<TSESTree.AssignmentExpression>(code, AST.AssignmentExpression);
    return resolveAssignmentTargets(node.left).map((target) => getTextOf(code, target));
  }

  it("should return a bare identifier target", () => {
    expect(getTargets("foo = 1;")).toEqual(["foo"]);
  });

  it("should return a member expression target", () => {
    expect(getTargets("foo.bar = 1;")).toEqual(["foo.bar"]);
  });

  it("should expand array pattern targets", () => {
    expect(getTargets("[a, , b.c] = source;")).toEqual(["a", "b.c"]);
  });

  it("should expand object pattern targets", () => {
    expect(getTargets("({ a, b: c.d } = source);")).toEqual(["a", "c.d"]);
  });

  it("should expand nested patterns", () => {
    expect(getTargets("({ a: [b.c] } = source);")).toEqual(["b.c"]);
  });

  it("should treat the left side of a default as the target", () => {
    expect(getTargets("({ a: b.c = 1 } = source);")).toEqual(["b.c"]);
  });

  it("should expand rest element targets", () => {
    expect(getTargets("[...rest.x] = source;")).toEqual(["rest.x"]);
  });

  it("should unwrap type expressions on the target", () => {
    expect(getTargets("(foo as unknown) = 1;")).toEqual(["foo"]);
  });

  it("should return no targets for non-target expressions", () => {
    expect(getTargets("foo() = 1;")).toEqual([]);
  });
});
