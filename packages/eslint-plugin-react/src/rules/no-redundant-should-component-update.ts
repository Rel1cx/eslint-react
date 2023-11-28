import { type TSESTreeClass } from "@eslint-react/ast";
import { isClassComponent } from "@eslint-react/core";
import { MutList } from "@eslint-react/tools";
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
      description: "disallow usage of `shouldComponentUpdate` in pure components.",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_REDUNDANT_SHOULD_COMPONENT_UPDATE: "The `shouldComponentUpdate` method inside a pure component is redundant.",
    },
  },
  defaultOptions: [],
  create(context) {
    const classStack = MutList.make<[TSESTreeClass, boolean]>();
    const onClassEnter = (node: TSESTreeClass) => {
      if (isClassComponent(node, context)) {
        MutList.append(classStack, [node, true]);

        return;
      }

      MutList.append(classStack, [node, false]);
    };
    const onClassExit = () => MutList.pop(classStack);

    return {
      ClassDeclaration: onClassEnter,
      "ClassDeclaration:exit": onClassExit,
      ClassExpression: onClassEnter,
      "ClassExpression:exit": onClassExit,
    };
  },
});
