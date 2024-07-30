import { F } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { NodeType } from "./types";

export function isKeyLiteralLike(
  node: TSESTree.MemberExpression | TSESTree.MethodDefinition | TSESTree.Property | TSESTree.PropertyDefinition,
  property: TSESTree.Node,
) {
  return match(property)
    .with({ type: NodeType.Literal }, F.constTrue)
    .with({ type: NodeType.TemplateLiteral, expressions: [] }, F.constTrue)
    .with({ type: NodeType.Identifier }, () => !node.computed)
    .otherwise(F.constFalse);
}
