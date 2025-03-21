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
      description: "Warns unused class component methods and properties.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
  const classEntries: AST.TSESTreeClass[] = [];
  const methodEntries: AST.TSESTreeMethodOrProperty[] = [];
  const propertyDefs = new WeakMap<AST.TSESTreeClass, Set<Property>>();
  const propertyUsages = new WeakMap<AST.TSESTreeClass, Set<string>>();
  function classEnter(node: AST.TSESTreeClass) {
    classEntries.push(node);
    if (!isClassComponent(node)) {
      return;
    }
    propertyDefs.set(node, new Set());
    propertyUsages.set(node, new Set());
  }
  function classExit() {
    const currentClass = classEntries.pop();
    if (currentClass == null || !isClassComponent(currentClass)) {
      return;
    }
    const className = AST.getClassIdentifier(currentClass)?.name;
    const defs = propertyDefs.get(currentClass);
    const usages = propertyUsages.get(currentClass);
    if (defs == null) {
      return;
    }
    for (const def of defs) {
      const methodName = AST.getPropertyName(def);
      if (methodName == null) {
        continue;
      }
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (usages?.has(methodName) || LIFECYCLE_METHODS.has(methodName)) {
        continue;
      }
      context.report({
        messageId: "noUnusedClassComponentMembers",
        node: def,
        data: {
          className: className ?? "Component",
          methodName,
        },
      });
    }
  }
  function methodEnter(node: AST.TSESTreeMethodOrProperty) {
    methodEntries.push(node);
    const currentClass = classEntries.at(-1);
    if (currentClass == null || !isClassComponent(currentClass)) {
      return;
    }
    if (node.static) {
      return;
    }
    if (isKeyLiteral(node, node.key)) {
      propertyDefs.get(currentClass)?.add(node.key);
    }
  }
  function methodExit() {
    methodEntries.pop();
  }

  return {
    ClassDeclaration: classEnter,
    "ClassDeclaration:exit": classExit,
    ClassExpression: classEnter,
    "ClassExpression:exit": classExit,
    MemberExpression(node) {
      const currentClass = classEntries.at(-1);
      const currentMethod = methodEntries.at(-1);
      if (currentClass == null || currentMethod == null) {
        return;
      }
      if (!isClassComponent(currentClass) || currentMethod.static) {
        return;
      }
      if (!AST.isThisExpression(node.object) || !isKeyLiteral(node, node.property)) {
        return;
      }
      if (node.parent.type === T.AssignmentExpression && node.parent.left === node) {
        // detect `this.property = xxx`
        propertyDefs.get(currentClass)?.add(node.property);
        return;
      }
      // detect `this.property()`, `x = this.property`, etc.
      const propertyName = AST.getPropertyName(node.property);
      if (propertyName != null) {
        propertyUsages.get(currentClass)?.add(propertyName);
      }
    },
    MethodDefinition: methodEnter,
    "MethodDefinition:exit": methodExit,
    PropertyDefinition: methodEnter,
    "PropertyDefinition:exit": methodExit,
    VariableDeclarator(node) {
      const currentClass = classEntries.at(-1);
      const currentMethod = methodEntries.at(-1);
      if (currentClass == null || currentMethod == null) {
        return;
      }
      if (!isClassComponent(currentClass) || currentMethod.static) {
        return;
      }
      // detect `{ foo, bar: baz } = this`
      if (node.init != null && AST.isThisExpression(node.init) && node.id.type === T.ObjectPattern) {
        for (const prop of node.id.properties) {
          if (prop.type === T.Property && isKeyLiteral(prop, prop.key)) {
            const keyName = AST.getPropertyName(prop.key);
            if (keyName != null) {
              propertyUsages.get(currentClass)?.add(keyName);
            }
          }
        }
      }
    },
  };
}
