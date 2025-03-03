import { getInstanceId } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { snakeCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "use-state";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = "invalid";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce destructuring and symmetric naming of 'useState' hook value and setter",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      invalid: "An useState call is not destructured into value + setter pair.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      "CallExpression[callee.name='useState']"(node: TSESTree.CallExpression) {
        if (node.parent.type !== T.VariableDeclarator) {
          context.report({ messageId: "invalid", node });
        }
        const id = getInstanceId(node);
        if (id?.type !== T.ArrayPattern) {
          context.report({ messageId: "invalid", node });
          return;
        }
        const [value, setter] = id.elements;
        if (value == null || setter == null) {
          context.report({ messageId: "invalid", node });
          return;
        }
        const setterName = match(setter)
          .with({ type: T.Identifier }, (id) => id.name)
          .otherwise(() => _);
        if (setterName == null || !setterName.startsWith("set")) {
          context.report({ messageId: "invalid", node });
          return;
        }
        const valueName = match(value)
          .with({ type: T.Identifier }, ({ name }) => snakeCase(name))
          .with({ type: T.ObjectPattern }, ({ properties }) => {
            const values = properties.reduce<string[]>((acc, prop) => {
              if (prop.type === T.Property && prop.key.type === T.Identifier) {
                return [...acc, prop.key.name];
              }
              return acc;
            }, []);
            return values.join("_");
          })
          .otherwise(() => _);
        if (valueName == null || `set_${valueName}` !== snakeCase(setterName)) {
          context.report({ messageId: "invalid", node });
          return;
        }
      },
    };
  },
  defaultOptions: [],
});
