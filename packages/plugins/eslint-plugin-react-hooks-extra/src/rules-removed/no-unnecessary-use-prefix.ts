import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-prefix";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const WELL_KNOWN_HOOKS = [
  "useMDXComponents",
];

function containsUseComments(context: RuleContext, node: TSESTree.Node) {
  return context.sourceCode
    .getCommentsInside(node)
    .some(({ value }) => /use\([\s\S]*?\)/u.test(value) || /use[A-Z0-9]\w*\([\s\S]*?\)/u.test(value));
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    deprecated: {
      deprecatedSince: "2.0.0",
      replacedBy: [
        {
          message: "Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.",
          plugin: {
            name: "eslint-plugin-react-x",
            url: "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x",
          },
          rule: {
            name: "no-unnecessary-use-prefix",
            url: "https://eslint-react.xyz/docs/rules/no-unnecessary-use-prefix",
          },
        },
        {
          message: "Use the same rule from `eslint-plugin-react-x` or `@eslint-react/eslint-plugin` instead.",
          plugin: {
            name: "@eslint-react/eslint-plugin",
            url: "https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin",
          },
          rule: {
            name: "no-unnecessary-use-prefix",
            url: "https://eslint-react.xyz/docs/rules/no-unnecessary-use-prefix",
          },
        },
      ],
    },
    docs: {
      description: "Enforces that a function with the `use` prefix should use at least one Hook inside of it.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnnecessaryUsePrefix:
        "If your function doesn't call any Hooks, avoid the 'use' prefix. Instead, write it as a regular function without the 'use' prefix.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = ER.useHookCollector();
  return {
    ...listeners,
    "Program:exit"(program) {
      const allHooks = ctx.getAllHooks(program);
      for (const { id, name, node, hookCalls } of allHooks.values()) {
        // Skip well-known hooks
        if (WELL_KNOWN_HOOKS.includes(name)) {
          continue;
        }
        // Skip empty functions
        if (AST.isEmptyFunction(node)) {
          continue;
        }
        // Skip useful hooks
        if (hookCalls.length > 0) {
          continue;
        }
        // Skip hooks with comments that contain calls to other hooks
        if (containsUseComments(context, node)) {
          continue;
        }
        if (id != null) {
          context.report({
            messageId: "noUnnecessaryUsePrefix",
            data: {
              name,
            },
            loc: getPreferredLoc(context, id),
          });
          continue;
        }
        context.report({
          messageId: "noUnnecessaryUsePrefix",
          node,
          data: {
            name,
          },
        });
      }
    },
  };
}

function getPreferredLoc(context: RuleContext, id: TSESTree.Identifier) {
  if (AST.isMultiLine(id)) return id.loc;
  if (!context.sourceCode.getText(id).startsWith("use")) return id.loc;
  return {
    end: {
      column: id.loc.start.column + 3,
      line: id.loc.start.line,
    },
    start: {
      column: id.loc.start.column,
      line: id.loc.start.line,
    },
  };
}
