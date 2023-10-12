import { createRule } from "@eslint-react/shared";
import type { ESLintUtils } from "@typescript-eslint/utils";

export const RULE_NAME = "debug/render-prop";

type MessageID = "RENDER_FUNCTION" | "RENDER_PROP";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            // eslint-disable-next-line eslint-plugin/require-meta-docs-description
            description: "reports all render props and render functions",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            RENDER_FUNCTION: "render function found, name: {{name}}",
            RENDER_PROP: "render prop found, name: {{name}}",
        },
    },
    defaultOptions: [],
    create() {
        return {
            // TODO: implement this
        };
    },
});
