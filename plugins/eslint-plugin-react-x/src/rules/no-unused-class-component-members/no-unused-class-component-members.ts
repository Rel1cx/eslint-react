import { createRule } from "@/utils/create-rule";
import { Extract, type TSESTreeClass, type TSESTreeMethodOrPropertyDefinition } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { LIFECYCLE_METHODS, type Property, isKeyLiteral } from "./lib";

export const RULE_NAME = "no-unused-class-component-members";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Warns about unused class component methods and properties.",
    },
    messages: {
      default: "Unused method or property '{{methodName}}'' of class '{{className}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // A stack to keep track of class nodes, to handle nested classes
  const classStack: TSESTreeClass[] = [];
  // A stack to keep track of method/property nodes
  const methodStack: TSESTreeMethodOrPropertyDefinition[] = [];
  // Stores all defined properties and methods for each class component
  const propertyDefs = new WeakMap<TSESTreeClass, Set<Property>>();
  // Stores all used properties and methods for each class component
  const propertyUsages = new WeakMap<TSESTreeClass, Set<string>>();

  // Called when the AST traversal enters a class declaration or expression
  function classEnter(node: TSESTreeClass) {
    classStack.push(node);
    if (!core.isClassComponent(node)) {
      return;
    }
    // Initialize sets for definitions and usages for the current class component
    propertyDefs.set(node, new Set());
    propertyUsages.set(node, new Set());
  }

  // Called when the AST traversal exits a class declaration or expression
  function classExit() {
    const currentClass = classStack.pop();
    if (currentClass == null || !core.isClassComponent(currentClass)) {
      return;
    }
    const id = core.getClassId(currentClass);
    const defs = propertyDefs.get(currentClass);
    const usages = propertyUsages.get(currentClass);
    if (defs == null) {
      return;
    }
    // Compare definitions and usages to find unused members
    for (const def of defs) {
      const methodName = Extract.getPropertyName(def);
      if (methodName == null) {
        continue;
      }
      // If a member is used, skip it
      if (usages?.has(methodName) ?? false) {
        continue;
      }
      // If a member is a lifecycle method, skip it
      // except for shouldComponentUpdate in PureComponent, which is implicitly unused
      if (LIFECYCLE_METHODS.has(methodName)) {
        if (methodName === "shouldComponentUpdate" && core.isPureComponent(currentClass)) {
          // shouldComponentUpdate is unused in PureComponent
        } else {
          continue;
        }
      }
      // Report members that are defined but not used
      context.report({
        data: {
          className: id != null ? context.sourceCode.getText(id) : "Component",
          methodName,
        },
        messageId: "default",
        node: def,
      });
    }
  }

  // Called when the AST traversal enters a method or property definition
  function methodEnter(node: TSESTreeMethodOrPropertyDefinition) {
    methodStack.push(node);
    const currentClass = classStack.at(-1);
    if (currentClass == null || !core.isClassComponent(currentClass)) {
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

  return merge(
    {
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
        if (!core.isClassComponent(currentClass) || currentMethod.static) {
          return;
        }
        // Check for expressions like `this.property`
        if (node.object.type !== AST.ThisExpression || !isKeyLiteral(node, node.property)) {
          return;
        }
        // Detect assignments like `this.property = xxx` as definitions
        if (node.parent.type === AST.AssignmentExpression && node.parent.left === node) {
          propertyDefs.get(currentClass)?.add(node.property);
          return;
        }
        // Detect usages like `this.property()` or `x = this.property`
        const propertyName = Extract.getPropertyName(node.property);
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
        if (!core.isClassComponent(currentClass) || currentMethod.static) {
          return;
        }
        // Detect destructuring from `this`, e.g., `const { foo, bar } = this;`
        if (node.init != null && node.init.type === AST.ThisExpression && node.id.type === AST.ObjectPattern) {
          for (const prop of node.id.properties) {
            if (prop.type === AST.Property && isKeyLiteral(prop, prop.key)) {
              const keyName = Extract.getPropertyName(prop.key);
              if (keyName != null) {
                // Add destructured properties to the usages set
                propertyUsages.get(currentClass)?.add(keyName);
              }
            }
          }
        }
      },
    },
  );
}
