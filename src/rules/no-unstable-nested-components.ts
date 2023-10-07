import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../tools/create-rule";
import {
    getFunctionIdentifier,
    isFunction,
    traverseUp,
    type TSESTreeFunction,
    unsafeIsMapCall,
    unsafeIsReturnStatementOfReactHook,
} from "../utils/ast";
import * as ComponentCollector from "../utils/component-collector";
import { isComponentReturningNull } from "../utils/is-component-return-null";
import { isDeclaredInJSXAttribute } from "../utils/jsx";
import { unsafeIsDeclaredInRenderProp, unsafeIsDirectValueOfRenderProperty } from "../utils/render-prop";

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
            INVALID: "Do not define components during render. Move {{name}} outside of parent component.",
        },
    },
    defaultOptions: [],
    create(context) {
        const { ctx, listeners } = ComponentCollector.make(context);

        return {
            ...listeners,
            "Program:exit"() {
                const components = ctx.getAllComponents();

                const isComponent = (node: TSESTree.Node): node is TSESTreeFunction => {
                    return isFunction(node) && components.includes(node);
                };

                for (const component of components) {
                    const isDeclaredInsideProps = isDeclaredInJSXAttribute(component);

                    if (isDeclaredInsideProps && !unsafeIsDeclaredInRenderProp(component)) {
                        // TODO: define a new messageId for this case
                        context.report({
                            data: {
                                name: "Component",
                            },
                            messageId: "INVALID",
                            node: component,
                        });

                        continue;
                    }

                    if (
                        // Prevent reporting components created inside Array.map calls
                        unsafeIsMapCall(component)
                        || unsafeIsMapCall(component.parent)
                        // Do not mark components declared inside hooks (or falsy '() => null' clean-up methods)
                        || unsafeIsReturnStatementOfReactHook(component)
                        // Do not mark objects containing render methods
                        || unsafeIsDirectValueOfRenderProperty(component)
                        // Prevent reporting nested class components twice
                        // || isInsideRenderMethod(node)
                        // Prevent falsely reporting detected "components" which do not return JSX
                        || isComponentReturningNull(component, context)
                        // TODO: prevent duplicate reports
                    ) {
                        continue;
                    }

                    const parentComponent = traverseUp(component, isComponent);

                    if (!parentComponent) {
                        continue;
                    }

                    const parentComponentId = getFunctionIdentifier(parentComponent);

                    const parentComponentName = parentComponentId?.name ?? "Component";

                    context.report({
                        data: {
                            name: parentComponentName,
                        },
                        messageId: "INVALID",
                        node: component,
                    });
                }
            },
        };
    },
});
