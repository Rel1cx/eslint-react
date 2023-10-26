import { getFunctionIdentifier } from "@eslint-react/ast";
import { hooksCollector } from "@eslint-react/core";
import { createRule } from "@eslint-react/shared";
import { E } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
export const RULE_NAME = "debug/hooks";

type MessageID = "HOOKS" | "REDUNDANT_HOOKS";

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
            HOOKS: "React hook found, name: {{name}}",
            REDUNDANT_HOOKS: "Redundant react hook found, name: {{name}}",
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
                        messageId: "REDUNDANT_HOOKS",
                        node: hook,
                    });
                }

                const maybeHooks = ctx.getAllHooks();
                if (E.isLeft(maybeHooks)) {
                    console.error(maybeHooks.left);

                    return;
                }
                const hooks = maybeHooks.right;
                for (const hook of hooks) {
                    if (redundantHooks.includes(hook)) {
                        continue;
                    }

                    const name = getFunctionIdentifier(hook)?.name ?? "unknown";
                    context.report({
                        data: {
                            name,
                        },
                        messageId: "HOOKS",
                        node: hook,
                    });
                }
            },
        };
    },
});
