import { findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { isProvenanceEqual } from "./is-provenance-equal";
import { isValueEqual } from "./is-value-equal";

describe("isProvenanceEqual", () => {
  describe("callback parameters", () => {
    it("should return true for same-position parameters of callbacks passed to equal callees", () => {
      const code = [
        "xs.forEach((a) => foo(a));",
        "xs.forEach((b) => bar(b));",
      ].join("\n");
      const fact = runInRule(code, (context, ast) => {
        const aRefs = findIdentifierReferences(ast, "a");
        const bRefs = findIdentifierReferences(ast, "b");
        const aRef = aRefs.find((r) => r.parent.type === AST.CallExpression);
        const bRef = bRefs.find((r) => r.parent.type === AST.CallExpression);
        expect(aRef).toBeDefined();
        expect(bRef).toBeDefined();
        return isProvenanceEqual(context, aRef!, bRef!);
      });
      expect(fact).toBe(true);
    });

    it("should return false for same-position parameters of callbacks passed to different callees", () => {
      const code = [
        "xs.forEach((a) => foo(a));",
        "xs.map((b) => bar(b));",
      ].join("\n");
      const fact = runInRule(code, (context, ast) => {
        const aRefs = findIdentifierReferences(ast, "a");
        const bRefs = findIdentifierReferences(ast, "b");
        const aRef = aRefs.find((r) => r.parent.type === AST.CallExpression);
        const bRef = bRefs.find((r) => r.parent.type === AST.CallExpression);
        expect(aRef).toBeDefined();
        expect(bRef).toBeDefined();
        return isProvenanceEqual(context, aRef!, bRef!);
      });
      expect(fact).toBe(false);
    });

    it("should return false for different-position parameters of the same callback", () => {
      const code = "xs.forEach((a, b) => { foo(a); bar(b); });";
      const fact = runInRule(code, (context, ast) => {
        const aRefs = findIdentifierReferences(ast, "a");
        const bRefs = findIdentifierReferences(ast, "b");
        const aRef = aRefs.find((r) => r.parent.type === AST.CallExpression);
        const bRef = bRefs.find((r) => r.parent.type === AST.CallExpression);
        expect(aRef).toBeDefined();
        expect(bRef).toBeDefined();
        return isProvenanceEqual(context, aRef!, bRef!);
      });
      expect(fact).toBe(false);
    });

    it("should return false for parameters of non-callback functions", () => {
      const code = [
        "function f(a) { foo(a); }",
        "function h(b) { bar(b); }",
      ].join("\n");
      const fact = runInRule(code, (context, ast) => {
        const aRefs = findIdentifierReferences(ast, "a");
        const bRefs = findIdentifierReferences(ast, "b");
        const aRef = aRefs.find((r) => r.parent.type === AST.CallExpression);
        const bRef = bRefs.find((r) => r.parent.type === AST.CallExpression);
        expect(aRef).toBeDefined();
        expect(bRef).toBeDefined();
        return isProvenanceEqual(context, aRef!, bRef!);
      });
      expect(fact).toBe(false);
    });
  });

  describe("for-of variables", () => {
    it("should return false for destructured variables of the same for-of statement", () => {
      const code = [
        "function test() {",
        "  const items = [[1, 2]];",
        "  for (const [a, b] of items) {",
        "    foo(a);",
        "    bar(b);",
        "  }",
        "}",
      ].join("\n");

      const fact = runInRule(code, (context, ast) => {
        const aRefs = findIdentifierReferences(ast, "a");
        const bRefs = findIdentifierReferences(ast, "b");
        const aRef = aRefs.find((r) => r.parent.type === AST.CallExpression);
        const bRef = bRefs.find((r) => r.parent.type === AST.CallExpression);
        expect(aRef).toBeDefined();
        expect(bRef).toBeDefined();
        return isProvenanceEqual(context, aRef!, bRef!);
      });
      expect(fact).toBe(false);
    });

    it("should return true for variables of different for-of statements over the same source", () => {
      const code = [
        "function test() {",
        "  const events = ['click', 'keydown'];",
        "  for (const event of events) {",
        "    foo(event);",
        "  }",
        "  for (const evt of events) {",
        "    bar(evt);",
        "  }",
        "}",
      ].join("\n");

      const fact = runInRule(code, (context, ast) => {
        const eventRefs = findIdentifierReferences(ast, "event");
        const evtRefs = findIdentifierReferences(ast, "evt");
        const eventRef = eventRefs.find((r) => r.parent.type === AST.CallExpression);
        const evtRef = evtRefs.find((r) => r.parent.type === AST.CallExpression);
        expect(eventRef).toBeDefined();
        expect(evtRef).toBeDefined();
        return isProvenanceEqual(context, eventRef!, evtRef!);
      });
      expect(fact).toBe(true);
    });
  });

  describe("relationship to isValueEqual", () => {
    it("should apply provenance rules that plain value equality does not", () => {
      const code = [
        "xs.forEach((a) => foo(a));",
        "xs.forEach((b) => bar(b));",
      ].join("\n");
      const facts = runInRule(code, (context, ast) => {
        const aRef = findIdentifierReferences(ast, "a").find((r) => r.parent.type === AST.CallExpression);
        const bRef = findIdentifierReferences(ast, "b").find((r) => r.parent.type === AST.CallExpression);
        expect(aRef).toBeDefined();
        expect(bRef).toBeDefined();
        return {
          provenance: isProvenanceEqual(context, aRef!, bRef!),
          value: isValueEqual(context, aRef!, bRef!),
        };
      });
      expect(facts.provenance).toBe(true);
      expect(facts.value).toBe(false);
    });

    it("should agree with isValueEqual for plain variable identity", () => {
      const code = "const x = 1; foo(x); bar(x);";
      const facts = runInRule(code, (context, ast) => {
        const refs = findIdentifierReferences(ast, "x");
        expect(refs.length).toBeGreaterThanOrEqual(2);
        return {
          provenance: isProvenanceEqual(context, refs[0]!, refs[1]!),
          value: isValueEqual(context, refs[0]!, refs[1]!),
        };
      });
      expect(facts.provenance).toBe(true);
      expect(facts.value).toBe(true);
    });

    it("should return true for references to the same configured global", () => {
      const code = "/* global EVENT */\nfoo(EVENT); bar(EVENT);";
      const fact = runInRule(code, (context, ast) => {
        const refs = findIdentifierReferences(ast, "EVENT");
        expect(refs).toHaveLength(2);
        return isProvenanceEqual(context, refs[0]!, refs[1]!);
      });
      expect(fact).toBe(true);
    });
  });
});
