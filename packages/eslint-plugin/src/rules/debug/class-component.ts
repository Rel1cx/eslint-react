import { getClassIdentifier } from "@eslint-react/ast";
import { componentCollectorLegacy } from "@eslint-react/component-legacy";
import { createRule } from "@eslint-react/shared";
import type { ESLintUtils } from "@typescript-eslint/utils";

export const RULE_NAME = "debug/class-component";

type MessageID = "CLASS_COMPONENT";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            // eslint-disable-next-line eslint-plugin/require-meta-docs-description
            description: "reports all class components, including anonymous ones",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            CLASS_COMPONENT: "class component found, name: {{name}}",
        },
    },
    defaultOptions: [],
    create(context) {
        const { ctx, listeners } = componentCollectorLegacy(context);

        return {
            ...listeners,
            "Program:exit"() {
                const components = ctx.getAllComponents();

                for (const component of components) {
                    const maybeName = component.id?.name;
                    const maybeId = getClassIdentifier(component);
                    const name = maybeName ?? maybeId?.name ?? "anonymous";

                    context.report({
                        data: {
                            name,
                        },
                        messageId: "CLASS_COMPONENT",
                        node: component,
                    });
                }
            },
        };
    },
});
