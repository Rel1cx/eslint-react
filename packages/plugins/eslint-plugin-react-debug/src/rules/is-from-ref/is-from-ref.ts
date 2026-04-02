import { isUseRefCall } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/utils";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

import { createRule, stringify } from "../../utils";

export const RULE_NAME = "is-from-ref";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all identifiers initialized or derived from refs in JSON format.",
    },
    messages: {
      default: "{{json}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  function visitorFunction(node: TSESTree.Identifier | TSESTree.JSXIdentifier) {
    const initialScope = context.sourceCode.getScope(node);
    const refInit = getRefInitNode(node, initialScope);
    if (refInit != null) {
      const json = stringify({
        name: node.name,
        init: context.sourceCode.getText(refInit),
      });
      context.report({
        data: { json },
        messageId: "default",
        node,
      });
    }
  }
  return defineRuleListener(
    { Identifier: visitorFunction, JSXIdentifier: visitorFunction },
  );
}

function getRefInitNode(node: TSESTree.Identifier | TSESTree.JSXIdentifier, initialScope: Scope) {
  const name = node.name;
  switch (true) {
    case node.parent.type === AST.MemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.Identifier:
      return getRefInit(node.parent.object.name, initialScope);
    case node.parent.type === AST.JSXMemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.JSXIdentifier:
      return getRefInit(node.parent.object.name, initialScope);
    default:
      return getRefInit(name, initialScope);
  }
}

/**
 * Get the init expression of a ref variable
 * @param name The variable name
 * @param initialScope The initial scope
 * @returns The init expression node if the variable is derived from a ref, or null otherwise
 */
function getRefInit(name: string, initialScope: Scope): TSESTree.Expression | null {
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
        && isUseRefCall(init):
        return init;
    }
  }
  return null;
}
