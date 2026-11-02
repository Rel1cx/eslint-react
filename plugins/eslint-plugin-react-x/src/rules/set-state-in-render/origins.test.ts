import { getText } from "@eslint-react/eslint";
import { type TestRuleContext, collectNodes, findIdentifierReferences, runInRule } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";
import { createSetStateResolver } from "./origins";

function findReference(program: TSESTree.Program, name: string) {
  const ref = findIdentifierReferences(program, name).at(-1);
  if (ref == null) throw new Error(`No reference to "${name}" found`);
  return ref;
}

function findCall(context: TestRuleContext, program: TSESTree.Program, textPrefix: string) {
  const call = collectNodes<TSESTree.CallExpression>(program, AST.CallExpression).find((node) => getText(context, node).startsWith(textPrefix));
  if (call == null) throw new Error(`No call starting with "${textPrefix}" found`);
  return call;
}

function checkSetStateId(code: string, name: string) {
  return runInRule(code, (context, program) => createSetStateResolver(context).isSetStateId(findReference(program, name)));
}

describe("createSetStateResolver", () => {
  describe("isSetStateId", () => {
    it("should match only the element at index 1 of a state tuple", () => {
      expect(checkSetStateId("const [data, setData] = useState(); setData;", "setData")).toBe(true);
      expect(checkSetStateId("const [data, setData] = useState(); data;", "data")).toBe(false);
    });

    it("should match a setter destructured with a hole", () => {
      expect(checkSetStateId("const [, setData] = useState(); setData;", "setData")).toBe(true);
    });

    it("should match a setter from a namespace state hook", () => {
      expect(checkSetStateId("const [, setData] = React.useState(); setData;", "setData")).toBe(true);
    });

    it("should not match a binding initialized by another hook", () => {
      expect(checkSetStateId("const [, setData] = useFoo(); setData;", "setData")).toBe(false);
    });

    it("should not match an unresolved identifier", () => {
      expect(checkSetStateId("setData;", "setData")).toBe(false);
    });

    it("should not match a setter reached through an alias", () => {
      expect(checkSetStateId("const [data, setData] = useState(); const alias = setData; alias;", "alias")).toBe(false);
    });

    it("should not match a setter from object destructuring", () => {
      expect(checkSetStateId("const { 1: setData } = useState(); setData;", "setData")).toBe(false);
    });

    it("should match a setter declared with let", () => {
      expect(checkSetStateId("let [, setData] = useState(); setData;", "setData")).toBe(true);
    });

    it("should not match a binding at index 2 of the state tuple", () => {
      expect(checkSetStateId("const [a, b, setData] = useState(); setData;", "setData")).toBe(false);
    });

    it("should not match a setter with a default value in the pattern", () => {
      expect(checkSetStateId("const [, setData = () => {}] = useState(); setData;", "setData")).toBe(false);
    });

    it("should not match a reference shadowed by a nested function parameter", () => {
      expect(checkSetStateId("const [, setData] = useState(); function f(setData) { setData; }", "setData")).toBe(false);
    });
  });

  describe("isSetStateCall", () => {
    function check(code: string, textPrefix: string) {
      return runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return resolver.isSetStateCall(findCall(context, program, textPrefix));
      });
    }

    it("should match a direct call of the destructured setter", () => {
      expect(check("const [data, setData] = useState(); setData(1);", "setData")).toBe(true);
    });

    it("should match an optional call of the destructured setter", () => {
      expect(check("const [data, setData] = useState(); setData?.(1);", "setData")).toBe(true);
    });

    it("should not match a call of an unrelated function", () => {
      expect(check("function update() {} update();", "update")).toBe(false);
    });

    it("should not match a call through a member expression", () => {
      expect(check("const [data, setData] = useState(); const obj = { setData }; obj.setData(1);", "obj.setData")).toBe(false);
    });

    it("should match a call of a TS-asserted setter", () => {
      expect(check("const [data, setData] = useState(); (setData as any)(1);", "(setData as any)")).toBe(true);
    });

    it("should not match a call of the state value at index 0", () => {
      expect(check("const [data, setData] = useState(); data(1);", "data(1)")).toBe(false);
    });

    it("should not match a call of a shadowed setter", () => {
      expect(check("const [, setData] = useState(); function f(setData) { setData(1); }", "setData(1)")).toBe(false);
    });
  });

  describe("isUseStateCall", () => {
    it("should identify built-in and namespace state hook calls", () => {
      const code = "useState(); React.useState(); useFoo();";
      const facts = runInRule(code, (context, program) => {
        const resolver = createSetStateResolver(context);
        return program.body.map((statement) => {
          if (statement.type !== AST.ExpressionStatement || statement.expression.type !== AST.CallExpression) return false;
          return resolver.isUseStateCall(statement.expression);
        });
      });
      expect(facts).toEqual([true, true, false]);
    });

    it("should not identify a non-call expression", () => {
      const fact = runInRule("useState;", (context, program) => {
        const resolver = createSetStateResolver(context);
        const statement = program.body[0]!;
        if (statement.type !== AST.ExpressionStatement) throw new Error("Expected an expression statement");
        return resolver.isUseStateCall(statement.expression);
      });
      expect(fact).toBe(false);
    });
  });
});
