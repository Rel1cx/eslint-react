import { getClassIdentifier, NodeType, type TSESTreeClass } from "@eslint-react/ast";
import { isPureComponent } from "@eslint-react/core";
import { F, MutList, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-redundant-should-component-update";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of `shouldComponentUpdate` in class component extends `React.PureComponent`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_REDUNDANT_SHOULD_COMPONENT_UPDATE:
        "{{componentName}} does not need `shouldComponentUpdate` when extending `React.PureComponent`.",
    },
  },
  defaultOptions: [],
  create(context) {
    const classStack = MutList.make<[TSESTreeClass, boolean]>();
    const onClassEnter = (node: TSESTreeClass) => {
      MutList.append(classStack, [
        node,
        isPureComponent(node, context),
      ]);
    };
    const onClassExit = () => MutList.pop(classStack);

    function checkPropertyOrMethod(node: TSESTree.MethodDefinition | TSESTree.PropertyDefinition) {
      if (node.key.type !== NodeType.Identifier || node.key.name !== "shouldComponentUpdate") {
        return;
      }

      const [classNode, isPureClassComponent] = MutList.tail(classStack) ?? [];

      if (!classNode || !isPureClassComponent) {
        return;
      }

      const componentName = F.pipe(
        getClassIdentifier(classNode),
        O.map(id => id.name),
        O.getOrElse(() => "PureComponent"),
      );

      context.report({
        node,
        messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
        data: {
          componentName,
        },
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
