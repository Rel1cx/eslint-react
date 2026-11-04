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

  it("should match a switch statement when every clause terminates and a default exists", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>(
          "function f() { switch (a) { case 1: return 1; default: return 2; } }",
          AST.SwitchStatement,
        ),
      ),
    ).toBe(true);
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>("function f() { switch (a) { default: return 1; } }", AST.SwitchStatement),
      ),
    ).toBe(true);
  });

  it("should not match a switch statement without a default clause", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>("function f() { switch (a) { case 1: return 1; case 2: return 2; } }", AST.SwitchStatement),
      ),
    ).toBe(false);
  });

  it("should not match a switch statement with a clause that can complete normally", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>("function f() { switch (a) { case 1: return 1; default: foo(); } }", AST.SwitchStatement),
      ),
    ).toBe(false);
  });

  it("should not match a switch statement with a fall-through clause group", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>(
          "function f() { switch (a) { case 1: case 2: return 1; default: return 2; } }",
          AST.SwitchStatement,
        ),
      ),
    ).toBe(false);
  });

  it("should not match a switch statement with a clause break", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>(
          "function f() { switch (a) { case 1: if (b) break; return 1; default: return 2; } }",
          AST.SwitchStatement,
        ),
      ),
    ).toBe(false);
  });

  it("should not match a switch statement with a clause continue", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>(
          "function f() { while (b) { switch (a) { case 1: if (c) continue; return 1; default: return 2; } } }",
          AST.SwitchStatement,
        ),
      ),
    ).toBe(false);
  });

  it("should match a switch statement when breaks are nested inside a loop or switch", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>(
          "function f() { switch (a) { case 1: while (b) { break; } return 1; default: return 2; } }",
          AST.SwitchStatement,
        ),
      ),
    ).toBe(true);
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.SwitchStatement>(
          "function f() { switch (a) { case 1: switch (b) { case 2: break; } return 1; default: return 2; } }",
          AST.SwitchStatement,
        ),
      ),
    ).toBe(true);
  });

  it("should match a while (true) loop with a terminating body", () => {
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.WhileStatement>("function f() { while (true) { return 1; } }", AST.WhileStatement)),
    ).toBe(true);
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.WhileStatement>("function f() { while (true) return 1; }", AST.WhileStatement)),
    ).toBe(true);
  });

  it("should not match a while loop with a non-constant or falsy test", () => {
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.WhileStatement>("function f() { while (a) { return 1; } }", AST.WhileStatement)),
    ).toBe(false);
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.WhileStatement>("function f() { while (false) { return 1; } }", AST.WhileStatement)),
    ).toBe(false);
  });

  it("should not match a while (true) loop whose body can break", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.WhileStatement>("function f() { while (true) { if (a) break; return 1; } }", AST.WhileStatement),
      ),
    ).toBe(false);
  });

  it("should not match a loop with a labeled break", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.WhileStatement>(
          "function f() { outer: while (true) { if (a) break outer; return 1; } }",
          AST.WhileStatement,
        ),
      ),
    ).toBe(false);
  });

  it("should match a while (true) loop when jumps are nested inside an inner loop", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.WhileStatement>(
          "function f() { while (true) { while (a) { break; } return 1; } }",
          AST.WhileStatement,
        ),
      ),
    ).toBe(true);
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.WhileStatement>(
          "function f() { while (true) { while (a) { continue; } return 1; } }",
          AST.WhileStatement,
        ),
      ),
    ).toBe(true);
  });

  it("should match a for loop with no test or a true test and a terminating body", () => {
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.ForStatement>("function f() { for (;;) { return 1; } }", AST.ForStatement)),
    ).toBe(true);
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.ForStatement>("function f() { for (; true; ) { return 1; } }", AST.ForStatement)),
    ).toBe(true);
  });

  it("should not match a for loop with a non-constant test", () => {
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.ForStatement>("function f() { for (; a; ) { return 1; } }", AST.ForStatement)),
    ).toBe(false);
  });

  it("should match a do...while loop with a terminating body", () => {
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.DoWhileStatement>("function f() { do { return 1; } while (a); }", AST.DoWhileStatement)),
    ).toBe(true);
    expect(
      isUnconditionallyTerminating(getFirstNodeOfType<TSESTree.DoWhileStatement>("function f() { do return 1; while (a); }", AST.DoWhileStatement)),
    ).toBe(true);
  });

  it("should not match a do...while loop whose body can break or continue", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.DoWhileStatement>("function f() { do { if (a) break; return 1; } while (b); }", AST.DoWhileStatement),
      ),
    ).toBe(false);
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.DoWhileStatement>("function f() { do { if (a) continue; return 1; } while (b); }", AST.DoWhileStatement),
      ),
    ).toBe(false);
  });

  it("should not match a labeled loop", () => {
    expect(
      isUnconditionallyTerminating(
        getFirstNodeOfType<TSESTree.LabeledStatement>("function f() { outer: while (true) { return 1; } }", AST.LabeledStatement),
      ),
    ).toBe(false);
  });
});
