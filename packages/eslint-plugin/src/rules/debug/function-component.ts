import { getFunctionIdentifier } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/component";
import { createRule } from "@eslint-react/shared";

export const RULE_NAME = "debug/function-component";

type MessageID = "FUNCTION_COMPONENT" | "POSSIBLE_FUNCTION_COMPONENT";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            // eslint-disable-next-line eslint-plugin/require-meta-docs-description
            description: "reports all function components, including anonymous ones",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            FUNCTION_COMPONENT: "function component found, name: {{name}}",
            // TODO: implement this
            // eslint-disable-next-line eslint-plugin/no-unused-message-ids
            POSSIBLE_FUNCTION_COMPONENT: "possible function component found based on usage, name: {{name}}",
        },
    },
    defaultOptions: [],
    create(context) {
        const { ctx, listeners } = componentCollector(context);

        return {
            ...listeners,
            "Program:exit"() {
                const components = ctx.getAllComponents();

                for (const component of components) {
                    const maybeName = component.id?.name;
                    const maybeId = getFunctionIdentifier(component);
                    const name = maybeName ?? maybeId?.name ?? "anonymous";

                    context.report({
                        data: {
                            name,
                        },
                        messageId: "FUNCTION_COMPONENT",
                        node: component,
                    });
                }
            },
        };
    },
});
