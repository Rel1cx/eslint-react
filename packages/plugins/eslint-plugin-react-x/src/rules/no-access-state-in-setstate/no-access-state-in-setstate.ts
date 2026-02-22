import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { constFalse, constTrue } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { createRule } from "../../utils";

export const RULE_NAME = "no-access-state-in-setstate";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

function isKeyLiteral(
  node:
    | TSESTree.MemberExpression
    | TSESTree.MethodDefinition
    | TSESTree.Property
    | TSESTree.PropertyDefinition,
  key: TSESTree.Node,
) {
  return match(key)
    .with({ type: AST.Literal }, constTrue)
    .with({ type: AST.TemplateLiteral, expressions: [] }, constTrue)
    .with({ type: AST.Identifier }, () => !node.computed)
    .otherwise(constFalse);
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows accessing 'this.state' inside 'setState' calls.",
    },
    messages: {
      default: "Do not access 'this.state' within 'setState'. Use the update function instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `setState` is not present in the file
  if (!context.sourceCode.text.includes("setState")) {
    return {};
  }
  // Stack to track class declarations and whether they are React components
  const classStack: [node: TSESTree.ClassDeclaration | TSESTree.ClassExpression, isComponent: boolean][] = [];
  // Stack to track method definitions and whether they are static
  const methodStack: [node: ast.TSESTreeMethodOrProperty, isStatic: boolean][] = [];
  // Stack to track `setState` call expressions
  const setStateStack: [node: TSESTree.CallExpression, hasThisState: boolean][] = [];

  return defineRuleListener(
    {
      // Push `setState` calls to the stack upon entry
      CallExpression(node) {
        if (!core.isThisSetState(node)) {
          return;
        }
        setStateStack.push([node, false]);
      },
      // Pop `setState` calls from the stack upon exit
      "CallExpression:exit"(node) {
        if (!core.isThisSetState(node)) {
          return;
        }
        setStateStack.pop();
      },
      // Push class declarations to the stack upon entry
      ClassDeclaration(node) {
        classStack.push([node, core.isClassComponent(node)]);
      },
      // Pop class declarations from the stack upon exit
      "ClassDeclaration:exit"() {
        classStack.pop();
      },
      // Push class expressions to the stack upon entry
      ClassExpression(node) {
        classStack.push([node, core.isClassComponent(node)]);
      },
      // Pop class expressions from the stack upon exit
      "ClassExpression:exit"() {
        classStack.pop();
      },
      // Main logic for detecting `this.state` access
      MemberExpression(node) {
        // Check for `this` expressions
        if (!ast.isThisExpressionLoose(node.object)) {
          return;
        }
        // Ensure we are inside a React class component
        const [currClass, isComponent = false] = classStack.at(-1) ?? [];
        if (currClass == null || !isComponent) {
          return;
        }
        // Ensure we are inside a non-static method
        const [currMethod, isStatic = false] = methodStack.at(-1) ?? [];
        if (currMethod == null || isStatic) {
          return;
        }
        // Ensure we are inside a `setState` call
        const [setState, hasThisState = false] = setStateStack.at(-1) ?? [];
        if (setState == null || hasThisState) {
          return;
        }
        // Check if the property being accessed is `state`
        if (ast.getPropertyName(node.property) !== "state") {
          return;
        }
        // Report an issue if `this.state` is accessed
        context.report({ messageId: "default", node });
      },
      // Push method definitions to the stack upon entry
      MethodDefinition(node) {
        methodStack.push([node, node.static]);
      },
      // Pop method definitions from the stack upon exit
      "MethodDefinition:exit"() {
        methodStack.pop();
      },
      // Push property definitions to the stack upon entry
      PropertyDefinition(node) {
        methodStack.push([node, node.static]);
      },
      // Pop property definitions from the stack upon exit
      "PropertyDefinition:exit"() {
        methodStack.pop();
      },
      // Logic for detecting destructuring of `this.state`
      VariableDeclarator(node) {
        // Get current class and method context
        const [currClass, isComponent = false] = classStack.at(-1) ?? [];
        if (currClass == null || !isComponent) {
          return;
        }
        const [currMethod, isStatic = false] = methodStack.at(-1) ?? [];
        if (currMethod == null || isStatic) {
          return;
        }
        // Ensure we are inside a `setState` call
        const [setState, hasThisState = false] = setStateStack.at(-1) ?? [];
        if (setState == null || hasThisState) {
          return;
        }
        // Check for destructuring from `this`
        if (node.init == null || !ast.isThisExpressionLoose(node.init) || node.id.type !== AST.ObjectPattern) {
          return;
        }
        // Check if `state` is one of the destructured properties
        const hasState = node
          .id
          .properties
          .some((prop) =>
            prop.type === AST.Property
            && isKeyLiteral(prop, prop.key)
            && ast.getPropertyName(prop.key) === "state"
          );
        if (!hasState) {
          return;
        }
        // Report an issue if `state` is destructured from `this`
        context.report({ messageId: "default", node });
      },
    },
  );
}
