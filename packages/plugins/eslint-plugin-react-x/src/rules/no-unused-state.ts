import * as AST from "@eslint-react/ast";
import { isAssignmentToThisState, isClassComponent, isGetDerivedStateFromProps } from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import { constFalse, constTrue } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { P, isMatching, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-state";

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
      description: "Warns unused class component state.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnusedState: "Unused class component state in '{{className}}'",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Stacks to keep track of the current AST traversal context
  const classStack: AST.TSESTreeClass[] = [];
  const methodStack: AST.TSESTreeMethodOrProperty[] = [];
  const constructorStack: TSESTree.MethodDefinition[] = [];
  // WeakMap to store state definition information for each class
  const stateDefs = new WeakMap<AST.TSESTreeClass, { node: TSESTree.Node | unit; isUsed: boolean }>();

  function classEnter(node: AST.TSESTreeClass) {
    // Keep track of the current class being visited
    classStack.push(node);
  }

  function classExit() {
    // Pop the class when exiting its node
    const currentClass = classStack.pop();
    if (currentClass == null || !isClassComponent(currentClass)) {
      return;
    }
    const className = AST.getClassId(currentClass)?.name;
    // Get state definition and usage status for the current class
    const { node: defNode, isUsed = false } = stateDefs.get(currentClass) ?? {};
    // If state is not defined or is used, do nothing
    if (defNode == null || isUsed) {
      return;
    }
    // Report an error if state is defined but not used
    context.report({
      messageId: "noUnusedState",
      node: defNode,
      data: {
        className: className ?? "Component",
      },
    });
  }

  function methodEnter(node: AST.TSESTreeMethodOrProperty) {
    // Keep track of the current method being visited
    methodStack.push(node);
    const currentClass = classStack.at(-1);
    if (currentClass == null || !isClassComponent(currentClass)) {
      return;
    }
    if (node.static) {
      // `getDerivedStateFromProps` can update state, so we mark state as used
      if (isGetDerivedStateFromProps(node) && isMatching({ params: [P.nonNullable, ...P.array()] })(node.value)) {
        const defNode = stateDefs.get(currentClass)?.node;
        stateDefs.set(currentClass, { node: defNode, isUsed: true });
      }
      return;
    }
    // Detect state definition as a class property (`state = ...`)
    if (AST.getPropertyName(node.key) === "state") {
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

  return {
    AssignmentExpression(node) {
      // Detect state definition in constructor (`this.state = ...`)
      if (!isAssignmentToThisState(node)) {
        return;
      }
      const currentClass = classStack.at(-1);
      if (currentClass == null || !isClassComponent(currentClass)) {
        return;
      }
      // Ensure the assignment is within the constructor of the current class
      const currentConstructor = constructorStack.at(-1);
      if (currentConstructor == null || !currentClass.body.body.includes(currentConstructor)) {
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
      if (!AST.isThisExpression(node.object)) {
        return;
      }
      if (AST.getPropertyName(node.property) !== "state") {
        return;
      }
      const currentClass = classStack.at(-1);
      if (currentClass == null || !isClassComponent(currentClass)) {
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
      if (currentClass == null || !isClassComponent(currentClass)) {
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
      if (node.init == null || !AST.isThisExpression(node.init) || node.id.type !== T.ObjectPattern) {
        return;
      }
      const hasState = node.id.properties.some((prop) => {
        if (prop.type === T.Property && isKeyLiteral(prop, prop.key)) {
          return AST.getPropertyName(prop.key) === "state";
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
  };
}
