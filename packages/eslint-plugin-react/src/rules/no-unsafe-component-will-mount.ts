import { NodeType, type TSESTreeClass } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { MutList } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-mount";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of `UNSAFE_componentWillMount`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNSAFE_COMPONENT_WILL_MOUNT: "Do not use `UNSAFE_componentWillMount`.",
    },
  },
  defaultOptions: [],
  create(context) {
    const classStack = MutList.make<[TSESTreeClass, boolean]>();
    const onClassEnter = (node: TSESTreeClass) => {
      MutList.append(classStack, [
        node,
        isClassComponent(node, context),
      ]);
    };
    const onClassExit = () => MutList.pop(classStack);

    function checkPropertyOrMethod(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      if (node.key.type !== NodeType.Identifier || node.key.name !== "UNSAFE_componentWillMount") {
        return;
      }

      const [classNode, isPureClassComponent] = MutList.tail(classStack) ?? [];

      if (!classNode || !isPureClassComponent) {
        return;
      }

      context.report({
        node,
        messageId: "NO_UNSAFE_COMPONENT_WILL_MOUNT",
      });
    }

    return {
      ClassDeclaration: onClassEnter,
      "ClassDeclaration:exit": onClassExit,
      ClassExpression: onClassEnter,
      "ClassExpression:exit": onClassExit,
      MethodDefinition(node) {
        if (node.kind !== "method") {
          return;
        }

        checkPropertyOrMethod(node);
      },
      PropertyDefinition: checkPropertyOrMethod,
    };
  },
});
