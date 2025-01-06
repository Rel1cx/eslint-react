import * as AST from "@eslint-react/ast";
import { isClassComponent, isThisSetState } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-will-update";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isComponentWillUpdate(node: TSESTree.Node) {
  return AST.isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "componentWillUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'setState' in 'componentWillUpdate'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noSetStateInComponentWillUpdate:
        "Do not call `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("componentWillUpdate")) return {};
    function getReportDescriptor(node: TSESTree.CallExpression): O.Option<ReportDescriptor<MessageID>> {
      if (!isThisSetState(node)) return O.none();
      return F.pipe(
        O.Do,
        O.bind("clazz", () => AST.traverseUpGuard(node, isClassComponent)),
        O.bind("method", ({ clazz }) => AST.traverseUpStop(node, clazz, isComponentWillUpdate)),
        O.bind("methodScope", ({ method }) => O.some(context.sourceCode.getScope(method))),
        O.bind("upperScope", () => O.fromNullable(context.sourceCode.getScope(node).upper)),
        O.filter(({
          clazz,
          method,
          methodScope,
          upperScope,
        }) =>
          method.parent === clazz.body
          && upperScope === methodScope
        ),
        O.map(() => ({
          messageId: "noSetStateInComponentWillUpdate",
          node,
        })),
      );
    }
    return {
      CallExpression: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
