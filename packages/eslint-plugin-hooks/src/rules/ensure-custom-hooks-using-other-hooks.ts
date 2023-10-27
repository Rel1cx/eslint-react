import { getFunctionIdentifier } from "@eslint-react/ast";
import { hooksCollector } from "@eslint-react/core";
import { E } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "ensure-custom-hooks-using-other-hooks";

type MessageID = "CUSTOM_HOOKS_NOT_USING_OTHER_HOOKS";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "enforce custom hooks using other hooks",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            CUSTOM_HOOKS_NOT_USING_OTHER_HOOKS: "Custom hooks {{name}} should use other hooks",
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
                for (const hook of redundantHooks) {
                    const name = getFunctionIdentifier(hook)?.name ?? "unknown";
                    context.report({
                        data: {
                            name,
                        },
                        messageId: "CUSTOM_HOOKS_NOT_USING_OTHER_HOOKS",
                        node: hook,
                    });
                }
            },
        };
    },
});
