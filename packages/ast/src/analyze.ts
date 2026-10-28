import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if a statement terminates the control flow of its block.
 *
 * - Treats `return`, `throw`, `break`, and `continue` as terminating.
 * - Treats a block as terminating when any direct statement terminates (uses `some`), so unreachable trailing code does not matter.
 * - Treats an `if` as terminating only when it has an `else` and both branches terminate.
 * - Treats a `try` as terminating when its finalizer terminates, or when its try block terminates and, if present, its catch body terminates.
 * - Does not analyze `switch` statements, loops, or labeled statements, so an all-terminating `switch` or an infinite loop is not recognized.
 * - Is purely syntactic: conditions are not evaluated and no reachability analysis is performed.
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
 * Check if every path through a statement exits the current function with a `return` or `throw`.
 *
 * - Treats only `return` and `throw` as terminating; unlike {@link isTerminatingStatement}, `break` and `continue` are not.
 * - Inspects only the last statement of a block: `{ foo(); return; }` terminates, while `{ return; foo(); }` does not; earlier `break`/`continue` paths are not modeled.
 * - Treats an `if` as terminating only when it has an `else` and both branches terminate.
 * - Treats a `try` as terminating when its finalizer terminates, or when its try block terminates and, if present, its catch body terminates.
 * - Does not analyze `switch` statements, loops, or labeled statements, so `while (true) {}` is not recognized.
 * - Is purely syntactic: conditions are not evaluated and no reachability analysis is performed.
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
    case AST.TryStatement:
      if (node.finalizer != null && isUnconditionallyTerminating(node.finalizer)) return true;
      if (node.handler == null) return isUnconditionallyTerminating(node.block);
      return isUnconditionallyTerminating(node.block) && isUnconditionallyTerminating(node.handler.body);
    default:
      return false;
  }
}
