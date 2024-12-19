import * as AST from "@eslint-react/ast";
import { isClassComponent, isComponentName } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-prop-types";

export type MessageID = CamelCase<typeof RULE_NAME>;

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'propTypes' property in components",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noPropTypes: "[Deprecated] Use TypeScript or another type-checking solution instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("propTypes")) return {};
    return {
      AssignmentExpression(node) {
        if (node.operator !== "=" || node.left.type !== AST_NODE_TYPES.MemberExpression) return;
        const { object, property } = node.left;
        if (object.type !== AST_NODE_TYPES.Identifier) return;
        if (property.type !== AST_NODE_TYPES.Identifier || property.name !== "propTypes") return;
        if (!isComponentName(object.name)) return;
        const isComponent = F.pipe(
          VAR.findVariable(object.name, context.sourceCode.getScope(node)),
          O.flatMap(VAR.getVariableNode(0)),
          O.exists(n => AST.isFunction(n) || isClassComponent(n)),
        );
        if (!isComponent) return;
        context.report({ messageId: "noPropTypes", node: property });
      },
      PropertyDefinition(node) {
        if (!isClassComponent(node.parent.parent)) return;
        if (!node.static || node.key.type !== AST_NODE_TYPES.Identifier || node.key.name !== "propTypes") return;
        context.report({ messageId: "noPropTypes", node });
      },
    };
  },
  defaultOptions: [],
});
