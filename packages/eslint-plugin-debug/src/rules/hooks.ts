import { createRule } from "@eslint-react/shared";
import type { ESLintUtils } from "@typescript-eslint/utils";
export const RULE_NAME = "debug/context";

type MessageID = "HOOK" | "REDUNDANT_HOOK";

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
            HOOK: "React hook found, name: {{name}}",
            REDUNDANT_HOOK: "Redundant react hook found, name: {{name}}",
        },
    },
    defaultOptions: [],
    create() {
        return {
            // TODO: implement this using @eslint-react/hooks/hooks-collector
        };
    },
});
