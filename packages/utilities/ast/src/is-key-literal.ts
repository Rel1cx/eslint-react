import { F } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { match } from "ts-pattern";

export function isKeyLiteralLike(
  node: TSESTree.MemberExpression | TSESTree.MethodDefinition | TSESTree.Property | TSESTree.PropertyDefinition,
  property: TSESTree.Node,
) {
  return match(property)
    .with({ type: AST_NODE_TYPES.Literal }, F.constTrue)
    .with({ type: AST_NODE_TYPES.TemplateLiteral, expressions: [] }, F.constTrue)
    .with({ type: AST_NODE_TYPES.Identifier }, () => !node.computed)
    .otherwise(F.constFalse);
}
