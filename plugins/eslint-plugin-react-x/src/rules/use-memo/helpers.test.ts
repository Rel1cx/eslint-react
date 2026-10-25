import { collectNodes } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";
import { isResultUsed } from "./helpers";

function resultUsed(code: string): boolean {
  const node = collectNodes<TSESTree.CallExpression>(code, AST.CallExpression).find((n) => n.callee.type === AST.Identifier && n.callee.name === "useMemo");
  if (node == null) throw new Error(`No useMemo call found in: ${code}`);
  return isResultUsed(node);
}

describe("isResultUsed", () => {
  it("should return false for a bare expression statement", () => {
    expect(resultUsed("useMemo(() => 1, []);")).toBe(false);
  });

  it("should return true for a variable declarator init", () => {
    expect(resultUsed("const x = useMemo(() => 1, []);")).toBe(true);
  });

  it("should return true for a return statement", () => {
    expect(resultUsed("function f() { return useMemo(() => 1, []); }")).toBe(true);
  });

  it("should return true for a JSX expression container", () => {
    expect(resultUsed("const x = <div>{useMemo(() => 1, [])}</div>;")).toBe(true);
  });

  it("should return true for a call expression argument", () => {
    expect(resultUsed("foo(useMemo(() => 1, []));")).toBe(true);
  });

  it("should return true for an immediately invoked result", () => {
    expect(resultUsed("const x = useMemo(() => () => 1, [])();")).toBe(true);
  });

  it("should return true for a member expression on the result", () => {
    expect(resultUsed("const x = useMemo(() => [1], []).length;")).toBe(true);
  });

  it("should return true for a void-wrapped result", () => {
    expect(resultUsed("void useMemo(() => 1, []);")).toBe(true);
  });

  it("should return true for a comma sequence", () => {
    expect(resultUsed("const x = (useMemo(() => 1, []), 2);")).toBe(true);
  });

  it("should unwrap TS type assertions around the call", () => {
    expect(resultUsed("const x = useMemo(() => 1, []) as number;")).toBe(true);
  });

  it("should unwrap TS non-null assertions around the call", () => {
    expect(resultUsed("const x = useMemo(() => 1, [])!;")).toBe(true);
  });

  it("should unwrap TS satisfies expressions around the call", () => {
    expect(resultUsed("const x = useMemo(() => 1, []) satisfies number;")).toBe(true);
  });

  it("should return false when only the type-asserted call is a bare statement", () => {
    expect(resultUsed("useMemo(() => 1, []) as number;")).toBe(false);
  });

  it("should return false for a switch discriminant", () => {
    expect(resultUsed("switch (useMemo(() => 1, [])) { case 1: break; }")).toBe(false);
  });

  it("should return false for an if test", () => {
    expect(resultUsed("if (useMemo(() => 1, [])) { }")).toBe(false);
  });

  it("should return false for an export default", () => {
    expect(resultUsed("export default useMemo(() => 1, []);")).toBe(false);
  });

  it("should return false for a throw statement", () => {
    expect(resultUsed("function f() { throw useMemo(() => 1, []); }")).toBe(false);
  });
});
