import * as AST from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-state";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function getName(node: TSESTree.Expression | TSESTree.PrivateIdentifier): string | _ {
  if (AST.isTypeExpression(node)) {
    return getName(node.expression);
  }
  if (node.type === T.Identifier || node.type === T.PrivateIdentifier) {
    return node.name;
  }
  if (node.type === T.Literal) {
    return String(node.value);
  }
  if (node.type === T.TemplateLiteral && node.expressions.length === 0) {
    return node.quasis[0]?.value.raw;
  }

  return _;
}

function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;

  return (
    left.type === T.MemberExpression
    && AST.isThisExpression(left.object)
    && getName(left.property) === "state"
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
    const classEntries: AST.TSESTreeClass[] = [];
    const methodEntries: (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)[] = [];
    const constructorEntries: TSESTree.MethodDefinition[] = [];
    const stateDefs = new WeakMap<AST.TSESTreeClass, { node: TSESTree.Node | _; isUsed: boolean }>();
    function classEnter(node: AST.TSESTreeClass) {
      classEntries.push(node);
    }
    function classExit() {
      const currentClass = classEntries.pop();
      if (currentClass == null || !isClassComponent(currentClass)) {
        return;
      }
      const className = AST.getClassIdentifier(currentClass)?.name;
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
    function methodEnter(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      methodEntries.push(node);
      const currentClass = classEntries.at(-1);
      if (currentClass == null || !isClassComponent(currentClass)) {
        return;
      }
      if (node.static) {
        if (isGetDerivedStateFromProps(node) && node.value.params.length > 1) {
          const defNode = stateDefs.get(currentClass)?.node;
          stateDefs.set(currentClass, { node: defNode, isUsed: true });
        }
        return;
      }
      if (getName(node.key) === "state") {
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
        if (!isAssignmentToThisState(node)) {
          return;
        }
        const currentClass = classEntries.at(-1);
        if (currentClass == null || !isClassComponent(currentClass)) {
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
        if (getName(node.property) !== "state") {
          return;
        }
        const currentClass = classEntries.at(-1);
        if (currentClass == null || !isClassComponent(currentClass)) {
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
        if (currentClass == null || !isClassComponent(currentClass)) {
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
        if (!(node.init != null && AST.isThisExpression(node.init) && node.id.type === T.ObjectPattern)) {
          return;
        }
        const hasState = node.id.properties.some((prop) => {
          if (prop.type === T.Property && AST.isKeyLiteralLike(prop, prop.key)) {
            return getName(prop.key) === "state";
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
  },
  defaultOptions: [],
});
