import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import { constFalse, constTrue } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { P, isMatching, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-state";

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
      description: "Warns about unused class component state.",
    },
    messages: {
      default: "Unused class component state in '{{className}}'",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Stacks to keep track of the current AST traversal context
  const classStack: ast.TSESTreeClass[] = [];
  const methodStack: ast.TSESTreeMethodOrProperty[] = [];
  const constructorStack: TSESTree.MethodDefinition[] = [];
  // WeakMap to store state definition information for each class
  const stateDefs = new WeakMap<
    ast.TSESTreeClass,
    { node: TSESTree.Node | unit; isUsed: boolean }
  >();

  function classEnter(node: ast.TSESTreeClass) {
    // Keep track of the current class being visited
    classStack.push(node);
  }

  function classExit() {
    // Pop the class when exiting its node
    const currentClass = classStack.pop();
    if (currentClass == null || !core.isClassComponent(currentClass)) {
      return;
    }
    const id = ast.getClassId(currentClass);
    // Get state definition and usage status for the current class
    const { node: defNode, isUsed = false } = stateDefs.get(currentClass) ?? {};
    // If state is not defined or is used, do nothing
    if (defNode == null || isUsed) {
      return;
    }
    // Report an error if state is defined but not used
    context.report({
      messageId: "default",
      node: defNode,
      data: {
        className: id != null ? context.sourceCode.getText(id) : "Component",
      },
    });
  }

  function methodEnter(node: ast.TSESTreeMethodOrProperty) {
    // Keep track of the current method being visited
    methodStack.push(node);
    const currentClass = classStack.at(-1);
    if (currentClass == null || !core.isClassComponent(currentClass)) {
      return;
    }
    if (node.static) {
      // `getDerivedStateFromProps` can update state, so we mark state as used
      if (
        core.isGetDerivedStateFromProps(node)
        && isMatching({ params: [P.nonNullable, ...P.array()] })(node.value)
      ) {
        const defNode = stateDefs.get(currentClass)?.node;
        stateDefs.set(currentClass, { node: defNode, isUsed: true });
      }
      return;
    }
    // Detect state definition as a class property (`state = ...`)
    if (ast.getPropertyName(node.key) === "state") {
      stateDefs.set(currentClass, { node: node.key, isUsed: false });
    }
  }

  function methodExit() {
    // Pop the method when exiting its node
    methodStack.pop();
  }

  function constructorEnter(node: TSESTree.MethodDefinition) {
    // Keep track of the current constructor being visited
    constructorStack.push(node);
  }

  function constructorExit() {
    // Pop the constructor when exiting its node
    constructorStack.pop();
  }

  return defineRuleListener(
    {
      AssignmentExpression(node) {
        // Detect state definition in constructor (`this.state = ...`)
        if (!core.isAssignmentToThisState(node)) {
          return;
        }
        const currentClass = classStack.at(-1);
        if (currentClass == null || !core.isClassComponent(currentClass)) {
          return;
        }
        // Ensure the assignment is within the constructor of the current class
        const currentConstructor = constructorStack.at(-1);
        if (
          currentConstructor == null
          || !currentClass.body.body.includes(currentConstructor)
        ) {
          return;
        }
        // Record the state definition node
        const isUsed = stateDefs.get(currentClass)?.isUsed ?? false;
        stateDefs.set(currentClass, { node: node.left, isUsed });
      },
      ClassDeclaration: classEnter,
      "ClassDeclaration:exit": classExit,
      ClassExpression: classEnter,
      "ClassExpression:exit": classExit,
      MemberExpression(node) {
        // Detect state usage (`this.state`)
        if (!ast.isThisExpressionLoose(node.object)) {
          return;
        }
        if (ast.getPropertyName(node.property) !== "state") {
          return;
        }
        const currentClass = classStack.at(-1);
        if (currentClass == null || !core.isClassComponent(currentClass)) {
          return;
        }
        // Ensure the usage is within a method of the current class
        const currentMethod = methodStack.at(-1);
        if (currentMethod == null || currentMethod.static) {
          return;
        }
        // Ignore usage in constructor, as it's a definition
        if (currentMethod === constructorStack.at(-1)) {
          return;
        }
        if (!currentClass.body.body.includes(currentMethod)) {
          return;
        }
        // Mark state as used
        const defNode = stateDefs.get(currentClass)?.node;
        stateDefs.set(currentClass, { node: defNode, isUsed: true });
      },
      MethodDefinition: methodEnter,
      "MethodDefinition:exit": methodExit,
      "MethodDefinition[key.name='constructor']": constructorEnter,
      "MethodDefinition[key.name='constructor']:exit": constructorExit,
      PropertyDefinition: methodEnter,
      "PropertyDefinition:exit": methodExit,
      VariableDeclarator(node) {
        const currentClass = classStack.at(-1);
        if (currentClass == null || !core.isClassComponent(currentClass)) {
          return;
        }
        const currentMethod = methodStack.at(-1);
        if (currentMethod == null || currentMethod.static) {
          return;
        }
        // Ignore usage in constructor
        if (currentMethod === constructorStack.at(-1)) {
          return;
        }
        if (!currentClass.body.body.includes(currentMethod)) {
          return;
        }
        // Detect state usage via destructuring (`const { state } = this`)
        if (
          node.init == null
          || !ast.isThisExpressionLoose(node.init)
          || node.id.type !== AST.ObjectPattern
        ) {
          return;
        }
        const hasState = node.id.properties.some((prop) => {
          if (prop.type === AST.Property && isKeyLiteral(prop, prop.key)) {
            return ast.getPropertyName(prop.key) === "state";
          }
          return false;
        });
        if (!hasState) {
          return;
        }
        // Mark state as used
        const defNode = stateDefs.get(currentClass)?.node;
        stateDefs.set(currentClass, { node: defNode, isUsed: true });
      },
    },
  );
}
