import { createRule } from "../../tools/create-rule";
import * as ComponentCollector from "../utils/component-collector";

export const RULE_NAME = "no-unstable-nested-components";

type MessageID = "INVALID";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow usage of unstable nested components",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            INVALID: "",
        },
    },
    defaultOptions: [],
    create(context) {
        const { ctx, listeners } = ComponentCollector.make(context);

        return {
            ...listeners,
            "Program:exit"() {
                const components = ctx.getAllComponents();

                for (const _ of components) {
                    // TODO: implement this
                }
            },
        };
    },
});
