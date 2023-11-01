import { getFunctionIdentifier } from "@eslint-react/ast";
import { hooksCollector } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";
export const RULE_NAME = "hooks";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "reports all react hooks",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      HOOKS: "React hook found, name: {{name}}, redundant: {{redundant}}",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = hooksCollector(context);

    return {
      ...listeners,
      "Program:exit"() {
        const maybeRedundantHooks = ctx.getAllRedundantHooks();
        if (E.isLeft(maybeRedundantHooks)) {
          console.error(maybeRedundantHooks.left);

          return;
        }

        const redundantHooks = maybeRedundantHooks.right;

        const maybeHooks = ctx.getAllHooks();
        if (E.isLeft(maybeHooks)) {
          console.error(maybeHooks.left);

          return;
        }

        const hooks = maybeHooks.right;

        for (const hook of hooks) {
          const name = getFunctionIdentifier(hook)?.name ?? "unknown";
          context.report({
            data: {
              name,
              redundant: redundantHooks.includes(hook),
            },
            messageId: "HOOKS",
            node: hook,
          });
        }
      },
    };
  },
});
