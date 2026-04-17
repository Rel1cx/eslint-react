import { isUseRefCall } from "@eslint-react/core";
import { type RuleContext } from "@eslint-react/eslint";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

export function getRefInitNode(
  context: RuleContext,
  node: TSESTree.Identifier | TSESTree.JSXIdentifier,
  initialScope: Scope,
) {
  const name = node.name;
  switch (true) {
    case node.parent.type === AST.MemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.Identifier:
      return getRefInit(context, node.parent.object.name, initialScope);
    case node.parent.type === AST.JSXMemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.JSXIdentifier:
      return getRefInit(context, node.parent.object.name, initialScope);
    default:
      return getRefInit(context, name, initialScope);
  }
}

/**
 * Get the init expression of a ref variable
 * @param context The rule context
 * @param name The variable name
 * @param initialScope The initial scope
 * @returns The init expression node if the variable is derived from a ref, or null otherwise
 */
export function getRefInit(
  context: RuleContext,
  name: string,
  initialScope: Scope,
): TSESTree.Expression | null {
  for (const { node } of findVariable(initialScope, name)?.defs ?? []) {
    if (node.type !== AST.VariableDeclarator) continue;
    const init = node.init;
    if (init == null) continue;
    switch (true) {
      // const identifier = anotherRef.current;
      case init.type === AST.MemberExpression
        && init.object.type === AST.Identifier
        && (init.object.name === "ref" || init.object.name.endsWith("Ref")):
        return init;
      // const identifier = useRef();
      case init.type === AST.CallExpression
        && isUseRefCall(context, init):
        return init;
    }
  }
  return null;
}
