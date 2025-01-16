import { isInitializedFromReact } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "is-from-react";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all identifiers that are initialized from React.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      isFromReact: "[initialized from react] name: '{{name}}', import source: '{{importSource}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { importSource = "react" } = getSettingsFromContext(context);

    function isFromReact(
      node: TSESTree.Identifier | TSESTree.JSXIdentifier,
      initialScope: Scope,
    ) {
      const name = node.name;
      switch (true) {
        case node.parent.type === T.MemberExpression
          && node.parent.property === node
          && node.parent.object.type === T.Identifier:
          return isInitializedFromReact(node.parent.object.name, importSource, initialScope);
        case node.parent.type === T.JSXMemberExpression
          && node.parent.property === node
          && node.parent.object.type === T.JSXIdentifier:
          return isInitializedFromReact(node.parent.object.name, importSource, initialScope);
        default:
          return isInitializedFromReact(name, importSource, initialScope);
      }
    }
    function visitorFunction(node: TSESTree.Identifier | TSESTree.JSXIdentifier) {
      const shouldSkipDuplicate = node.parent.type === T.ImportSpecifier
        && node.parent.imported === node
        && node.parent.imported.name === node.parent.local.name;
      if (shouldSkipDuplicate) {
        return;
      }
      const name = node.name;
      const initialScope = context.sourceCode.getScope(node);
      if (!isFromReact(node, initialScope)) {
        return;
      }
      context.report({
        messageId: "isFromReact",
        node,
        data: {
          // eslint-disable-next-line eslint-plugin/no-unused-placeholders
          type: node.type,
          name,
          importSource,
        },
      });
    }
    return {
      Identifier: visitorFunction,
      JSXIdentifier: visitorFunction,
    };
  },
  defaultOptions: [],
});
