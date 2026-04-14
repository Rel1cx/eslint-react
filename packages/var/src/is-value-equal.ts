import { Check, Compare, Extract, Traverse, isOneOf } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable, getStaticValue } from "@typescript-eslint/utils/ast-utils";

import { resolve } from "./resolve";

const thisBlockTypes = [
  AST.FunctionDeclaration,
  AST.FunctionExpression,
  AST.ClassBody,
  AST.Program,
] as const;

/**
 * Determine whether node value equals to another node value
 * @param context rule context
 * @param a node to compare
 * @param b node to compare
 * @returns `true` if node value equal
 */
export function isValueEqual(
  context: RuleContext,
  a: TSESTree.Node,
  b: TSESTree.Node,
): boolean {
  a = Check.isTypeExpression(a) ? Extract.unwrapped(a) : a;
  b = Check.isTypeExpression(b) ? Extract.unwrapped(b) : b;
  const [aScope, bScope] = [context.sourceCode.getScope(a), context.sourceCode.getScope(b)];
  switch (true) {
    case a === b: {
      return true;
    }
    case a.type === AST.Literal
      && b.type === AST.Literal: {
      return a.value === b.value;
    }
    case a.type === AST.TemplateElement
      && b.type === AST.TemplateElement: {
      return a.value.cooked === b.value.cooked;
    }
    case a.type === AST.Identifier
      && b.type === AST.Identifier: {
      const aDefNode = resolve(context, a);
      const bDefNode = resolve(context, b);
      const aDefNodeParent = aDefNode?.parent;
      const bDefNodeParent = bDefNode?.parent;
      const aVar = findVariable(aScope, a);
      const bVar = findVariable(bScope, b);
      const aDef = aVar?.defs.at(0);
      const bDef = bVar?.defs.at(0);
      const aDefParentParent = aDef?.parent?.parent;
      const bDefParentParent = bDef?.parent?.parent;
      switch (true) {
        case aDefNodeParent?.type === AST.CallExpression
          && bDefNodeParent?.type === AST.CallExpression
          && Check.isFunction(aDefNode)
          && Check.isFunction(bDefNode): {
          if (!Compare.areEqual(aDefNodeParent.callee, bDefNodeParent.callee)) {
            return false;
          }
          const aParams = aDefNode.params;
          const bParams = bDefNode.params;
          const aPos = aParams.findIndex((x) => Compare.areEqual(x, a));
          const bPos = bParams.findIndex((x) => Compare.areEqual(x, b));
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
          if (!Compare.areEqual(aRight, bRight)) {
            return false;
          }
          // When both variables come from the SAME for-of statement (e.g.
          // `for (const [a, b] of items)`), fall back to variable identity
          // so that `a` and `b` are not incorrectly treated as equal.
          // When they come from DIFFERENT for-of statements iterating the
          // same source (e.g. `for (const event of xs)` and
          // `for (const evt of xs)`), they represent the same values.
          if (aDefParentParent === bDefParentParent) {
            return aVar != null && bVar != null && aVar === bVar;
          }
          return true;
        }
        default: {
          return aVar != null && bVar != null && aVar === bVar;
        }
      }
    }
    case a.type === AST.MemberExpression
      && b.type === AST.MemberExpression: {
      const propEqual = a.computed && b.computed
        ? isValueEqual(context, a.property, b.property)
        : Compare.areEqual(a.property, b.property);
      return propEqual && isValueEqual(context, a.object, b.object);
    }
    case a.type === AST.ThisExpression
      && b.type === AST.ThisExpression: {
      if (aScope.block === bScope.block) {
        return true;
      }
      const aFunction = Traverse.findParent(a, isOneOf(thisBlockTypes));
      const bFunction = Traverse.findParent(b, isOneOf(thisBlockTypes));
      return aFunction === bFunction;
    }
    default: {
      const aStatic = getStaticValue(a, aScope);
      const bStatic = getStaticValue(b, bScope);
      return aStatic != null && bStatic != null && aStatic.value === bStatic.value;
    }
  }
}
