import { createEslintRule } from "../../../tools/create-eslint-rule";
import { AST } from "../../utils/ast";
import * as ComponentCollector from "../../utils/component-collector";
import { isComponentName } from "../../utils/is-component-name";

export const RULE_NAME = "debug/function-component";

type MessageID = "FUNCTION_COMPONENT" | "POSSIBLE_FUNCTION_COMPONENT";

export default createEslintRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            // eslint-disable-next-line eslint-plugin/require-meta-docs-description
            description: "reports all function components, including anonymous ones",
        },
        schema: [],
        messages: {
            FUNCTION_COMPONENT: "function component found, name: {{name}}",
            // eslint-disable-next-line eslint-plugin/no-unused-message-ids
            POSSIBLE_FUNCTION_COMPONENT: "possible function component found based on usage, name: {{name}}",
        },
    },
    defaultOptions: [],
    create(context) {
        const { ctx, listeners } = ComponentCollector.make(context);

        return {
            ...listeners,
            "Program:exit"() {
                const components = ctx.getAllComponents();

                for (const component of components) {
                    const maybeName = component.id?.name;
                    if (maybeName && !isComponentName(maybeName)) {
                        continue;
                    }

                    const maybeId = AST.getReactComponentIdentifier(component);

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
