import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import { constFalse, constTrue } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { isMatching, match, P } from "ts-pattern";

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
  const classEntries: AST.TSESTreeClass[] = [];
  const methodEntries: AST.TSESTreeMethodOrProperty[] = [];
  const constructorEntries: TSESTree.MethodDefinition[] = [];
  const stateDefs = new WeakMap<AST.TSESTreeClass, { node: TSESTree.Node | unit; isUsed: boolean }>();
  function classEnter(node: AST.TSESTreeClass) {
    classEntries.push(node);
  }
  function classExit() {
    const currentClass = classEntries.pop();
    if (currentClass == null || !ER.isClassComponent(currentClass)) {
      return;
    }
    const className = AST.getClassId(currentClass)?.name;
    const { node: defNode, isUsed = false } = stateDefs.get(currentClass) ?? {};
    if (defNode == null || isUsed) {
      return;
    }
    context.report({
      messageId: "noUnusedState",
      node: defNode,
      data: {
        className: className ?? "Component",
      },
    });
  }
  function methodEnter(node: AST.TSESTreeMethodOrProperty) {
    methodEntries.push(node);
    const currentClass = classEntries.at(-1);
    if (currentClass == null || !ER.isClassComponent(currentClass)) {
      return;
    }
    if (node.static) {
      if (ER.isGetDerivedStateFromProps(node) && isMatching({ params: [P.nonNullable, ...P.array()] })(node.value)) {
        const defNode = stateDefs.get(currentClass)?.node;
        stateDefs.set(currentClass, { node: defNode, isUsed: true });
      }
      return;
    }
    if (AST.getPropertyName(node.key) === "state") {
      stateDefs.set(currentClass, { node: node.key, isUsed: false });
    }
  }
  function methodExit() {
    methodEntries.pop();
  }
  function constructorEnter(node: TSESTree.MethodDefinition) {
    constructorEntries.push(node);
  }
  function constructorExit() {
    constructorEntries.pop();
  }

  return {
    AssignmentExpression(node) {
      if (!ER.isAssignmentToThisState(node)) {
        return;
      }
      const currentClass = classEntries.at(-1);
      if (currentClass == null || !ER.isClassComponent(currentClass)) {
        return;
      }
      const currentConstructor = constructorEntries.at(-1);
      if (currentConstructor == null || !currentClass.body.body.includes(currentConstructor)) {
        return;
      }
      const isUsed = stateDefs.get(currentClass)?.isUsed ?? false;
      stateDefs.set(currentClass, { node: node.left, isUsed });
    },
    ClassDeclaration: classEnter,
    "ClassDeclaration:exit": classExit,
    ClassExpression: classEnter,
    "ClassExpression:exit": classExit,
    MemberExpression(node) {
      if (!AST.isThisExpression(node.object)) {
        return;
      }
      // detect `this.state`
      if (AST.getPropertyName(node.property) !== "state") {
        return;
      }
      const currentClass = classEntries.at(-1);
      if (currentClass == null || !ER.isClassComponent(currentClass)) {
        return;
      }
      const currentMethod = methodEntries.at(-1);
      if (currentMethod == null || currentMethod.static) {
        return;
      }
      if (currentMethod === constructorEntries.at(-1)) {
        return;
      }
      if (!currentClass.body.body.includes(currentMethod)) {
        return;
      }
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
      const currentClass = classEntries.at(-1);
      if (currentClass == null || !ER.isClassComponent(currentClass)) {
        return;
      }
      const currentMethod = methodEntries.at(-1);
      if (currentMethod == null || currentMethod.static) {
        return;
      }
      if (currentMethod === constructorEntries.at(-1)) {
        return;
      }
      if (!currentClass.body.body.includes(currentMethod)) {
        return;
      }
      // detect `{ foo, state: baz } = this`
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
      const defNode = stateDefs.get(currentClass)?.node;
      stateDefs.set(currentClass, { node: defNode, isUsed: true });
    },
  };
}
