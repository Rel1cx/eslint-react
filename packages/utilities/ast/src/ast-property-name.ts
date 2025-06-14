import { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

import { getJSExpression } from "./ast-expression";
import { isTypeExpression } from "./ast-is";

export function getPropertyName(node: TSESTree.Node): string | unit {
  if (isTypeExpression(node)) {
    return getPropertyName(getJSExpression(node));
  }
  if (node.type === T.Identifier || node.type === T.PrivateIdentifier) {
    return node.name;
  }
  if (node.type === T.Literal) {
    return String(node.value);
  }
  if (node.type === T.TemplateLiteral && node.expressions.length === 0) {
    return node.quasis[0]?.value.raw;
  }
  return unit;
}
