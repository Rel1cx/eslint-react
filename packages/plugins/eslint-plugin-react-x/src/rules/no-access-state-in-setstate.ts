import * as AST from "@eslint-react/ast";
import { isClassComponent, isThisSetState } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-access-state-in-setstate";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): string | _ {
  if (AST.isTsOnlyExpression(node)) {
    return getName(node.expression);
  }
  if (node.type === T.Identifier || node.type === T.PrivateIdentifier) {
    return node.name;
  }
  if (node.type === T.Literal) {
    return String(node.value);
  }
  if (node.type === T.TemplateLiteral && node.expressions.length === 0) {
    return node.quasis[0]?.value.raw;
  }

  return _;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow accessing 'this.state' within 'setState'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noAccessStateInSetstate: "Do not access 'this.state' within 'setState'. Use the update function instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
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
        if (!isThisSetState(node)) {
          return;
        }
        setStateEntries.push([node, false]);
      },
      "CallExpression:exit"(node) {
        if (!isThisSetState(node)) {
          return;
        }
        setStateEntries.pop();
      },
      ClassDeclaration(node) {
        classEntries.push([node, isClassComponent(node)]);
      },
      "ClassDeclaration:exit"() {
        classEntries.pop();
      },
      ClassExpression(node) {
        classEntries.push([node, isClassComponent(node)]);
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
        if (getName(node.property) !== "state") {
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
            && AST.isKeyLiteralLike(prop, prop.key)
            && getName(prop.key) === "state"
          );
        if (!hasState) {
          return;
        }
        context.report({ messageId: "noAccessStateInSetstate", node });
      },
    };
  },
  defaultOptions: [],
});
