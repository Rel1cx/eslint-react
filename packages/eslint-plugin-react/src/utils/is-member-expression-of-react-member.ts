import { NodeType } from "@eslint-react/ast";
import { getPragmaFromContext, isInitializedFromPragma } from "@eslint-react/jsx";
import type * as ER from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

export function isMemberExpressionOfPragmaMember(
  pragmaMemberName: string,
  memberName: string,
) {
  return (node: TSESTree.MemberExpression, context: ER.RuleContext, pragma = getPragmaFromContext(context)) => {
    if (
      node.property.type !== NodeType.Identifier
      || node.property.name !== memberName
    ) {
      return false;
    }

    if (
      node.object.type === NodeType.Identifier
      && node.object.name === pragmaMemberName
    ) {
      const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

      return isInitializedFromPragma(node.object.name, context, initialScope, pragma);
    }

    if (
      node.object.type === NodeType.MemberExpression
      && node.object.object.type === NodeType.Identifier
      && node.object.object.name === pragma
      && node.object.property.type === NodeType.Identifier
    ) {
      return node.object.property.name === pragmaMemberName;
    }

    return false;
  };
}
