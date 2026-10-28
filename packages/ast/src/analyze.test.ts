import { getFirstNodeOfType } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { isTerminatingStatement, isUnconditionallyTerminating } from "./analyze";

describe("isTerminatingStatement", () => {
  it("should match return, throw, break, and continue statements", () => {
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.ReturnStatement>("function f() { return 1; }", AST.ReturnStatement))).toBe(true);
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.ThrowStatement>("function f() { throw 1; }", AST.ThrowStatement))).toBe(true);
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.BreakStatement>("while (a) { break; }", AST.BreakStatement))).toBe(true);
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.ContinueStatement>("while (a) { continue; }", AST.ContinueStatement))).toBe(true);
  });

  it("should match a block containing a terminating statement", () => {
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.BlockStatement>("function f() { return 1; }", AST.BlockStatement))).toBe(true);
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.BlockStatement>("function f() { foo(); }", AST.BlockStatement))).toBe(false);
  });

  it("should match an if statement only when both branches terminate", () => {
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.IfStatement>("function f() { if (a) return 1; }", AST.IfStatement))).toBe(false);
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.IfStatement>("function f() { if (a) return 1; else throw 2; }", AST.IfStatement))).toBe(true);
  });

  it("should not analyze switch statements", () => {
    const code = "function f() { switch (a) { case 1: return; default: return; } }";
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.SwitchStatement>(code, AST.SwitchStatement))).toBe(false);
  });

  it("should match a try statement whose paths all terminate", () => {
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { return 1; } finally {} }", AST.TryStatement))).toBe(true);
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { return 1; } catch { throw 2; } }", AST.TryStatement))).toBe(
      true,
    );
  });

  it("should not match a try statement with a path that completes normally", () => {
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { foo(); } finally {} }", AST.TryStatement))).toBe(false);
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { return 1; } catch { foo(); } }", AST.TryStatement))).toBe(
      false,
    );
  });

  it("should match a try statement with a terminating finally", () => {
    expect(isTerminatingStatement(getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { foo(); } finally { return 1; } }", AST.TryStatement))).toBe(
      true,
    );
  });
});

describe("isUnconditionallyTerminating", () => {
  it("should match return and throw statements", () => {
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.ReturnStatement>("function f() { return 1; }", AST.ReturnStatement))).toBe(true);
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.ThrowStatement>("function f() { throw 1; }", AST.ThrowStatement))).toBe(true);
  });

  it("should not match break or continue statements", () => {
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.BreakStatement>("while (a) { break; }", AST.BreakStatement))).toBe(false);
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.ContinueStatement>("while (a) { continue; }", AST.ContinueStatement))).toBe(false);
  });

  it("should check only the last statement of a block", () => {
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.BlockStatement>("function f() { foo(); return 1; }", AST.BlockStatement))).toBe(true);
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.BlockStatement>("function f() { return 1; foo(); }", AST.BlockStatement))).toBe(false);
  });

  it("should match an if statement only when both branches terminate", () => {
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.IfStatement>("function f() { if (a) return 1; }", AST.IfStatement))).toBe(false);
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.IfStatement>("function f() { if (a) return 1; else throw 2; }", AST.IfStatement))).toBe(
      true,
    );
  });

  it("should match a try statement whose finalizer terminates", () => {
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { return 1; } finally { return 2; } }", AST.TryStatement)),
    ).toBe(
      true,
    );
    expect(isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { foo(); } finally { throw 1; } }", AST.TryStatement)))
      .toBe(
        true,
      );
  });

  it("should match a try statement when the try block and catch handler both terminate", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { return 1; } catch { throw 2; } }", AST.TryStatement),
      ),
    ).toBe(true);
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { return 1; } catch { throw 2; } finally { foo(); } }", AST.TryStatement),
      ),
    ).toBe(true);
  });

  it("should not match a try statement when the catch handler can complete normally", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { return 1; } catch { foo(); } }", AST.TryStatement),
      ),
    ).toBe(false);
  });

  it("should match a try statement without a catch handler when the try block terminates", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { return 1; } finally { foo(); } }", AST.TryStatement),
      ),
    ).toBe(true);
  });

  it("should not match a try statement when the try block can complete normally", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { foo(); } catch { return 1; } }", AST.TryStatement),
      ),
    ).toBe(false);
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.TryStatement>("function f() { try { foo(); } finally { bar(); } }", AST.TryStatement),
      ),
    ).toBe(false);
  });
});
