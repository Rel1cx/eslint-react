import * as AST from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { constFalse, constTrue } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-class-component-members";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

type Property =
  | AST.TSESTreeMethodOrProperty["key"]
  | TSESTree.MemberExpression["property"];

// A set of React lifecycle methods that are implicitly used and should not be flagged as unused
const LIFECYCLE_METHODS = new Set([
  "componentDidCatch",
  "componentDidMount",
  "componentDidUpdate",
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUnmount",
  "componentWillUpdate",
  "constructor",
  "getSnapshotBeforeUpdate",
  "render",
  "shouldComponentUpdate",
  "state",
  "UNSAFE_componentWillMount",
  "UNSAFE_componentWillReceiveProps",
  "UNSAFE_componentWillUpdate",
]);

// Checks if a property key is a literal or a non-computed identifier
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
      description: "Warns about unused class component methods and properties.",
    },
    messages: {
      noUnusedClassComponentMembers: "Unused method or property '{{methodName}}'' of class '{{className}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // A stack to keep track of class nodes, to handle nested classes
  const classStack: AST.TSESTreeClass[] = [];
  // A stack to keep track of method/property nodes
  const methodStack: AST.TSESTreeMethodOrProperty[] = [];
  // Stores all defined properties and methods for each class component
  const propertyDefs = new WeakMap<AST.TSESTreeClass, Set<Property>>();
  // Stores all used properties and methods for each class component
  const propertyUsages = new WeakMap<AST.TSESTreeClass, Set<string>>();

  // Called when the AST traversal enters a class declaration or expression
  function classEnter(node: AST.TSESTreeClass) {
    classStack.push(node);
    if (!isClassComponent(node)) {
      return;
    }
    // Initialize sets for definitions and usages for the current class component
    propertyDefs.set(node, new Set());
    propertyUsages.set(node, new Set());
  }

  // Called when the AST traversal exits a class declaration or expression
  function classExit() {
    const currentClass = classStack.pop();
    if (currentClass == null || !isClassComponent(currentClass)) {
      return;
    }
    const id = AST.getClassId(currentClass);
    const defs = propertyDefs.get(currentClass);
    const usages = propertyUsages.get(currentClass);
    if (defs == null) {
      return;
    }
    // Compare definitions and usages to find unused members
    for (const def of defs) {
      const methodName = AST.getPropertyName(def);
      if (methodName == null) {
        continue;
      }
      // If a member is used or is a lifecycle method, skip it
      if (((usages?.has(methodName)) ?? false) || LIFECYCLE_METHODS.has(methodName)) {
        continue;
      }
      // Report members that are defined but not used
      context.report({
        messageId: "noUnusedClassComponentMembers",
        node: def,
        data: {
          className: id != null ? context.sourceCode.getText(id) : "Component",
          methodName,
        },
      });
    }
  }

  // Called when the AST traversal enters a method or property definition
  function methodEnter(node: AST.TSESTreeMethodOrProperty) {
    methodStack.push(node);
    const currentClass = classStack.at(-1);
    if (currentClass == null || !isClassComponent(currentClass)) {
      return;
    }
    // Ignore static members
    if (node.static) {
      return;
    }
    // Add the member to the definitions set for the current class
    if (isKeyLiteral(node, node.key)) {
      propertyDefs.get(currentClass)?.add(node.key);
    }
  }

  // Called when the AST traversal exits a method or property definition
  function methodExit() {
    methodStack.pop();
  }

  return {
    ClassDeclaration: classEnter,
    "ClassDeclaration:exit": classExit,
    ClassExpression: classEnter,
    "ClassExpression:exit": classExit,
    // Visitor for MemberExpression to track property usages and definitions
    MemberExpression(node) {
      const currentClass = classStack.at(-1);
      const currentMethod = methodStack.at(-1);
      if (currentClass == null || currentMethod == null) {
        return;
      }
      if (!isClassComponent(currentClass) || currentMethod.static) {
        return;
      }
      // Check for expressions like `this.property`
      if (!AST.isThisExpressionLoose(node.object) || !isKeyLiteral(node, node.property)) {
        return;
      }
      // Detect assignments like `this.property = xxx` as definitions
      if (node.parent.type === T.AssignmentExpression && node.parent.left === node) {
        propertyDefs.get(currentClass)?.add(node.property);
        return;
      }
      // Detect usages like `this.property()` or `x = this.property`
      const propertyName = AST.getPropertyName(node.property);
      if (propertyName != null) {
        propertyUsages.get(currentClass)?.add(propertyName);
      }
    },
    MethodDefinition: methodEnter,
    "MethodDefinition:exit": methodExit,
    PropertyDefinition: methodEnter,
    "PropertyDefinition:exit": methodExit,
    // Visitor for VariableDeclarator to track property usages via destructuring
    VariableDeclarator(node) {
      const currentClass = classStack.at(-1);
      const currentMethod = methodStack.at(-1);
      if (currentClass == null || currentMethod == null) {
        return;
      }
      if (!isClassComponent(currentClass) || currentMethod.static) {
        return;
      }
      // Detect destructuring from `this`, e.g., `const { foo, bar } = this;`
      if (node.init != null && AST.isThisExpressionLoose(node.init) && node.id.type === T.ObjectPattern) {
        for (const prop of node.id.properties) {
          if (prop.type === T.Property && isKeyLiteral(prop, prop.key)) {
            const keyName = AST.getPropertyName(prop.key);
            if (keyName != null) {
              // Add destructured properties to the usages set
              propertyUsages.get(currentClass)?.add(keyName);
            }
          }
        }
      }
    },
  };
}
