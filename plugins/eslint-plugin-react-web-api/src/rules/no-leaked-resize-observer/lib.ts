import { Check, Extract } from "@eslint-react/ast";
import { isUseRefLikeCall } from "@eslint-react/core";
import { type RuleContext } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function isNewObserver(node: TSESTree.Node | null, name: string) {
  if (node?.type !== AST.NewExpression) return false;
  const callee = Extract.unwrap(node.callee);
  return Check.isIdentifier(callee, name);
}

export function isFromObserver(context: RuleContext, node: TSESTree.Expression, name: string): boolean {
  switch (true) {
    case Check.isIdentifier(node): {
      const initNode = resolve(context, node);
      const unwrapped = initNode == null ? null : Extract.unwrap(initNode);
      if (unwrapped == null) return false;
      if (isNewObserver(unwrapped, name)) return true;
      // `useRef(new XObserver(...))`: the instance is held by the ref and accessed via `.current`
      if (unwrapped.type === AST.CallExpression && isUseRefLikeCall(unwrapped)) {
        const arg = unwrapped.arguments.at(0);
        return arg != null && isNewObserver(Extract.unwrap(arg), name);
      }
      // A local alias of a member expression (ex: `const observer = observerRef.current`)
      if (unwrapped.type === AST.MemberExpression) {
        return isFromObserver(context, unwrapped, name);
      }
      return false;
    }
    case node.type === AST.MemberExpression:
      return isFromObserver(context, node.object, name);
    default:
      return false;
  }
}

/**
 * Check if the node refers to the instance held by a ref: either a direct `ref.current` member
 * access or a local alias initialized from it (`const observer = ref.current`).
 * @param context The ESLint rule context.
 * @param node The candidate node (the object of an observer method call).
 * @param refId The assignment target of the `useRef(new XObserver(...))` declaration.
 * @returns `true` if the node refers to the ref's instance.
 */
export function isFromRefCurrent(context: RuleContext, node: TSESTree.Node, refId: TSESTree.Node): boolean {
  let expr: TSESTree.Node = Check.isTypeExpression(node) ? Extract.unwrap(node) : node;
  if (Check.isIdentifier(expr)) {
    const initNode = resolve(context, expr);
    if (initNode != null) {
      expr = Extract.unwrap(initNode);
    }
  }
  return expr.type === AST.MemberExpression
    && !expr.computed
    && Check.isIdentifier(Extract.unwrap(expr.property), "current")
    && isAssignmentTargetEqual(context, expr.object, refId);
}
