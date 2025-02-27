import * as AST from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-class-component-members";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

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

// Return the name of an identifier or the string value of a literal. Useful
// anywhere that a literal may be used as a key (e.g., member expressions,
// method definitions, ObjectExpression property keys).
function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): string | _ {
  if (AST.isTsOnlyExpression(node)) {
    return getName(node.expression);
  }
  if (node.type === T.Identifier || node.type === T.PrivateIdentifier) {
    return node.name;
  }
  if (node.type === T.Literal) {
    return node.value?.toString();
  }
  if (node.type === T.TemplateLiteral && node.expressions.length === 0) {
    return node.quasis[0]?.value.raw;
  }

  return _;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unused class component members",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnusedClassComponentMembers: "Unused method or property '{{methodName}}'' of class '{{className}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
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
        const methodName = getName(def);
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
      if (AST.isKeyLiteralLike(node, node.key)) {
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
        if (!AST.isThisExpression(node.object) || !AST.isKeyLiteralLike(node, node.property)) {
          return;
        }
        if (node.parent.type === T.AssignmentExpression && node.parent.left === node) {
          // detect `this.property = xxx`
          propertyDefs.get(currentClass)?.add(node.property);
          return;
        }
        // detect `this.property()`, `x = this.property`, etc.
        const propertyName = getName(node.property);
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
            if (prop.type === T.Property && AST.isKeyLiteralLike(prop, prop.key)) {
              const keyName = getName(prop.key);
              if (keyName != null) {
                propertyUsages.get(currentClass)?.add(keyName);
              }
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
});
