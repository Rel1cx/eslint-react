import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolveOrigin } from "@eslint-react/var";
import { hasProperty } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

/**
 * Create a resolver that answers whether an identifier or call originates from
 * a `useState`-like hook's setter function (the element at index 1 of the
 * returned tuple).
 * @param context The rule context
 * @returns The setState provenance resolver
 */
export function createSetStateResolver(context: RuleContext) {
  const { additionalStateHooks } = getSettingsFromContext(context);

  function isUseStateCall(node: TSESTree.Node): boolean {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isSetStateId(id: TSESTree.Identifier, at?: number) {
    const initNode = resolveOrigin(context, id);
    if (initNode == null) return false;
    if (initNode.type !== AST.CallExpression) return false;
    if (!isUseStateCall(initNode)) return false;
    const variableNodeParent = initNode.parent;
    if (!hasProperty(variableNodeParent, "id")) {
      return true;
    }
    // `const { 1: setData } = useState()` destructures the tuple by numeric key
    if (variableNodeParent.id?.type === AST.ObjectPattern) {
      return variableNodeParent.id.properties.some((p) =>
        p.type === AST.Property
        && p.key.type === AST.Literal
        && p.key.value === (at ?? 1)
        && Check.isIdentifier(p.value, id.name)
      );
    }
    if (variableNodeParent.id?.type !== AST.ArrayPattern) {
      return true;
    }
    return variableNodeParent
      .id
      .elements
      .findIndex((e) => e != null && Check.isIdentifier(e, id.name)) === at;
  }

  function isSetStateCall(node: TSESTree.CallExpression) {
    const callee = Extract.unwrap(node.callee);
    switch (callee.type) {
      // const data = useState();
      // data.at(1)();
      case AST.CallExpression: {
        const innerCallee = Extract.unwrap(callee.callee);
        if (innerCallee.type !== AST.MemberExpression) {
          return false;
        }
        if (!hasProperty(innerCallee.object, "name")) {
          return false;
        }
        const isAt = Extract.getCalleeName(callee) === "at";
        const [index] = callee.arguments;
        if (!isAt || index == null) {
          return false;
        }
        const indexScope = context.sourceCode.getScope(node);
        const indexValue = getStaticValue(index, indexScope)?.value;
        return indexValue === 1 && isSetStateId(innerCallee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case AST.Identifier: {
        return isSetStateId(callee, 1);
      }
      // const data = useState();
      // data[1]();
      case AST.MemberExpression: {
        if (!hasProperty(callee.object, "name")) {
          return false;
        }
        const property = callee.property;
        const propertyScope = context.sourceCode.getScope(node);
        const propertyValue = getStaticValue(property, propertyScope)?.value;
        return propertyValue === 1 && isSetStateId(callee.object, 1);
      }
      default: {
        return false;
      }
    }
  }

  return { isSetStateCall, isSetStateId, isUseStateCall } as const;
}
