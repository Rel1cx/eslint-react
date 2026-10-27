import { createRule } from "@/utils/create-rule";
import { Check, type TSESTreeClass, type TSESTreeMethodOrPropertyDefinition, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, getText } from "@eslint-react/eslint";
import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { KNOWN_HOST_CONVENTION_METHODS, LIFECYCLE_METHODS, isExportedClass, isPublicMethod } from "./lib";

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
      default: "Unused method or property '{{methodName}}' of class '{{className}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `class` is not present in the file
  if (!context.sourceCode.text.includes("class")) return {};
  const propertyDefs = new WeakMap<TSESTreeClass, Set<TSESTree.Identifier>>();
  const propertyUsages = new WeakMap<TSESTreeClass, Set<string>>();

  /**
   * Reports class component members that are defined but never referenced.
   * @param node The class declaration or expression being exited.
   */
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
    const exported = isExportedClass(node);
    for (const def of defs) {
      const methodName = def.name;
      if (usages?.has(methodName) ?? false) {
        continue;
      }
      // Skip lifecycle methods, except shouldComponentUpdate in PureComponent,
      // which is implicitly unused
      const isPureComponentShouldUpdate = methodName === "shouldComponentUpdate" && core.isPureComponent(node);
      if (LIFECYCLE_METHODS.has(methodName) && !isPureComponentShouldUpdate) {
        continue;
      }
      // If a member is invoked by the host environment through refs (ex: `setNativeProps` in React Native), skip it
      if (KNOWN_HOST_CONVENTION_METHODS.has(methodName)) {
        continue;
      }
      // If a member is a public method of an exported class component, skip it
      // as it may be invoked by consumers through refs (ex: `drawerRef.current.openDrawer()`)
      if (exported && isPublicMethod(def)) {
        continue;
      }
      context.report({
        data: {
          className: id != null ? getText(context, id) : "Component",
          methodName,
        },
        messageId: "default",
        node: def,
      });
    }
  }

  /**
   * Records a method or property definition on its enclosing class component.
   * @param node The method or property definition being entered.
   */
  function methodEnter(node: TSESTreeMethodOrPropertyDefinition) {
    const currentClass = Traverse.findParent(node, Check.isClass);
    if (currentClass == null || !core.isClassComponent(currentClass)) {
      return;
    }
    if (node.static) {
      return;
    }
    if (!node.computed && node.key.type === AST.Identifier) {
      getOrInsertComputed(propertyDefs, currentClass, () => new Set<TSESTree.Identifier>()).add(node.key);
    }
  }

  return {
    "ClassDeclaration:exit": classExit,
    "ClassExpression:exit": classExit,
    MemberExpression(node) {
      const currentClass = Traverse.findParent(node, Check.isClass);
      const currentMethod = Traverse.findParent(node, Check.isPropertyOrMethod);
      if (currentClass == null || currentMethod == null) {
        return;
      }
      if (!core.isClassComponent(currentClass) || currentMethod.static) {
        return;
      }
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
            getOrInsertComputed(propertyUsages, currentClass, () => new Set<string>()).add(prop.key.name);
          }
        }
      }
    },
  };
}
