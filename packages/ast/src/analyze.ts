import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if a statement terminates the control flow of its block.
 *
 * A statement terminates when it cannot complete normally: a `return`, `throw`,
 * `break`, or `continue`, a block containing such a statement, an `if` whose
 * branches both terminate, or a `try` whose paths all terminate. `switch`
 * statements are not analyzed, so a `switch` whose entry paths all terminate is
 * not treated as terminating.
 * @param node The node to check.
 * @returns `true` if the statement terminates the control flow.
 */
export function isTerminatingStatement(node: TSESTree.Node): boolean {
  switch (node.type) {
    case AST.ReturnStatement:
    case AST.ThrowStatement:
    case AST.BreakStatement:
    case AST.ContinueStatement:
      return true;
    case AST.BlockStatement:
      return node.body.some(isTerminatingStatement);
    case AST.IfStatement:
      return node.alternate != null && isTerminatingStatement(node.consequent) && isTerminatingStatement(node.alternate);
    case AST.TryStatement:
      if (node.finalizer != null && isTerminatingStatement(node.finalizer)) return true;
      if (node.handler == null) return isTerminatingStatement(node.block);
      return isTerminatingStatement(node.block) && isTerminatingStatement(node.handler.body);
    default:
      return false;
  }
}

/**
 * Check if every path through a statement exits the current function with a
 * `return` or `throw`. Unlike {@link isTerminatingStatement}, `break` and
 * `continue` are not considered terminating.
 * @param node The node to check.
 * @returns `true` if the statement unconditionally terminates.
 */
export function isUnconditionallyTerminating(node: TSESTree.Node): boolean {
  switch (node.type) {
    case AST.ReturnStatement:
    case AST.ThrowStatement:
      return true;
    case AST.BlockStatement: {
      const last = node.body.at(-1);
      return last != null && isUnconditionallyTerminating(last);
    }
    case AST.IfStatement:
      return node.alternate != null && isUnconditionallyTerminating(node.consequent) && isUnconditionallyTerminating(node.alternate);
    default:
      return false;
  }
}
