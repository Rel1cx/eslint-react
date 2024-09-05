import type { TSESTreeClass } from "@eslint-react/ast";
import { getClassIdentifier, isKeyLiteralLike, isThisExpression } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-class-component-members";

export type MessageID = CamelCase<typeof RULE_NAME>;

type Property =
  | (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)["key"]
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
function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): O.Option<string> {
  if (node.type === AST_NODE_TYPES.TSAsExpression) {
    return getName(node.expression);
  }
  if (node.type === AST_NODE_TYPES.Identifier || node.type === AST_NODE_TYPES.PrivateIdentifier) {
    return O.some(node.name);
  }
  if (node.type === AST_NODE_TYPES.Literal) {
    return O.some(String(node.value));
  }
  if (node.type === AST_NODE_TYPES.TemplateLiteral && node.expressions.length === 0) {
    return O.fromNullable(node.quasis[0]?.value.raw);
  }

  return O.none();
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unused class component members",
    },
    messages: {
      noUnusedClassComponentMembers: "Unused method or property '{{methodName}}'' of class '{{className}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const classStack: TSESTreeClass[] = [];
    const methodStack: (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)[] = [];
    const propertyDefs = new WeakMap<TSESTreeClass, Set<Property>>();
    const propertyUsages = new WeakMap<TSESTreeClass, Set<string>>();
    function classEnter(node: TSESTreeClass) {
      classStack.push(node);
      if (!isClassComponent(node)) return;
      propertyDefs.set(node, new Set());
      propertyUsages.set(node, new Set());
    }
    function classExit() {
      const currentClass = classStack.pop();
      if (!currentClass || !isClassComponent(currentClass)) return;
      const className = O.map(getClassIdentifier(currentClass), id => id.name);
      const defs = propertyDefs.get(currentClass);
      const usages = propertyUsages.get(currentClass);
      if (!defs) return;
      for (const def of defs) {
        const name = getName(def);
        if (O.isNone(name)) continue;
        if (!!usages?.has(name.value) || LIFECYCLE_METHODS.has(name.value)) continue;
        context.report({
          messageId: "noUnusedClassComponentMembers",
          node: def,
          data: {
            className: O.getOrElse(className, () => "Component"),
            methodName: name.value,
          },
        });
      }
    }
    function methodEnter(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      methodStack.push(node);
      const currentClass = classStack.at(-1);
      if (!currentClass || !isClassComponent(currentClass)) return;
      if (node.static) return;
      if (isKeyLiteralLike(node, node.key)) {
        propertyDefs.get(currentClass)?.add(node.key);
      }
    }
    function methodExit() {
      methodStack.pop();
    }

    return {
      ClassDeclaration: classEnter,
      "ClassDeclaration:exit": classExit,
      ClassExpression: classEnter,
      "ClassExpression:exit": classExit,
      MemberExpression(node) {
        const currentClass = classStack.at(-1);
        const currentMethod = methodStack.at(-1);
        if (!currentClass || !currentMethod) return;
        if (!isClassComponent(currentClass) || currentMethod.static) return;
        if (!isThisExpression(node.object) || !isKeyLiteralLike(node, node.property)) return;
        if (node.parent.type === AST_NODE_TYPES.AssignmentExpression && node.parent.left === node) {
          // detect `this.property = xxx`
          propertyDefs.get(currentClass)?.add(node.property);
          return;
        }
        // detect `this.property()`, `x = this.property`, etc.
        O.map(getName(node.property), name => propertyUsages.get(currentClass)?.add(name));
      },
      MethodDefinition: methodEnter,
      "MethodDefinition:exit": methodExit,
      PropertyDefinition: methodEnter,
      "PropertyDefinition:exit": methodExit,
      VariableDeclarator(node) {
        const currentClass = classStack.at(-1);
        const currentMethod = methodStack.at(-1);
        if (!currentClass || !currentMethod) return;
        if (!isClassComponent(currentClass) || currentMethod.static) return;
        // detect `{ foo, bar: baz } = this`
        if (node.init && isThisExpression(node.init) && node.id.type === AST_NODE_TYPES.ObjectPattern) {
          for (const prop of node.id.properties) {
            if (prop.type === AST_NODE_TYPES.Property && isKeyLiteralLike(prop, prop.key)) {
              O.map(getName(prop.key), name => propertyUsages.get(currentClass)?.add(name));
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
});
