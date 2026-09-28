import { createRule } from "@/utils/create-rule";
import { Check, type TSESTreeClass, type TSESTreeMethodOrPropertyDefinition, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { LIFECYCLE_METHODS } from "./lib";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Stores all defined properties and methods for each class component
  const propertyDefs = new WeakMap<TSESTreeClass, Set<TSESTree.Identifier>>();
  // Stores all used properties and methods for each class component
  const propertyUsages = new WeakMap<TSESTreeClass, Set<string>>();

  // Called when the AST traversal exits a class declaration or expression
  function classExit(node: TSESTreeClass) {
    if (!core.isClassComponent(node)) {
      return;
    }
    const id = core.getClassId(node);
    const defs = propertyDefs.get(node);
    if (defs == null) {
      return;
    }
    const usages = propertyUsages.get(node);
    // Compare definitions and usages to find unused members
    for (const def of defs) {
      const methodName = def.name;
      // If a member is used, skip it
      if (usages?.has(methodName) ?? false) {
        continue;
      }
      // If a member is a lifecycle method, skip it
      // except for shouldComponentUpdate in PureComponent, which is implicitly unused
      if (LIFECYCLE_METHODS.has(methodName)) {
        if (methodName === "shouldComponentUpdate" && core.isPureComponent(node)) {
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
    const currentClass = Traverse.findParent(node, Check.isClass);
    if (currentClass == null || !core.isClassComponent(currentClass)) {
      return;
    }
    // Ignore static members
    if (node.static) {
      return;
    }
    // Add the member to the definitions set for the current class
    if (!node.computed && node.key.type === AST.Identifier) {
      getOrInsertComputed(propertyDefs, currentClass, () => new Set<TSESTree.Identifier>()).add(node.key);
    }
  }

  return {
    "ClassDeclaration:exit": classExit,
    "ClassExpression:exit": classExit,
    // Visitor for MemberExpression to track property usages and definitions
    MemberExpression(node) {
      const currentClass = Traverse.findParent(node, Check.isClass);
      const currentMethod = Traverse.findParent(node, Check.isPropertyOrMethod);
      if (currentClass == null || currentMethod == null) {
        return;
      }
      if (!core.isClassComponent(currentClass) || currentMethod.static) {
        return;
      }
      // Check for expressions like `this.property`
      if (node.object.type !== AST.ThisExpression || node.computed || node.property.type !== AST.Identifier) {
        return;
      }
      // Detect assignments like `this.property = xxx` as definitions
      if (node.parent.type === AST.AssignmentExpression && node.parent.left === node) {
        getOrInsertComputed(propertyDefs, currentClass, () => new Set<TSESTree.Identifier>()).add(node.property);
        return;
      }
      // Detect usages like `this.property()` or `x = this.property`
      getOrInsertComputed(propertyUsages, currentClass, () => new Set<string>()).add(node.property.name);
    },
    MethodDefinition: methodEnter,
    PropertyDefinition: methodEnter,
    // Visitor for VariableDeclarator to track property usages via destructuring
    VariableDeclarator(node) {
      const currentClass = Traverse.findParent(node, Check.isClass);
      const currentMethod = Traverse.findParent(node, Check.isPropertyOrMethod);
      if (currentClass == null || currentMethod == null) {
        return;
      }
      if (!core.isClassComponent(currentClass) || currentMethod.static) {
        return;
      }
      // Detect destructuring from `this`, e.g., `const { foo, bar } = this;`
      if (node.init != null && node.init.type === AST.ThisExpression && node.id.type === AST.ObjectPattern) {
        for (const prop of node.id.properties) {
          if (prop.type === AST.Property && !prop.computed && prop.key.type === AST.Identifier) {
            // Add destructured properties to the usages set
            getOrInsertComputed(propertyUsages, currentClass, () => new Set<string>()).add(prop.key.name);
          }
        }
      }
    },
  };
}
