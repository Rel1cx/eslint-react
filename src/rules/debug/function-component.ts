import { createEslintRule } from "../../../tools/create-eslint-rule";
import { MutRef } from "../../lib/primitives";
import { AST } from "../../utils/ast";
import * as ComponentCollector from "../../utils/component-collector";
import { isComponentName } from "../../utils/is-component-name";

export const RULE_NAME = "debug/function-component";

type MessageID = "FUNCTION_COMPONENT" | "FUNCTION_COMPONENT_ANONYMOUS";

const count = MutRef.make(0);

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

            FUNCTION_COMPONENT_ANONYMOUS: "anonymous function component found, id: {{id}}",
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

                    const name = maybeName ?? maybeId?.name;
                    if (!name) {
                        context.report({
                            data: {
                                id: MutRef.incrementAndGet(count),
                            },
                            messageId: "FUNCTION_COMPONENT_ANONYMOUS",
                            node: component,
                        });
                        continue;
                    }

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
