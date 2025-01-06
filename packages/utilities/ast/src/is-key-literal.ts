import { F } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { match } from "ts-pattern";

export function isKeyLiteralLike(
  node: TSESTree.MemberExpression | TSESTree.MethodDefinition | TSESTree.Property | TSESTree.PropertyDefinition,
  property: TSESTree.Node,
) {
  return match(property)
    .with({ type: T.Literal }, F.constTrue)
    .with({ type: T.TemplateLiteral, expressions: [] }, F.constTrue)
    .with({ type: T.Identifier }, () => !node.computed)
    .otherwise(F.constFalse);
}
