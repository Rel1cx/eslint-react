import { isFunction, NodeType, traverseUpGuard, type TSESTreeFunction, unsafeIsMapCall } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/component";
import { isInsideRenderMethod } from "@eslint-react/component-legacy";
import { isInsideCreateElementProps } from "@eslint-react/create-element";
import { unsafeIsReturnStatementOfReactHook } from "@eslint-react/hooks";
import { isDeclaredInJSXAttribute, isFunctionReturningJSX } from "@eslint-react/jsx";
import { unsafeIsDeclaredInRenderProp, unsafeIsDirectValueOfRenderProperty } from "@eslint-react/render-prop";
import { createRule } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

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
        const { ctx, listeners } = componentCollector(context);

        return {
            ...listeners,
            "Program:exit"() {
                const components = ctx.getAllComponents();

                const isComponent = (node: TSESTree.Node): node is TSESTreeFunction => {
                    return isFunction(node) && components.includes(node);
                };

                for (const component of components) {
                    const isInsideProperty = component.parent.type === NodeType.Property;
                    const isInsideJSXProps = isDeclaredInJSXAttribute(component) && !unsafeIsDeclaredInRenderProp(component);
                    if (isInsideJSXProps || isInsideCreateElementProps(component, context)) {
                        // TODO: define a new messageId for this case
                        context.report({
                            messageId: "UNSTABLE_NESTED_COMPONENT_IN_PROPS",
                            node: component,
                        });

                        continue;
                    }

                    if (
                        // Prevent reporting components created inside Array.map calls
                        unsafeIsMapCall(component) || unsafeIsMapCall(component.parent)
                        // Do not mark components declared inside hooks (or falsy '() => null' clean-up methods)
                        || unsafeIsReturnStatementOfReactHook(component)
                        // Do not mark objects containing render methods
                        || unsafeIsDirectValueOfRenderProperty(component)
                        // Prevent falsely reporting detected "components" which do not return JSX
                        || !isFunctionReturningJSX(component, context, false, true)
                    ) {
                        continue;
                    }

                    const parentComponent = traverseUpGuard(component, isComponent);

                    if (parentComponent) {
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
