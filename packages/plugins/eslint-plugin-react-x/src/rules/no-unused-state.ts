import type { TSESTreeClass } from "@eslint-react/ast";
import { getClassIdentifier, isKeyLiteralLike, isThisExpression, NodeType } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import * as R from "remeda";
import type { CamelCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-state";

export type MessageID = CamelCase<typeof RULE_NAME>;

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

function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;

  return (
    left.type === NodeType.MemberExpression
    && isThisExpression(left.object)
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
    },
    messages: {
      noUnusedState: "Unused class component state.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const classStack: TSESTreeClass[] = [];
    const methodStack: (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)[] = [];
    const constructorStack: TSESTree.MethodDefinition[] = [];
    const stateDefs = new WeakMap<TSESTreeClass, [node: O.Option<TSESTree.Node>, isUsed: boolean]>();
    function classEnter(node: TSESTreeClass) {
      classStack.push(node);
    }
    function classExit() {
      const currentClass = classStack.pop();
      if (!currentClass || !isClassComponent(currentClass)) return;
      const className = O.map(getClassIdentifier(currentClass), id => id.name);
      const [def, isUsed] = stateDefs.get(currentClass) ?? [O.none(), false];
      if (O.isNone(def) || isUsed) return;
      context.report({
        data: {
          className: O.getOrElse(className, () => "Component"),
        },
        messageId: "noUnusedState",
        node: def.value,
      });
    }
    function methodEnter(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      methodStack.push(node);
      const currentClass = R.last(classStack);
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
        const currentClass = R.last(classStack);
        if (!currentClass || !isClassComponent(currentClass)) return;
        const currentConstructor = R.last(constructorStack);
        if (!currentConstructor || !currentClass.body.body.includes(currentConstructor)) return;
        const [_, isUsed] = stateDefs.get(currentClass) ?? [O.none(), false];
        stateDefs.set(currentClass, [O.some(node.left), isUsed]);
      },
      ClassDeclaration: classEnter,
      "ClassDeclaration:exit": classExit,
      ClassExpression: classEnter,
      "ClassExpression:exit": classExit,
      MemberExpression(node) {
        if (!isThisExpression(node.object)) return;
        // detect `this.state`
        if (!O.exists(getName(node.property), name => name === "state")) return;
        const currentClass = R.last(classStack);
        if (!currentClass || !isClassComponent(currentClass)) return;
        const currentMethod = R.last(methodStack);
        if (!currentMethod || currentMethod.static) return;
        if (currentMethod === R.last(constructorStack)) return;
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
        const currentClass = R.last(classStack);
        if (!currentClass || !isClassComponent(currentClass)) return;
        const currentMethod = R.last(methodStack);
        if (!currentMethod || currentMethod.static) return;
        if (currentMethod === R.last(constructorStack)) return;
        if (!currentClass.body.body.includes(currentMethod)) return;
        // detect `{ foo, state: baz } = this`
        if (!(node.init && isThisExpression(node.init) && node.id.type === NodeType.ObjectPattern)) return;
        const hasState = node.id.properties.some(prop => {
          if (prop.type === NodeType.Property && isKeyLiteralLike(prop, prop.key)) {
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
}) satisfies ESLintUtils.RuleModule<MessageID>;
