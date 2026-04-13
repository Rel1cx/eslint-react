import { Check, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

/**
 * Creates a report function for the given rule context.
 * @param context The ESLint rule context.
 * @returns A function that can be used to report violations.
 */
export function report(context: RuleContext) {
  return (descriptor?: null | ReportDescriptor<string>) => {
    if (descriptor == null) return;
    return context.report(descriptor);
  };
}

/**
 * Gets the nested return statements in the node that are within the same function
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const statements: TSESTree.ReturnStatement[] = [];
  // If the node is not inside a function, boundaryNode will be null
  // and no return statements will be collected (as expected)
  const boundaryNode = Check.isFunction(node)
    ? node
    : Traverse.findParent(node, Check.isFunction);
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== AST.ReturnStatement) {
        return;
      }
      const parentFunction = Traverse.findParent(node, Check.isFunction);
      if (parentFunction !== boundaryNode) {
        return;
      }
      statements.push(node);
    },
  });
  return statements;
}
