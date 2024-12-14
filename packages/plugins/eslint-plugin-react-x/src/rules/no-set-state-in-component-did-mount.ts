import * as AST from "@eslint-react/ast";
import { isClassComponent, isThisSetState } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-set-state-in-component-did-mount";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isComponentDidMount(node: TSESTree.Node) {
  return AST.isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "componentDidMount";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'setState' in 'componentDidMount'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noSetStateInComponentDidMount:
        "Do not call `this.setState` in `componentDidMount` outside of functions, such as callbacks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("componentDidMount")) return {};
    function getReportDescriptor(node: TSESTree.CallExpression): O.Option<ReportDescriptor<MessageID>> {
      if (!isThisSetState(node)) return O.none();
      const maybeParentClass = AST.traverseUp(
        node,
        AST.isOneOf([AST_NODE_TYPES.ClassDeclaration, AST_NODE_TYPES.ClassExpression]),
      );
      if (O.isNone(maybeParentClass)) return O.none();
      const parentClass = maybeParentClass.value;
      if (!isClassComponent(parentClass)) return O.none();
      const maybeParentMethod = AST.traverseUp(node, isComponentDidMount);
      if (O.isNone(maybeParentMethod)) return O.none();
      const parentMethod = maybeParentMethod.value;
      if (parentMethod.parent !== parentClass.body) return O.none();
      if (context.sourceCode.getScope(node).upper !== context.sourceCode.getScope(parentMethod)) return O.none();
      return O.some({
        messageId: "noSetStateInComponentDidMount",
        node,
      });
    }
    return {
      CallExpression: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
