import { isThisExpression, NodeType } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { MutableList as MutList, Option as O } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-access-state-in-setstate";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isKeyLiteralLike(
  node: TSESTree.MemberExpression | TSESTree.MethodDefinition | TSESTree.Property | TSESTree.PropertyDefinition,
  property: TSESTree.Node,
): boolean {
  return property.type === NodeType.Literal
    || (property.type === NodeType.TemplateLiteral && property.expressions.length === 0)
    || (!node.computed && property.type === NodeType.Identifier);
}

function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;

  return (
    callee.type === NodeType.MemberExpression
    && isThisExpression(callee.object)
    && callee.property.type === NodeType.Identifier
    && callee.property.name === "setState"
  );
}

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): O.Option<string> {
  if (node.type === NodeType.TSAsExpression) {
    return getName(node.expression);
  }
  if (node.type === NodeType.Identifier || node.type === NodeType.PrivateIdentifier) {
    return O.some(node.name);
  }
  if (node.type === NodeType.Literal) {
    return O.some(String(node.value));
  }
  if (node.type === NodeType.TemplateLiteral && node.expressions.length === 0) {
    return O.fromNullable(node.quasis[0]?.value.raw);
  }

  return O.none();
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow accessing 'this.state' within 'setState'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_ACCESS_STATE_IN_SETSTATE: "Do not access 'this.state' within 'setState', use 'setState' callback instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const classStack = MutList.make<[
      node: TSESTree.ClassDeclaration | TSESTree.ClassExpression,
      isComponent: boolean,
    ]>();
    const methodStack = MutList.make<[
      node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition,
      isStatic: boolean,
    ]>();
    const setStateStack = MutList.make<[
      node: TSESTree.CallExpression,
      hasThisState: boolean,
    ]>();

    return {
      CallExpression(node) {
        if (!isThisSetState(node)) return;
        MutList.append(setStateStack, [node, false]);
      },
      "CallExpression:exit"(node) {
        if (!isThisSetState(node)) return;
        MutList.pop(setStateStack);
      },
      ClassDeclaration(node) {
        MutList.append(classStack, [node, isClassComponent(node, context)]);
      },
      "ClassDeclaration:exit"() {
        MutList.pop(classStack);
      },
      ClassExpression(node) {
        MutList.append(classStack, [node, isClassComponent(node, context)]);
      },
      "ClassExpression:exit"() {
        MutList.pop(classStack);
      },
      MemberExpression(node) {
        if (!isThisExpression(node.object)) return;
        const [currentClass, isComponent] = MutList.tail(classStack) ?? [];
        if (!currentClass || !isComponent) return;
        const [currentMethod, isStatic] = MutList.tail(methodStack) ?? [];
        if (!currentMethod || isStatic) return;
        const [setState, hasThisState] = MutList.tail(setStateStack) ?? [];
        if (!setState || hasThisState) return;
        if (!O.exists(getName(node.property), name => name === "state")) return;
        context.report({
          messageId: "NO_ACCESS_STATE_IN_SETSTATE",
          node,
        });
      },
      MethodDefinition(node) {
        MutList.append(methodStack, [node, node.static]);
      },
      "MethodDefinition:exit"() {
        MutList.pop(methodStack);
      },
      PropertyDefinition(node) {
        MutList.append(methodStack, [node, node.static]);
      },
      "PropertyDefinition:exit"() {
        MutList.pop(methodStack);
      },
      VariableDeclarator(node) {
        const [currentClass, isComponent] = MutList.tail(classStack) ?? [];
        if (!currentClass || !isComponent) return;
        const [currentMethod, isStatic] = MutList.tail(methodStack) ?? [];
        if (!currentMethod || isStatic) return;
        const [setState, hasThisState] = MutList.tail(setStateStack) ?? [];
        if (!setState || hasThisState) return;
        // detect `{ foo, state: baz } = this`
        if (!(node.init && isThisExpression(node.init) && node.id.type === NodeType.ObjectPattern)) return;
        const hasState = node.id.properties.some(prop => {
          if (prop.type === NodeType.Property && isKeyLiteralLike(prop, prop.key)) {
            return O.exists(getName(prop.key), name => name === "state");
          }

          return false;
        });
        if (!hasState) return;
        context.report({
          messageId: "NO_ACCESS_STATE_IN_SETSTATE",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
