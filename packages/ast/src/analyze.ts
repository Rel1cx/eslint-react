import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { type VisitorKeys, visitorKeys as defaultVisitorKeys } from "@typescript-eslint/visitor-keys";
import { simpleTraverse } from "./traverse";

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

const jumpBarrierVisitorKeys: VisitorKeys = {
  ...defaultVisitorKeys,
  ArrowFunctionExpression: [],
  FunctionDeclaration: [],
  FunctionExpression: [],
};

/**
 * Check whether `node` contains a `break`/`continue` that transfers control out of the construct
 * being analyzed for termination, making it able to complete normally:
 *
 * - any labeled `break`/`continue` disqualifies conservatively, since it may target a labeled
 *   statement enclosing the analyzed construct;
 * - an unlabeled `break` disqualifies unless nested inside another loop or switch, where it targets
 *   the inner construct instead;
 * - an unlabeled `continue` disqualifies only when `checkContinue` is set and it is not nested
 *   inside another loop.
 * @param node The node to inspect.
 * @param checkContinue Whether exiting `continue` statements disqualify (switches and `do...while`
 * loops); loops with a constant-true test re-enter on `continue`, so they pass `false`.
 */
function hasExitingJump(node: TSESTree.Node, checkContinue: boolean): boolean {
  let found = false;
  let loopDepth = 0;
  let loopOrSwitchDepth = 0;
  simpleTraverse(node, {
    enter(child) {
      switch (child.type) {
        case AST.BreakStatement:
          if (child.label != null || loopOrSwitchDepth === 0) found = true;
          break;
        case AST.ContinueStatement:
          if (child.label != null || (checkContinue && loopDepth === 0)) found = true;
          break;
        case AST.WhileStatement:
        case AST.DoWhileStatement:
        case AST.ForStatement:
        case AST.ForInStatement:
        case AST.ForOfStatement:
          loopDepth += 1;
          loopOrSwitchDepth += 1;
          break;
        case AST.SwitchStatement:
          loopOrSwitchDepth += 1;
          break;
      }
    },
    leave(child) {
      switch (child.type) {
        case AST.WhileStatement:
        case AST.DoWhileStatement:
        case AST.ForStatement:
        case AST.ForInStatement:
        case AST.ForOfStatement:
          loopDepth -= 1;
          loopOrSwitchDepth -= 1;
          break;
        case AST.SwitchStatement:
          loopOrSwitchDepth -= 1;
          break;
      }
    },
    visitorKeys: jumpBarrierVisitorKeys,
  });
  return found;
}

/** Check whether `node` is exactly the `true` literal; no constant folding is attempted. */
function isTrueLiteral(node: TSESTree.Expression): boolean {
  return node.type === AST.Literal && node.value === true;
}

/**
 * Check if every path through a statement exits the current function with a `return` or `throw`.
 *
 * - Treats only `return` and `throw` as terminating; unlike {@link isTerminatingStatement}, `break` and `continue` are not.
 * - Inspects only the last statement of a block: `{ foo(); return; }` terminates, while `{ return; foo(); }` does not; earlier `break`/`continue` paths are not modeled.
 * - Treats an `if` as terminating only when it has an `else` and both branches terminate.
 * - Treats a `try` as terminating when its finalizer terminates, or when its try block terminates and, if present, its catch body terminates.
 * - Treats a `while (true)` or `for (;;)` loop as terminating when its body terminates and contains no exiting `break`.
 * - Treats a `do...while` loop as terminating when its body terminates and contains no exiting `break` or `continue`.
 * - Treats a `switch` with a `default` clause as terminating when every clause's statements terminate and no clause contains an exiting `break`/`continue`; fall-through clause groups are not recognized.
 * - Does not analyze labeled statements, and any labeled `break`/`continue` disqualifies the enclosing loop or switch conservatively.
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
    case AST.SwitchStatement: {
      if (!node.cases.some((switchCase) => switchCase.test == null)) return false;
      return node.cases.every((switchCase) => {
        const last = switchCase.consequent.at(-1);
        if (last == null) return false;
        if (!isUnconditionallyTerminating(last)) return false;
        return switchCase.consequent.every((statement) => !hasExitingJump(statement, true));
      });
    }
    case AST.WhileStatement: {
      if (!isTrueLiteral(node.test)) return false;
      if (!isUnconditionallyTerminating(node.body)) return false;
      return !hasExitingJump(node.body, false);
    }
    case AST.DoWhileStatement: {
      if (!isUnconditionallyTerminating(node.body)) return false;
      return !hasExitingJump(node.body, true);
    }
    case AST.ForStatement: {
      if (node.test != null && !isTrueLiteral(node.test)) return false;
      if (!isUnconditionallyTerminating(node.body)) return false;
      return !hasExitingJump(node.body, false);
    }
    default:
      return false;
  }
}
