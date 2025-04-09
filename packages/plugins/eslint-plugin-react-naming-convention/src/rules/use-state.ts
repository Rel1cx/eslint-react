import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import * as ER from "@eslint-react/core";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { snakeCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "use-state";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "missingDestructuring" | "invalidSetterNaming";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces destructuring and symmetric naming of `useState` hook value and setter.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      invalidSetterNaming:
        "The setter should be named 'set' followed by the capitalized state variable name, e.g., 'setState' for 'state'.",
      missingDestructuring:
        "useState should be destructured into a value and setter pair, e.g., const [state, setState] = useState(...).",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    "CallExpression[callee.name='useState']"(node: TSESTree.CallExpression) {
      if (node.parent.type !== T.VariableDeclarator) {
        context.report({ messageId: "missingDestructuring", node });
        return;
      }
      const id = ER.getInstanceId(node);
      if (id?.type !== T.ArrayPattern) {
        context.report({ messageId: "missingDestructuring", node });
        return;
      }
      const [value, setter] = id.elements;
      if (value == null || setter == null) {
        context.report({ messageId: "missingDestructuring", node });
        return;
      }
      const setterName = match(setter)
        .with({ type: T.Identifier }, (id) => id.name)
        .otherwise(() => null);
      if (setterName == null || !setterName.startsWith("set")) {
        context.report({ messageId: "invalidSetterNaming", node });
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
        .otherwise(() => null);
      if (valueName == null || `set_${valueName}` !== snakeCase(setterName)) {
        context.report({ messageId: "invalidSetterNaming", node });
        return;
      }
    },
  };
}
