import { Check } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";
import { isCreateElementCall } from "./api";

/**
 * BitFlags for configuring JSX detection behavior.
 *
 * Used by `isJSXLike` to control which AST node kinds are considered
 * "JSX-like". Combine flags with the `|` operator.
 */
export type JSXDetectionHint = bigint;

/* eslint-disable perfectionist/sort-objects */
/**
 * Hints for JSX detection.
 */
export const JSXDetectionHint = {
  /** No hints set. */
  None: 0n,
  /** Do not treat `null` values as JSX-like. */
  DoNotIncludeJSXWithNullValue: 1n << 0n,
  /** Do not treat number values as JSX-like. */
  DoNotIncludeJSXWithNumberValue: 1n << 1n,
  /** Do not treat bigint values as JSX-like. */
  DoNotIncludeJSXWithBigIntValue: 1n << 2n,
  /** Do not treat string values as JSX-like. */
  DoNotIncludeJSXWithStringValue: 1n << 3n,
  /** Do not treat boolean values as JSX-like. */
  DoNotIncludeJSXWithBooleanValue: 1n << 4n,
  /** Do not treat undefined values as JSX-like. */
  DoNotIncludeJSXWithUndefinedValue: 1n << 5n,
  /** Do not treat empty array values as JSX-like. */
  DoNotIncludeJSXWithEmptyArrayValue: 1n << 6n,
  /** Do not treat `createElement` calls as JSX-like. */
  DoNotIncludeJSXWithCreateElementValue: 1n << 7n,
  /** Require all array elements to be JSX-like for the array to be JSX-like. */
  RequireAllArrayElementsToBeJSX: 1n << 8n,
  /** Require both sides of a logical expression to be JSX-like. */
  RequireBothSidesOfLogicalExpressionToBeJSX: 1n << 9n,
  /** Require both branches of a conditional expression to be JSX-like. */
  RequireBothBranchesOfConditionalExpressionToBeJSX: 1n << 10n,
} as const;
/* eslint-enable perfectionist/sort-objects */

/**
 * Default JSX detection hint.
 *
 * Skips number, bigint, boolean, string, and undefined literals —
 * the value types commonly returned alongside JSX in React components.
 * They are excluded because callers are typically interested in
 * element-shaped values rather than text or flag content, not because
 * they are unrenderable (strings and numbers are renderable since
 * React 16).
 */
export const DEFAULT_JSX_DETECTION_HINT: JSXDetectionHint = 0n
  | JSXDetectionHint.DoNotIncludeJSXWithNumberValue
  | JSXDetectionHint.DoNotIncludeJSXWithBigIntValue
  | JSXDetectionHint.DoNotIncludeJSXWithBooleanValue
  | JSXDetectionHint.DoNotIncludeJSXWithStringValue
  | JSXDetectionHint.DoNotIncludeJSXWithUndefinedValue;

/**
 * Check if the node represents JSX-like content based on heuristics.
 *
 * The detection behavior is configurable through {@link JSXDetectionHint}
 * bit-flags so that callers can opt individual value kinds in or out.
 *
 * Identifiers are resolved to their definitions via scope analysis;
 * circular definitions (e.g. `var a = b; var b = a;`) are detected and
 * treated as not JSX-like instead of recursing indefinitely.
 *
 * @param context The ESLint rule context (needed for variable resolution).
 * @param node The AST node to analyze.
 * @param hint Optional bit-flags to adjust detection behavior. Defaults to {@link DEFAULT_JSX_DETECTION_HINT}.
 * @returns Whether the node is considered JSX-like.
 *
 * @example
 * ```ts
 * import { isJSXLike } from "@eslint-react/core";
 *
 * if (isJSXLike(context, node)) {
 *   // node looks like it evaluates to a React element
 * }
 * ```
 */
export function isJSXLike(context: RuleContext, node: TSESTree.Node | null, hint: JSXDetectionHint = DEFAULT_JSX_DETECTION_HINT): boolean {
  const seen = new Set<TSESTree.Identifier>();
  function visit(node: TSESTree.Node | null): boolean {
    if (node == null) return false;

    // Actual JSX nodes are always considered JSX-like.
    if (Check.isJSX(node)) return true;

    switch (node.type) {
      // Type-level wrappers and chain expressions don't change the runtime value; unwrap them.
      case AST.TSAsExpression:
      case AST.TSSatisfiesExpression:
      case AST.TSTypeAssertion:
      case AST.TSNonNullExpression:
      case AST.ChainExpression:
        return visit(node.expression);

      case AST.AwaitExpression:
        return visit(node.argument);

      case AST.Literal: {
        return match(node.value)
          .with(P.nullish, () => !(hint & JSXDetectionHint.DoNotIncludeJSXWithNullValue))
          .with(P.boolean, () => !(hint & JSXDetectionHint.DoNotIncludeJSXWithBooleanValue))
          .with(P.string, () => !(hint & JSXDetectionHint.DoNotIncludeJSXWithStringValue))
          .with(P.number, () => !(hint & JSXDetectionHint.DoNotIncludeJSXWithNumberValue))
          .with(P.bigint, () => !(hint & JSXDetectionHint.DoNotIncludeJSXWithBigIntValue))
          .with(P.instanceOf(RegExp), () => false)
          .exhaustive();
      }

      case AST.TemplateLiteral:
        return !(hint & JSXDetectionHint.DoNotIncludeJSXWithStringValue);

      case AST.ArrayExpression: {
        if (node.elements.length === 0) {
          return !(hint & JSXDetectionHint.DoNotIncludeJSXWithEmptyArrayValue);
        }
        return hint & JSXDetectionHint.RequireAllArrayElementsToBeJSX
          ? node.elements.every(visit)
          : node.elements.some(visit);
      }

      case AST.LogicalExpression: {
        if (hint & JSXDetectionHint.RequireBothSidesOfLogicalExpressionToBeJSX) {
          return visit(node.left) && visit(node.right);
        }
        return visit(node.left) || visit(node.right);
      }

      case AST.ConditionalExpression: {
        if (hint & JSXDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJSX) {
          return visit(node.consequent) && visit(node.alternate);
        }
        return visit(node.consequent) || visit(node.alternate);
      }

      // Only the last expression determines the value of a sequence.
      case AST.SequenceExpression:
        return visit(node.expressions.at(-1) ?? null);

      case AST.CallExpression: {
        if (hint & JSXDetectionHint.DoNotIncludeJSXWithCreateElementValue) {
          return false;
        }
        return isCreateElementCall(context, node);
      }

      case AST.Identifier: {
        // Look up the scope binding first so that a local binding named
        // `undefined` shadows the global value; only an unbound `undefined`
        // refers to the global undefined value.
        if (node.name === "undefined" && findVariable(context.sourceCode.getScope(node), node) == null) {
          return !(hint & JSXDetectionHint.DoNotIncludeJSXWithUndefinedValue);
        }
        // Guard against circular variable definitions (e.g. `var a = b; var b = a;`)
        // by tracking the identifiers on the current resolution path only;
        // sibling visits may resolve the same identifier independently.
        if (seen.has(node)) return false;
        seen.add(node);
        const result = visit(resolve(context, node));
        seen.delete(node);
        return result;
      }
    }

    return false;
  }

  return visit(node);
}
