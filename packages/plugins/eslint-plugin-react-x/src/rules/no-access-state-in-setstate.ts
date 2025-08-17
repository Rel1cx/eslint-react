import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { constFalse, constTrue } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-access-state-in-setstate";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isKeyLiteral(
  node:
    | TSESTree.MemberExpression
    | TSESTree.MethodDefinition
    | TSESTree.Property
    | TSESTree.PropertyDefinition,
  key: TSESTree.Node,
) {
  return match(key)
    .with({ type: T.Literal }, constTrue)
    .with({ type: T.TemplateLiteral, expressions: [] }, constTrue)
    .with({ type: T.Identifier }, () => !node.computed)
    .otherwise(constFalse);
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow accessing `this.state` inside `setState` calls.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noAccessStateInSetstate: "Do not access 'this.state' within 'setState'. Use the update function instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("setState")) {
    return {};
  }
  const classEntries: [
    node: TSESTree.ClassDeclaration | TSESTree.ClassExpression,
    isComponent: boolean,
  ][] = [];
  const methodEntries: [
    node: AST.TSESTreeMethodOrProperty,
    isStatic: boolean,
  ][] = [];
  const setStateEntries: [
    node: TSESTree.CallExpression,
    hasThisState: boolean,
  ][] = [];
  return {
    CallExpression(node) {
      if (!ER.isThisSetState(node)) {
        return;
      }
      setStateEntries.push([node, false]);
    },
    "CallExpression:exit"(node) {
      if (!ER.isThisSetState(node)) {
        return;
      }
      setStateEntries.pop();
    },
    ClassDeclaration(node) {
      classEntries.push([node, ER.isClassComponent(node)]);
    },
    "ClassDeclaration:exit"() {
      classEntries.pop();
    },
    ClassExpression(node) {
      classEntries.push([node, ER.isClassComponent(node)]);
    },
    "ClassExpression:exit"() {
      classEntries.pop();
    },
    MemberExpression(node) {
      if (!AST.isThisExpression(node.object)) {
        return;
      }
      const [currClass, isComponent = false] = classEntries.at(-1) ?? [];
      if (currClass == null || !isComponent) {
        return;
      }
      const [currMethod, isStatic = false] = methodEntries.at(-1) ?? [];
      if (currMethod == null || isStatic) {
        return;
      }
      const [setState, hasThisState = false] = setStateEntries.at(-1) ?? [];
      if (setState == null || hasThisState) {
        return;
      }
      if (AST.getPropertyName(node.property) !== "state") {
        return;
      }
      context.report({ messageId: "noAccessStateInSetstate", node });
    },
    MethodDefinition(node) {
      methodEntries.push([node, node.static]);
    },
    "MethodDefinition:exit"() {
      methodEntries.pop();
    },
    PropertyDefinition(node) {
      methodEntries.push([node, node.static]);
    },
    "PropertyDefinition:exit"() {
      methodEntries.pop();
    },
    VariableDeclarator(node) {
      const [currClass, isComponent = false] = classEntries.at(-1) ?? [];
      if (currClass == null || !isComponent) {
        return;
      }
      const [currMethod, isStatic = false] = methodEntries.at(-1) ?? [];
      if (currMethod == null || isStatic) {
        return;
      }
      const [setState, hasThisState = false] = setStateEntries.at(-1) ?? [];
      if (setState == null || hasThisState) {
        return;
      }
      // detect `{ foo, state: baz } = this`
      if (node.init == null || !AST.isThisExpression(node.init) || node.id.type !== T.ObjectPattern) {
        return;
      }
      const hasState = node
        .id
        .properties
        .some((prop) =>
          prop.type === T.Property
          && isKeyLiteral(prop, prop.key)
          && AST.getPropertyName(prop.key) === "state"
        );
      if (!hasState) {
        return;
      }
      context.report({ messageId: "noAccessStateInSetstate", node });
    },
  };
}
