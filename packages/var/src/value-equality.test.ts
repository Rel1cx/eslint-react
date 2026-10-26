import { collectNodes, findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { isEqualWith } from "./value-equality";

function callRef(ast: TSESTree.Program, name: string): TSESTree.Identifier {
  const ref = findIdentifierReferences(ast, name).find((candidate) => candidate.parent.type === AST.CallExpression);
  if (ref == null) throw new Error(`no call-site reference for ${name}`);
  return ref;
}

describe("isEqualWith", () => {
  it("should return true for the same node in both modes", () => {
    const facts = runInRule("const x = 1; x;", (context, ast) => {
      const ref = findIdentifierReferences(ast, "x").at(-1)!;
      return {
        identity: isEqualWith(context, ref, ref, { identifierComparison: "identity" }),
        provenance: isEqualWith(context, ref, ref, { identifierComparison: "provenance" }),
      };
    });

    expect(facts.identity).toBe(true);
    expect(facts.provenance).toBe(true);
  });

  it("should compare literals by value in both modes", () => {
    const facts = runInRule("foo(42); bar(42);", (context, ast) => {
      const [a, b] = collectNodes<TSESTree.Literal>(ast, AST.Literal);
      if (a == null || b == null) throw new Error("missing literals");
      return {
        identity: isEqualWith(context, a, b, { identifierComparison: "identity" }),
        provenance: isEqualWith(context, a, b, { identifierComparison: "provenance" }),
      };
    });

    expect(facts.identity).toBe(true);
    expect(facts.provenance).toBe(true);
  });

  it("should apply callback-parameter provenance only in provenance mode", () => {
    const code = [
      "xs.forEach((a) => foo(a));",
      "xs.forEach((b) => bar(b));",
    ].join("\n");
    const facts = runInRule(code, (context, ast) => {
      const a = callRef(ast, "a");
      const b = callRef(ast, "b");
      return {
        identity: isEqualWith(context, a, b, { identifierComparison: "identity" }),
        provenance: isEqualWith(context, a, b, { identifierComparison: "provenance" }),
      };
    });

    expect(facts.identity).toBe(false);
    expect(facts.provenance).toBe(true);
  });

  it("should apply for-of provenance only in provenance mode", () => {
    const code = [
      "function test() {",
      "  const events = ['click'];",
      "  for (const event of events) { foo(event); }",
      "  for (const evt of events) { bar(evt); }",
      "}",
    ].join("\n");
    const facts = runInRule(code, (context, ast) => {
      const event = callRef(ast, "event");
      const evt = callRef(ast, "evt");
      return {
        identity: isEqualWith(context, event, evt, { identifierComparison: "identity" }),
        provenance: isEqualWith(context, event, evt, { identifierComparison: "provenance" }),
      };
    });

    expect(facts.identity).toBe(false);
    expect(facts.provenance).toBe(true);
  });

  it("should thread the selected mode through member expressions", () => {
    const code = [
      "xs.forEach((a) => foo(a.x));",
      "xs.forEach((b) => bar(b.x));",
    ].join("\n");
    const facts = runInRule(code, (context, ast) => {
      const members = collectNodes<TSESTree.MemberExpression>(ast, AST.MemberExpression)
        .filter((member) => member.object.type === AST.Identifier && (member.object.name === "a" || member.object.name === "b"));
      if (members[0] == null || members[1] == null) throw new Error("missing member expressions");
      return {
        identity: isEqualWith(context, members[0], members[1], { identifierComparison: "identity" }),
        provenance: isEqualWith(context, members[0], members[1], { identifierComparison: "provenance" }),
      };
    });

    expect(facts.identity).toBe(false);
    expect(facts.provenance).toBe(true);
  });

  it("should fall back to static values", () => {
    const facts = runInRule("foo(1 + 1); bar(2);", (context, ast) => {
      const calls = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
      const a = calls[0]?.arguments[0];
      const b = calls[1]?.arguments[0];
      if (a == null || b == null) throw new Error("missing call arguments");
      return {
        identity: isEqualWith(context, a, b, { identifierComparison: "identity" }),
        provenance: isEqualWith(context, a, b, { identifierComparison: "provenance" }),
      };
    });

    expect(facts.identity).toBe(true);
    expect(facts.provenance).toBe(true);
  });

  describe("this expressions", () => {
    it("should treat `this` in the same function as equal", () => {
      const code = "const o = { m() { foo(this); bar(this); } };";
      const facts = runInRule(code, (context, ast) => {
        const [a, b] = collectNodes<TSESTree.ThisExpression>(ast, AST.ThisExpression);
        if (a == null || b == null) throw new Error("missing this expressions");
        return {
          identity: isEqualWith(context, a, b, { identifierComparison: "identity" }),
          provenance: isEqualWith(context, a, b, { identifierComparison: "provenance" }),
        };
      });

      expect(facts.identity).toBe(true);
      expect(facts.provenance).toBe(true);
    });

    it("should treat `this` in different functions as different", () => {
      const code = [
        "const a = { m() { foo(this); } };",
        "const b = { m() { bar(this); } };",
      ].join("\n");
      const facts = runInRule(code, (context, ast) => {
        const [first, second] = collectNodes<TSESTree.ThisExpression>(ast, AST.ThisExpression);
        if (first == null || second == null) throw new Error("missing this expressions");
        return {
          identity: isEqualWith(context, first, second, { identifierComparison: "identity" }),
          provenance: isEqualWith(context, first, second, { identifierComparison: "provenance" }),
        };
      });

      expect(facts.identity).toBe(false);
      expect(facts.provenance).toBe(false);
    });
  });
});
