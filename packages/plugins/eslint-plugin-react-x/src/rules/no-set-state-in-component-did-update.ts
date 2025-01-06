import * as AST from "@eslint-react/ast";
import { isClassComponent, isThisSetState } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-did-update";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isComponentDidUpdate(node: TSESTree.Node) {
  return AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentDidUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'setState' in 'componentDidUpdate'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noSetStateInComponentDidUpdate:
        "Do not call `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("componentDidUpdate")) return {};
    function getReportDescriptor(node: TSESTree.CallExpression): O.Option<ReportDescriptor<MessageID>> {
      if (!isThisSetState(node)) return O.none();
      return F.pipe(
        O.Do,
        O.bind("clazz", () => AST.findParentNodeGuard(node, isClassComponent)),
        O.bind("method", ({ clazz }) => AST.findParentNodeStop(node, clazz, isComponentDidUpdate)),
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
          messageId: "noSetStateInComponentDidUpdate",
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
