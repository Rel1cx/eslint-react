import { Check, Compare, Extract, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { hasProperty } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { getBindingFromScope, projectBinding } from "./resolve-binding";

/** How identifiers are compared. */
export type IdentifierComparison = "identity" | "provenance";

/** Options for {@link isEqualWith}. */
export interface IsEqualWithOptions {
  /**
   * How identifiers are compared.
   *
   * - `"identity"`: compare identifiers by variable identity (default).
   * - `"provenance"`: additionally apply callback-parameter and loop-variable rules.
   */
  identifierComparison?: IdentifierComparison;
}

/**
 * Check whether a literal is a regular expression literal.
 * @param node The literal to check.
 * @returns `true` when the literal has a `regex` property.
 */
function isRegExpLiteral(node: TSESTree.Literal): node is TSESTree.RegExpLiteral {
  return hasProperty(node, "regex");
}

// Ordered by observed nearest-ancestor frequency (most frequent first).
const thisBlockTypes = [
  AST.FunctionExpression,
  AST.FunctionDeclaration,
  AST.ClassBody,
  AST.Program,
] as const;

/**
 * Compare two nodes, choosing how identifiers are compared.
 * @param context The ESLint rule context.
 * @param a The first node to compare.
 * @param b The second node to compare.
 * @param options Optional comparison settings; see {@link IsEqualWithOptions}.
 * @returns `true` if the two nodes are considered equal.
 */
export function isEqualWith(context: RuleContext, a: TSESTree.Node, b: TSESTree.Node, options?: IsEqualWithOptions): boolean {
  const { identifierComparison = "identity" } = options ?? {};
  a = Check.isTypeExpression(a) ? Extract.unwrap(a) : a;
  b = Check.isTypeExpression(b) ? Extract.unwrap(b) : b;
  // A chain expression only marks optional chaining; the optional flags that
  // affect the value live on the inner member or call expression.
  a = a.type === AST.ChainExpression ? a.expression : a;
  b = b.type === AST.ChainExpression ? b.expression : b;
  const [aScope, bScope] = [context.sourceCode.getScope(a), context.sourceCode.getScope(b)];
  switch (true) {
    case a === b: {
      return true;
    }
    case a.type === AST.Literal
      && b.type === AST.Literal: {
      // Every regex literal evaluates to a distinct `RegExp` object, so compare
      // the pattern and flags instead of the `value` object identity.
      if (isRegExpLiteral(a)) {
        return isRegExpLiteral(b) && a.regex.pattern === b.regex.pattern && a.regex.flags === b.regex.flags;
      }
      return !isRegExpLiteral(b) && a.value === b.value;
    }
    case a.type === AST.TemplateElement
      && b.type === AST.TemplateElement: {
      return a.value.cooked === b.value.cooked;
    }
    case Check.isIdentifier(a)
      && Check.isIdentifier(b): {
      const aBinding = getBindingFromScope(aScope, a);
      const bBinding = getBindingFromScope(bScope, b);
      if (identifierComparison === "provenance") {
        const aDefNode = aBinding?.definition == null ? null : projectBinding(aBinding.definition, "origin");
        const bDefNode = bBinding?.definition == null ? null : projectBinding(bBinding.definition, "origin");
        const aDefNodeParent = aDefNode?.parent;
        const bDefNodeParent = bDefNode?.parent;
        const aDef = aBinding?.definition;
        const bDef = bBinding?.definition;
        const aDefParentParent = aDef?.parent?.parent;
        const bDefParentParent = bDef?.parent?.parent;
        switch (true) {
          case aDefNodeParent?.type === AST.CallExpression
            && bDefNodeParent?.type === AST.CallExpression
            && Check.isFunction(aDefNode)
            && Check.isFunction(bDefNode): {
            if (!Compare.isEqual(aDefNodeParent.callee, bDefNodeParent.callee)) {
              return false;
            }
            const aParams = aDefNode.params;
            const bParams = bDefNode.params;
            const aPos = aParams.findIndex((x) => Compare.isEqual(x, a));
            const bPos = bParams.findIndex((x) => Compare.isEqual(x, b));
            return aPos !== -1 && bPos !== -1 && aPos === bPos;
          }
          case aDefParentParent?.type === AST.ForOfStatement
            && bDefParentParent?.type === AST.ForOfStatement: {
            const aLeft = aDefParentParent.left;
            const bLeft = bDefParentParent.left;
            if (aLeft.type !== bLeft.type) {
              return false;
            }
            const aRight = aDefParentParent.right;
            const bRight = bDefParentParent.right;
            if (!Compare.isEqual(aRight, bRight)) {
              return false;
            }
            // When both variables come from the SAME for-of statement (e.g.
            // `for (const [a, b] of items)`), fall back to variable identity
            // so that `a` and `b` are not incorrectly treated as equal.
            // When they come from DIFFERENT for-of statements iterating the
            // same source (e.g. `for (const event of xs)` and
            // `for (const evt of xs)`), they represent the same values.
            if (aDefParentParent === bDefParentParent) {
              return aBinding != null && bBinding != null && aBinding.variable === bBinding.variable;
            }
            return true;
          }
        }
      }
      return aBinding != null && bBinding != null && aBinding.variable === bBinding.variable;
    }
    case a.type === AST.MemberExpression
      && b.type === AST.MemberExpression: {
      if (a.computed !== b.computed || a.optional !== b.optional) {
        return false;
      }
      const propEqual = a.computed
        ? isEqualWith(context, a.property, b.property, options)
        : Compare.isEqual(a.property, b.property);
      return propEqual && isEqualWith(context, a.object, b.object, options);
    }
    case a.type === AST.ThisExpression
      && b.type === AST.ThisExpression: {
      if (aScope.block === bScope.block) {
        return true;
      }
      return Traverse.findParent(a, Check.isOneOf(thisBlockTypes)) === Traverse.findParent(b, Check.isOneOf(thisBlockTypes));
    }
    default: {
      const aStatic = getStaticValue(a, aScope);
      const bStatic = getStaticValue(b, bScope);
      if (aStatic == null || bStatic == null) return false;
      return aStatic.value === bStatic.value;
    }
  }
}
