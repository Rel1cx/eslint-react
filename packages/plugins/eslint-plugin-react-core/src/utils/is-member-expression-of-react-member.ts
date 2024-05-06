import { NodeType } from "@eslint-react/ast";
import { isInitializedFromReact } from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

export function isMemberExpressionOfPragmaMember(
  pragmaMemberName: string,
  memberName: string,
) {
  return (node: TSESTree.MemberExpression, context: RuleContext) => {
    if (node.property.type !== NodeType.Identifier || node.property.name !== memberName) return false;
    if (node.object.type === NodeType.Identifier && node.object.name === pragmaMemberName) {
      const initialScope = context.sourceCode.getScope(node);

      return isInitializedFromReact(node.object.name, context, initialScope);
    }
    const initialScope = context.sourceCode.getScope(node);
    if (
      node.object.type === NodeType.MemberExpression
      && node.object.object.type === NodeType.Identifier
      && isInitializedFromReact(node.object.object.name, context, initialScope)
      && node.object.property.type === NodeType.Identifier
    ) {
      return node.object.property.name === pragmaMemberName;
    }

    return false;
  };
}
