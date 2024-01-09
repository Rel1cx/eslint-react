import { getClassIdentifier, isOneOf, NodeType, traverseUp, type TSESTreeClass } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { _, MutList, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-state";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isThisExpression(node: TSESTree.Expression): boolean {
  if (node.type === NodeType.TSAsExpression) {
    return isThisExpression(node.expression);
  }

  return node.type === NodeType.ThisExpression;
}

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): O.Option<string> {
  if (node.type === NodeType.TSAsExpression) {
    return getName(node.expression);
  }
  if (node.type === NodeType.Identifier || node.type === NodeType.PrivateIdentifier) {
    return O.some(node.name);
  }
  if (node.type === NodeType.Literal) {
    return O.some(String(node.value));
  }
  if (node.type === NodeType.TemplateLiteral && node.expressions.length === 0) {
    return O.fromNullable(node.quasis[0]?.value.raw);
  }

  return O.none();
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "Prevents unused state of class component.",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNUSED_STATE: 'Unused state of class component "{{className}}".',
    },
  },
  defaultOptions: [],
  create(context) {
    const classStack = MutList.make<TSESTreeClass>();
    const methodStack = MutList.make<TSESTree.MethodDefinition | TSESTree.PropertyDefinition>();
    const stateDefs = new WeakMap<TSESTreeClass, [O.Option<TSESTree.Node>, boolean]>();
    function classEnter(node: TSESTreeClass) {
      MutList.append(classStack, node);
    }
    function classExit() {
      const currentClass = MutList.pop(classStack);
      if (!currentClass || !isClassComponent(currentClass, context)) return;
      const className = O.map(getClassIdentifier(currentClass), id => id.name);
      const [def, isUsed] = stateDefs.get(currentClass) ?? [O.none(), false];
      if (O.isNone(def) || isUsed) return;
      context.report({
        node: def.value,
        messageId: "NO_UNUSED_STATE",
        data: {
          className: O.getOrElse(className, () => "Component"),
        },
      });
    }
    function methodEnter(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      MutList.append(methodStack, node);
      const currentClass = MutList.tail(classStack);
      if (!currentClass || !isClassComponent(currentClass, context)) return;
      if (node.static) return;
      if (O.exists(getName(node.key), name => name === "state")) {
        stateDefs.set(currentClass, [O.some(node.key), false]);
      }
    }
    function methodExit() {
      MutList.pop(methodStack);
    }

    return {
      ClassDeclaration: classEnter,
      ClassExpression: classEnter,
      "ClassDeclaration:exit": classExit,
      "ClassExpression:exit": classExit,
      MethodDefinition: methodEnter,
      PropertyDefinition: methodEnter,
      "MethodDefinition:exit": methodExit,
      "PropertyDefinition:exit": methodExit,
      MemberExpression(node) {
        if (!isThisExpression(node.object)) return;
        if (!O.exists(getName(node.property), name => name === "state")) return;
        const currentClass = MutList.tail(classStack);
        if (!currentClass || !isClassComponent(currentClass, context)) return;
        const currentMethod = MutList.tail(methodStack);
        if (!currentMethod || currentMethod.static) return;
        if (!currentClass.body.body.includes(currentMethod)) return;
        if (
          O.exists(
            traverseUp(
              node,
              n =>
                isOneOf([
                  NodeType.FunctionDeclaration,
                  NodeType.FunctionExpression,
                ])(n) || n === currentMethod,
            ),
            n => {
              if (n.type === NodeType.FunctionDeclaration) return true;
              if (n.type === NodeType.FunctionExpression) {
                return O.exists(
                  traverseUp(n, isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])),
                  m => m !== currentMethod,
                );
              }

              return false;
            },
          )
        ) return;
        const [def] = stateDefs.get(currentClass) ?? [O.none(), false];
        stateDefs.set(currentClass, [def, true]);
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
