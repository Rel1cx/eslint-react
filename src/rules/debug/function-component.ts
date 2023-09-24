import { createEslintRule } from "../../../tools/create-eslint-rule";
import { F, MutRef, O } from "../../lib/primitives";
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
        const collector = ComponentCollector.make(context);

        return {
            ...collector.listeners,
            "Program:exit"() {
                const components = collector.getComponents();

                for (const component of components) {
                    const maybeName = F.pipe(
                        O.fromNullable(component.id || ("id" in component.parent ? component.parent.id : null)),
                        O.flatMapNullable((id) => "name" in id ? id.name : null),
                    );

                    if (O.isSome(maybeName) && !isComponentName(maybeName.value)) {
                        continue;
                    }

                    if (O.isNone(maybeName)) {
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
                            name: maybeName.value,
                        },
                        messageId: "FUNCTION_COMPONENT",
                        node: component,
                    });
                }
            },
        };
    },
});
