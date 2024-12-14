/* eslint-disable better-mutation/no-mutating-methods */
import * as AST from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-state";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

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

function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;

  return (
    left.type === AST_NODE_TYPES.MemberExpression
    && AST.isThisExpression(left.object)
    && O.exists(getName(left.property), name => name === "state")
  );
}

const isGetDerivedStateFromProps = isMatching({
  key: {
    name: "getDerivedStateFromProps",
  },
  static: true,
  value: {
    params: P.array(),
  },
});

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unused state of class component",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnusedState: "Unused class component state in '{{className}}'",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const classStack: AST.TSESTreeClass[] = [];
    const methodStack: (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)[] = [];
    const constructorStack: TSESTree.MethodDefinition[] = [];
    const stateDefs = new WeakMap<AST.TSESTreeClass, [node: O.Option<TSESTree.Node>, isUsed: boolean]>();
    function classEnter(node: AST.TSESTreeClass) {
      classStack.push(node);
    }
    function classExit() {
      const currentClass = classStack.pop();
      if (!currentClass || !isClassComponent(currentClass)) return;
      const className = O.map(AST.getClassIdentifier(currentClass), id => id.name);
      const [def, isUsed] = stateDefs.get(currentClass) ?? [O.none(), false];
      if (O.isNone(def) || isUsed) return;
      context.report({
        messageId: "noUnusedState",
        node: def.value,
        data: {
          className: O.getOrElse(className, () => "Component"),
        },
      });
    }
    function methodEnter(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      methodStack.push(node);
      const currentClass = classStack.at(-1);
      if (!currentClass || !isClassComponent(currentClass)) return;
      if (node.static) {
        if (isGetDerivedStateFromProps(node) && node.value.params.length > 1) {
          const [def] = stateDefs.get(currentClass) ?? [O.none()];
          stateDefs.set(currentClass, [def, true]);
        }
        return;
      }
      if (O.exists(getName(node.key), name => name === "state")) {
        stateDefs.set(currentClass, [O.some(node.key), false]);
      }
    }
    function methodExit() {
      methodStack.pop();
    }
    function constructorEnter(node: TSESTree.MethodDefinition) {
      constructorStack.push(node);
    }
    function constructorExit() {
      constructorStack.pop();
    }

    return {
      AssignmentExpression(node) {
        if (!isAssignmentToThisState(node)) return;
        const currentClass = classStack.at(-1);
        if (!currentClass || !isClassComponent(currentClass)) return;
        const currentConstructor = constructorStack.at(-1);
        if (!currentConstructor || !currentClass.body.body.includes(currentConstructor)) return;
        const [_, isUsed] = stateDefs.get(currentClass) ?? [O.none(), false];
        stateDefs.set(currentClass, [O.some(node.left), isUsed]);
      },
      ClassDeclaration: classEnter,
      "ClassDeclaration:exit": classExit,
      ClassExpression: classEnter,
      "ClassExpression:exit": classExit,
      MemberExpression(node) {
        if (!AST.isThisExpression(node.object)) return;
        // detect `this.state`
        if (!O.exists(getName(node.property), name => name === "state")) return;
        const currentClass = classStack.at(-1);
        if (!currentClass || !isClassComponent(currentClass)) return;
        const currentMethod = methodStack.at(-1);
        if (!currentMethod || currentMethod.static) return;
        if (currentMethod === constructorStack.at(-1)) return;
        if (!currentClass.body.body.includes(currentMethod)) return;
        const [def] = stateDefs.get(currentClass) ?? [O.none(), false];
        stateDefs.set(currentClass, [def, true]);
      },
      MethodDefinition: methodEnter,
      "MethodDefinition:exit": methodExit,
      "MethodDefinition[key.name='constructor']": constructorEnter,
      "MethodDefinition[key.name='constructor']:exit": constructorExit,
      PropertyDefinition: methodEnter,
      "PropertyDefinition:exit": methodExit,
      VariableDeclarator(node) {
        const currentClass = classStack.at(-1);
        if (!currentClass || !isClassComponent(currentClass)) return;
        const currentMethod = methodStack.at(-1);
        if (!currentMethod || currentMethod.static) return;
        if (currentMethod === constructorStack.at(-1)) return;
        if (!currentClass.body.body.includes(currentMethod)) return;
        // detect `{ foo, state: baz } = this`
        if (!(node.init && AST.isThisExpression(node.init) && node.id.type === AST_NODE_TYPES.ObjectPattern)) return;
        const hasState = node.id.properties.some(prop => {
          if (prop.type === AST_NODE_TYPES.Property && AST.isKeyLiteralLike(prop, prop.key)) {
            return O.exists(getName(prop.key), name => name === "state");
          }
          return false;
        });
        if (!hasState) return;
        const [def] = stateDefs.get(currentClass) ?? [O.none(), false];
        stateDefs.set(currentClass, [def, true]);
      },
    };
  },
  defaultOptions: [],
});
