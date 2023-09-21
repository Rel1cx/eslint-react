import { createEslintRule } from "../../tools/create-eslint-rule";
import { MutRef, O } from "../lib/primitives/data";
import * as ComponentCollector from "../utils/component-collector";
import { isComponentName } from "../utils/is-component-name";

const RULE_NAME = "debug-function-component";

type MessageID = "FUNCTION_COMPONENT" | "POSSIBLE_FUNCTION_COMPONENT";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

const count = MutRef.make(0);

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            // eslint-disable-next-line eslint-plugin/require-meta-docs-description
            description: "debug report all function components",
        },
        schema: [],
        messages: {
            FUNCTION_COMPONENT: "function component found ({{count}})",
            // eslint-disable-next-line eslint-plugin/no-unused-message-ids
            POSSIBLE_FUNCTION_COMPONENT: "possible function component found ({{count}})",
        },
    },
    defaultOptions,
    create(context) {
        const collector = ComponentCollector.make(context);

        return {
            ...collector.listeners,
            "Program:exit"() {
                const components = collector.getComponents();

                for (const component of components) {
                    const maybeName = O.fromNullable(component.id?.name);

                    if (O.isSome(maybeName) && !isComponentName(maybeName.value)) {
                        return;
                    }

                    context.report({
                        data: {
                            count: MutRef.incrementAndGet(count),
                        },
                        messageId: "FUNCTION_COMPONENT",
                        node: component,
                    });
                }
            },
        };
    },
});
