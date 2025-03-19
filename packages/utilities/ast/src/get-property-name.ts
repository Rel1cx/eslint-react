import { _ } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

import { getEcmaExpression } from "./get-ecma-expression";
import { isTypeExpression } from "./is";

export function getPropertyName(node: TSESTree.Node): string | _ {
  if (isTypeExpression(node)) {
    return getPropertyName(getEcmaExpression(node));
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
  return _;
}
