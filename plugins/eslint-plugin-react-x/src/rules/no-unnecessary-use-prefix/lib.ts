import { Check, Traverse } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const WELL_KNOWN_HOOKS = ["use", "useMDXComponents"];

// Checks if a node contains comments that suggest a Hook usage like `use(Context)` or `useMyHook()`
export function containsUseComments(context: RuleContext, node: TSESTree.Node) {
  return context.sourceCode
    .getCommentsInside(node)
    .some(({ value }) => /use\([\s\S]*?\)/u.test(value) || /use[A-Z0-9]\w*\([\s\S]*?\)/u.test(value));
}

// Checks if a node is a test mock module registration call like `jest.mock(...)`, `vi.mock(...)`, or `mock.module(...)` (bun:test)
export function isTestMockCall(node: TSESTree.Node | null): node is TSESTree.CallExpression {
  if (node == null || node.type !== AST.CallExpression) return false;
  const { callee } = node;
  if (callee.type !== AST.MemberExpression) return false;
  // `jest.mock(...)`, `vi.mock(...)`, etc.
  if (Check.isIdentifier(callee.object) && Check.isIdentifier(callee.property, "mock")) return true;
  // `mock.module(...)` from `bun:test`
  return Check.isIdentifier(callee.object, "mock") && Check.isIdentifier(callee.property, "module");
}

// Checks if a node is part of the mock implementation passed to a test mock module registration call
export function isInTestMock(node: TSESTree.Node) {
  return Traverse.findParent(node, (n) => {
    if (!isTestMockCall(n)) return false;
    return n.arguments.slice(1).some((arg) => arg.range[0] <= node.range[0] && node.range[1] <= arg.range[1]);
  }) != null;
}
