import { Check } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const WELL_KNOWN_HOOKS = ["useMDXComponents"];

// Checks if a node contains comments that suggest a Hook usage like `use(Context)` or `useMyHook()`
export function containsUseComments(context: RuleContext, node: TSESTree.Node) {
  return context.sourceCode
    .getCommentsInside(node)
    .some(({ value }) => /use\([\s\S]*?\)/u.test(value) || /use[A-Z0-9]\w*\([\s\S]*?\)/u.test(value));
}

export function isTestMock(node: TSESTree.Node | null): node is TSESTree.MemberExpression {
  return node != null
    && node.type === AST.MemberExpression
    && node.object.type === AST.Identifier
    && node.property.type === AST.Identifier
    && node.property.name === "mock";
}

export function isTestMockCallback(node: TSESTree.Node | null) {
  return node != null
    && Check.isFunction(node)
    && node.parent.type === AST.CallExpression
    && isTestMock(node.parent.callee)
    && node.parent.arguments[1] === node;
}
