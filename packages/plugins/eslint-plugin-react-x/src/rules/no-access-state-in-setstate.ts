import { isKeyLiteralLike, isThisExpression } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-access-state-in-setstate";

export type MessageID = CamelCase<typeof RULE_NAME>;

function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;

  return (
    callee.type === AST_NODE_TYPES.MemberExpression
    && isThisExpression(callee.object)
    && callee.property.type === AST_NODE_TYPES.Identifier
    && callee.property.name === "setState"
  );
}

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): O.Option<string> {
  if (node.type === AST_NODE_TYPES.TSAsExpression) {
    return getName(node.expression);
  }
  if (node.type === AST_NODE_TYPES.Identifier || node.type === AST_NODE_TYPES.PrivateIdentifier) {
    return O.some(node.name);
  }
  if (node.type === AST_NODE_TYPES.Literal) {
    return O.some(String(node.value));
  }
  if (node.type === AST_NODE_TYPES.TemplateLiteral && node.expressions.length === 0) {
    return O.fromNullable(node.quasis[0]?.value.raw);
  }

  return O.none();
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow accessing 'this.state' within 'setState'",
    },
    messages: {
      noAccessStateInSetstate: "Do not access 'this.state' within 'setState'. Use the update function instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("setState")) return {};
    const classStack: [
      node: TSESTree.ClassDeclaration | TSESTree.ClassExpression,
      isComponent: boolean,
    ][] = [];
    const methodStack: [
      node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition,
      isStatic: boolean,
    ][] = [];
    const setStateStack: [
      node: TSESTree.CallExpression,
      hasThisState: boolean,
    ][] = [];
    return {
      CallExpression(node) {
        if (!isThisSetState(node)) return;
        setStateStack.push([node, false]);
      },
      "CallExpression:exit"(node) {
        if (!isThisSetState(node)) return;
        setStateStack.pop();
      },
      ClassDeclaration(node) {
        classStack.push([node, isClassComponent(node)]);
      },
      "ClassDeclaration:exit"() {
        classStack.pop();
      },
      ClassExpression(node) {
        classStack.push([node, isClassComponent(node)]);
      },
      "ClassExpression:exit"() {
        classStack.pop();
      },
      MemberExpression(node) {
        if (!isThisExpression(node.object)) return;
        const [currClass, isComponent] = classStack.at(-1) ?? [];
        if (!currClass || !isComponent) return;
        const [currMethod, isStatic] = methodStack.at(-1) ?? [];
        if (!currMethod || isStatic) return;
        const [setState, hasThisState] = setStateStack.at(-1) ?? [];
        if (!setState || hasThisState) return;
        if (!O.exists(getName(node.property), name => name === "state")) return;
        context.report({ messageId: "noAccessStateInSetstate", node });
      },
      MethodDefinition(node) {
        methodStack.push([node, node.static]);
      },
      "MethodDefinition:exit"() {
        methodStack.pop();
      },
      PropertyDefinition(node) {
        methodStack.push([node, node.static]);
      },
      "PropertyDefinition:exit"() {
        methodStack.pop();
      },
      VariableDeclarator(node) {
        const [currClass, isComponent] = classStack.at(-1) ?? [];
        if (!currClass || !isComponent) return;
        const [currMethod, isStatic] = methodStack.at(-1) ?? [];
        if (!currMethod || isStatic) return;
        const [setState, hasThisState] = setStateStack.at(-1) ?? [];
        if (!setState || hasThisState) return;
        // detect `{ foo, state: baz } = this`
        if (!(node.init && isThisExpression(node.init) && node.id.type === AST_NODE_TYPES.ObjectPattern)) return;
        const hasState = node.id.properties.some(prop => {
          if (prop.type === AST_NODE_TYPES.Property && isKeyLiteralLike(prop, prop.key)) {
            return O.exists(getName(prop.key), name => name === "state");
          }
          return false;
        });
        if (!hasState) return;
        context.report({ messageId: "noAccessStateInSetstate", node });
      },
    };
  },
  defaultOptions: [],
});
