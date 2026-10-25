import { collectNodes, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { findEnclosingTryBlock, findParent, hasEnclosingTryBlock, hasParent, simpleTraverse } from "./traverse";

function stripParentPointers(node: TSESTree.Node): void {
  simpleTraverse(node, {
    enter(child) {
      Reflect.deleteProperty(child, "parent");
    },
  });
}

describe("simpleTraverse", () => {
  it("should visit nodes in pre-order and pass the parent", () => {
    const ast = parseCode("const a = 1;").ast;
    const visited: string[] = [];
    simpleTraverse(ast, {
      enter(node, parent) {
        visited.push(node.type);
        expect(node.parent).toBe(parent);
      },
    });
    expect(visited).toEqual([AST.Program, AST.VariableDeclaration, AST.VariableDeclarator, AST.Identifier, AST.Literal]);
  });

  it("should call enter before children and leave after them", () => {
    const ast = parseCode("const a = 1;").ast;
    const events: string[] = [];
    simpleTraverse(ast, {
      enter(node) {
        events.push(`enter:${node.type}`);
      },
      leave(node) {
        events.push(`leave:${node.type}`);
      },
    });
    expect(events).toEqual([
      `enter:${AST.Program}`,
      `enter:${AST.VariableDeclaration}`,
      `enter:${AST.VariableDeclarator}`,
      `enter:${AST.Identifier}`,
      `leave:${AST.Identifier}`,
      `enter:${AST.Literal}`,
      `leave:${AST.Literal}`,
      `leave:${AST.VariableDeclarator}`,
      `leave:${AST.VariableDeclaration}`,
      `leave:${AST.Program}`,
    ]);
  });

  it("should only traverse the subtree of the given root", () => {
    const ast = parseCode("const a = 1; function f() { return 2; }").ast;
    const [fn] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const visited: string[] = [];
    simpleTraverse(fn!, {
      enter(node) {
        visited.push(node.type);
      },
    });
    expect(visited[0]).toBe(AST.FunctionDeclaration);
    expect(visited).not.toContain(AST.Program);
    expect(visited).not.toContain(AST.VariableDeclaration);
  });

  it("should prune subtrees with custom visitor keys", () => {
    const ast = parseCode("function f() { return 1; }").ast;
    const visited: string[] = [];
    simpleTraverse(ast, {
      enter(node) {
        visited.push(node.type);
      },
      visitorKeys: {
        [AST.Program]: ["body"],
        [AST.FunctionDeclaration]: [],
      },
    });
    expect(visited).toEqual([AST.Program, AST.FunctionDeclaration]);
  });

  it("should attach parent pointers when setParentPointers is enabled", () => {
    const ast = parseCode("function f() { const x = 1; }").ast;
    stripParentPointers(ast);
    const [fn] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const [decl] = collectNodes<TSESTree.VariableDeclaration>(ast, AST.VariableDeclaration);
    expect(fn!.parent).toBeUndefined();
    expect(decl!.parent).toBeUndefined();
    simpleTraverse(ast, {
      enter() {},
      setParentPointers: true,
    });
    expect(ast.parent).toBeUndefined();
    expect(fn!.parent).toBe(ast);
    expect(decl!.parent).toBe(fn!.body);
  });

  it("should skip null and non-node children", () => {
    const ast = parseCode("const x = [a, , b];").ast;
    const names: string[] = [];
    simpleTraverse(ast, {
      enter(node) {
        if (node.type === AST.Identifier) names.push(node.name);
      },
    });
    expect(names).toEqual(["x", "a", "b"]);
  });

  it("should visit the root even when its type has no visitor keys", () => {
    const [identifier] = collectNodes<TSESTree.Identifier>("a;", AST.Identifier);
    const visited: string[] = [];
    simpleTraverse(identifier!, {
      enter(node) {
        visited.push(node.type);
      },
    });
    expect(visited).toEqual([AST.Identifier]);
  });

  it("should not fail when no callbacks are provided", () => {
    const ast = parseCode("const a = 1;").ast;
    expect(() => simpleTraverse(ast)).not.toThrow();
  });
});

describe("findParent", () => {
  it("should return the first matching ancestor", () => {
    const ast = parseCode("function foo() { const x = 1; }").ast;
    const identifier = collectNodes<TSESTree.Identifier>(ast, AST.Identifier)[1]!;
    const parent = findParent(identifier, (n) => n.type === AST.FunctionDeclaration);
    expect(parent).not.toBeNull();
    expect(parent!.type).toBe(AST.FunctionDeclaration);
  });

  it("should return null when the stop boundary itself matches test (stop takes precedence)", () => {
    const ast = parseCode("function foo() { const x = 1; }").ast;
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const [func] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const identifier = ids.at(-1)!;
    const parent = findParent(
      identifier,
      (n) => n.type === AST.FunctionDeclaration,
      (n) => n === func,
    );
    expect(parent).toBeNull();
  });

  it("should return the nested match when it appears before the stop boundary", () => {
    const ast = parseCode("function foo() { function bar() { const x = 1; } }").ast;
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const [foo] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const identifier = ids.at(-1)!;
    const parent = findParent(
      identifier,
      (n) => n.type === AST.FunctionDeclaration,
      (n) => n === foo,
    );
    expect(parent).not.toBeNull();
    expect(parent!.type).toBe(AST.FunctionDeclaration);
    expect(parent).not.toBe(foo);
  });

  it("should find the match when stop is not an ancestor", () => {
    const ast = parseCode("function foo() { const x = 1; } function bar() {}").ast;
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const x = ids[1]!;
    const [, bar] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const parent = findParent(
      x,
      (n) => n.type === AST.FunctionDeclaration,
      (n) => n === bar,
    );
    expect(parent).not.toBeNull();
    expect(parent!.type).toBe(AST.FunctionDeclaration);
    expect(parent).not.toBe(bar);
  });

  it("should return null when no match is found before Program", () => {
    const ast = parseCode("const x = 1;").ast;
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const identifier = ids.at(-1)!;
    const parent = findParent(identifier, (n) => n.type === AST.FunctionDeclaration);
    expect(parent).toBeNull();
  });

  it("should return the Program when Program itself matches", () => {
    const ast = parseCode("const x = 1;").ast;
    const [identifier] = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    expect(findParent(identifier!, (n) => n.type === AST.Program)).toBe(ast);
  });

  it("should return null when a non-function stop blocks the search", () => {
    const ast = parseCode("function foo() { if (true) { const x = 1; } }").ast;
    const ids = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    const [ifStmt] = collectNodes<TSESTree.IfStatement>(ast, AST.IfStatement);
    const identifier = ids.at(-1)!;
    const parent = findParent(
      identifier,
      (n) => n.type === AST.FunctionDeclaration,
      (n) => n === ifStmt,
    );
    expect(parent).toBeNull();
  });

  it("should return null when node is null", () => {
    const parent = findParent(null, (n) => n.type === AST.FunctionDeclaration);
    expect(parent).toBeNull();
  });

  it("should return null when the node has no parent pointer", () => {
    const [identifier] = collectNodes<TSESTree.Identifier>("const x = 1;", AST.Identifier);
    Reflect.deleteProperty(identifier!, "parent");
    expect(findParent(identifier!, (n) => n.type === AST.Program)).toBeNull();
  });
});

describe("hasParent", () => {
  it("should return true when an ancestor matches", () => {
    const ast = parseCode("const x = 1;").ast;
    const [identifier] = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    expect(hasParent(identifier!, (n) => n.type === AST.Program)).toBe(true);
  });

  it("should return false when no ancestor matches", () => {
    const ast = parseCode("const x = 1;").ast;
    const [identifier] = collectNodes<TSESTree.Identifier>(ast, AST.Identifier);
    expect(hasParent(identifier!, (n) => n.type === AST.FunctionDeclaration)).toBe(false);
  });

  it("should return false when a stop boundary blocks the match", () => {
    const ast = parseCode("function foo() { const x = 1; }").ast;
    const [fn] = collectNodes<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    const identifier = collectNodes<TSESTree.Identifier>(ast, AST.Identifier).at(-1)!;
    expect(hasParent(identifier, (n) => n.type === AST.FunctionDeclaration, (n) => n === fn)).toBe(false);
  });

  it("should return false when node is null", () => {
    expect(hasParent(null, (n) => n.type === AST.Program)).toBe(false);
  });

  it("should return false when the node has no parent pointer", () => {
    const [identifier] = collectNodes<TSESTree.Identifier>("const x = 1;", AST.Identifier);
    Reflect.deleteProperty(identifier!, "parent");
    expect(hasParent(identifier!, (n) => n.type === AST.Program)).toBe(false);
  });
});

describe("findEnclosingTryBlock", () => {
  it("should return the TryStatement when the node is inside the try block", () => {
    const ast = parseCode("try { foo(); } catch { bar(); }").ast;
    const [foo] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    const [tryStmt] = collectNodes<TSESTree.TryStatement>(ast, AST.TryStatement);
    const stmt = findEnclosingTryBlock(foo!);
    expect(stmt).toBe(tryStmt);
  });

  it("should return the innermost TryStatement when nested try blocks enclose the node", () => {
    const ast = parseCode("try { try { foo(); } catch { bar(); } } catch { baz(); }").ast;
    const [foo] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    const [, inner] = collectNodes<TSESTree.TryStatement>(ast, AST.TryStatement);
    expect(findEnclosingTryBlock(foo!)).toBe(inner);
  });

  it("should return null when the node is inside the catch clause", () => {
    const ast = parseCode("try { foo(); } catch { bar(); }").ast;
    const [, bar] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    const stmt = findEnclosingTryBlock(bar!);
    expect(stmt).toBeNull();
  });

  it("should return null when the node is inside the finally block", () => {
    const ast = parseCode("try { foo(); } finally { bar(); }").ast;
    const [, bar] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    const stmt = findEnclosingTryBlock(bar!);
    expect(stmt).toBeNull();
  });

  it("should return null when no TryStatement encloses the node", () => {
    const ast = parseCode("function foo() { bar(); }").ast;
    const [bar] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    const stmt = findEnclosingTryBlock(bar!);
    expect(stmt).toBeNull();
  });

  it("should return the outer TryStatement when the node is in an inner catch clause enclosed by an outer try block", () => {
    const ast = parseCode("try { try { foo(); } catch { bar(); } } catch { baz(); }").ast;
    const [, bar] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    const [outer] = collectNodes<TSESTree.TryStatement>(ast, AST.TryStatement);
    const stmt = findEnclosingTryBlock(bar!);
    expect(stmt).toBe(outer);
  });

  it("should return null when the node is the Program", () => {
    const ast = parseCode("try { foo(); } catch {}").ast;
    expect(findEnclosingTryBlock(ast)).toBeNull();
  });

  it("should return null when the node has no parent pointer", () => {
    const [foo] = collectNodes<TSESTree.CallExpression>("try { foo(); } catch {}", AST.CallExpression);
    Reflect.deleteProperty(foo!, "parent");
    expect(findEnclosingTryBlock(foo!)).toBeNull();
  });
});

describe("hasEnclosingTryBlock", () => {
  it("should return true when the node is inside a try block", () => {
    const ast = parseCode("try { foo(); } catch { bar(); }").ast;
    const [foo] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    expect(hasEnclosingTryBlock(foo!)).toBe(true);
  });

  it("should return false when the node is inside a catch clause", () => {
    const ast = parseCode("try { foo(); } catch { bar(); }").ast;
    const [, bar] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    expect(hasEnclosingTryBlock(bar!)).toBe(false);
  });

  it("should return false when no try block encloses the node", () => {
    const ast = parseCode("function foo() { bar(); }").ast;
    const [bar] = collectNodes<TSESTree.CallExpression>(ast, AST.CallExpression);
    expect(hasEnclosingTryBlock(bar!)).toBe(false);
  });

  it("should return false when the node has no parent pointer", () => {
    const [foo] = collectNodes<TSESTree.CallExpression>("try { foo(); } catch {}", AST.CallExpression);
    Reflect.deleteProperty(foo!, "parent");
    expect(hasEnclosingTryBlock(foo!)).toBe(false);
  });
});
