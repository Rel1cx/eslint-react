import * as core from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { findEnclosingAssignmentTarget } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { snakeCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "use-state";

export const RULE_FEATURES = [
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID =
  | "invalidAssignment"
  | "invalidSetterName";

type Options = readonly [
  | unit
  | {
    enforceAssignment?: boolean;
    enforceSetterName?: boolean;
  },
];

export const defaultOptions = [
  {
    enforceAssignment: true,
    enforceSetterName: true,
  },
] as const satisfies Options;

const schema = [
  {
    type: "object",
    additionalProperties: false,
    properties: {
      enforceAssignment: {
        type: "boolean",
        default: true,
      },
      enforceSetterName: {
        type: "boolean",
        default: true,
      },
    },
  },
] as const satisfies JSONSchema4[];

export default createRule<Options, MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces destructuring and symmetric naming of the 'useState' hook value and setter.",
    },
    messages: {
      invalidAssignment:
        "useState should be destructured into a value and setter pair, e.g., const [state, setState] = useState(...).",
      invalidSetterName:
        "The setter should be named 'set' followed by the capitalized state variable name, e.g., 'setState' for 'state'.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>) {
  // Fast path: skip if `useState` is not present in the file
  if (!context.sourceCode.text.includes("useState")) return {};

  const options = context.options[0] ?? defaultOptions[0];
  const { enforceAssignment = false, enforceSetterName = true } = options;

  return defineRuleListener({
    CallExpression(node: TSESTree.CallExpression) {
      if (!core.isUseStateCall(node)) return;

      if (node.parent.type !== AST.VariableDeclarator) {
        if (!enforceAssignment) return;
        context.report({ messageId: "invalidAssignment", node });
        return;
      }

      const id = findEnclosingAssignmentTarget(node);
      if (id?.type !== AST.ArrayPattern) {
        if (!enforceAssignment) return;
        context.report({ messageId: "invalidAssignment", node: id ?? node });
        return;
      }

      const [value, setter] = id.elements;
      if (value == null) {
        if (!enforceAssignment) return;
        context.report({ messageId: "invalidAssignment", node: id });
        return;
      }

      // https://github.com/Rel1cx/eslint-react/issues/1352
      if (setter == null || !enforceSetterName) return;

      // Only enforce setter naming when the value is a plain identifier.
      // Destructured patterns (ObjectPattern, ArrayPattern, etc.) cannot be
      // symmetrically named, so report them as an invalid assignment form.
      if (value.type !== AST.Identifier) {
        context.report({ messageId: "invalidAssignment", node: value });
        return;
      }

      if (setter.type !== AST.Identifier || !setter.name.startsWith("set")) {
        context.report({ messageId: "invalidSetterName", node: setter });
        return;
      }

      if (snakeCase(setter.name) !== `set_${snakeCase(value.name)}`) {
        context.report({ messageId: "invalidSetterName", node: setter });
      }
    },
  });
}
