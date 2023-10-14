import { isFunction, NodeType, traverseUpGuard, type TSESTreeFunction } from "@eslint-react/ast";
import { componentCollector, isInsideRenderMethod } from "@eslint-react/component";
import { isInsideCreateElementProps } from "@eslint-react/create-element";
import { unsafeIsInsideReactHookCall } from "@eslint-react/hooks";
import { isInsideJSXAttribute } from "@eslint-react/jsx";
import { unsafeIsDeclaredInRenderProp, unsafeIsDirectValueOfRenderProperty } from "@eslint-react/render-prop";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils/create-rule";

export const RULE_NAME = "no-unstable-nested-components";

type MessageID = "UNSTABLE_NESTED_COMPONENT" | "UNSTABLE_NESTED_COMPONENT_IN_PROPS";

// TODO: add more details to the report messages and data
export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow usage of unstable nested components",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            UNSTABLE_NESTED_COMPONENT: "Don't create components inside other components. better move it outside.",
            UNSTABLE_NESTED_COMPONENT_IN_PROPS:
                "Don't create components inside other components' props. better move it outside.",
        },
    },
    defaultOptions: [],
    create(context) {
        const { ctx, listeners } = componentCollector(context, { ignoreMapCall: true, ignoreNull: true, strict: true });

        return {
            ...listeners,
            "Program:exit"() {
                const components = ctx.getAllComponents();

                const isComponent = (node: TSESTree.Node): node is TSESTreeFunction => {
                    return isFunction(node) && components.includes(node);
                };

                for (const component of components) {
                    const isInsideProperty = component.parent.type === NodeType.Property;
                    const isInsideJSXProps = isInsideJSXAttribute(component);

                    if (isInsideJSXProps) {
                        if (!unsafeIsDeclaredInRenderProp(component)) {
                            context.report({
                                messageId: "UNSTABLE_NESTED_COMPONENT_IN_PROPS",
                                node: component,
                            });
                        }

                        continue;
                    }

                    if (
                        // Do not mark components declared inside hooks (or falsy '() => null' clean-up methods)
                        unsafeIsInsideReactHookCall(component)
                        // Do not mark objects containing render methods
                        || unsafeIsDirectValueOfRenderProperty(component)
                    ) {
                        continue;
                    }

                    if (isInsideCreateElementProps(component, context)) {
                        context.report({
                            messageId: "UNSTABLE_NESTED_COMPONENT_IN_PROPS",
                            node: component,
                        });

                        continue;
                    }

                    const parentComponent = traverseUpGuard(component, isComponent);

                    if (parentComponent && !unsafeIsDirectValueOfRenderProperty(parentComponent)) {
                        context.report({
                            messageId: isInsideProperty ? "UNSTABLE_NESTED_COMPONENT_IN_PROPS" : "UNSTABLE_NESTED_COMPONENT",
                            node: component,
                        });

                        continue;
                    }

                    const isInsideClassComponentRenderMethod = isInsideRenderMethod(component, context);

                    if (isInsideClassComponentRenderMethod) {
                        context.report({
                            messageId: "UNSTABLE_NESTED_COMPONENT",
                            node: component,
                        });
                    }
                }
            },
        };
    },
});
