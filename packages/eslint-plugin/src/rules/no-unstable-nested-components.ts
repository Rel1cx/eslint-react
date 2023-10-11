import { isFunction, traverseUpGuard, type TSESTreeFunction, unsafeIsMapCall } from "@eslint-react/ast";
import { componentCollector } from "@eslint-react/component";
import { isInsideRenderMethod } from "@eslint-react/component-legacy";
import { isInsideCreateElementProps } from "@eslint-react/create-element";
import { unsafeIsReturnStatementOfReactHook } from "@eslint-react/hooks";
import { isDeclaredInJSXAttribute, isFunctionReturningJSX } from "@eslint-react/jsx";
import { unsafeIsDeclaredInRenderProp, unsafeIsDirectValueOfRenderProperty } from "@eslint-react/render-prop";
import { createRule } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-unstable-nested-components";

type MessageID = "INVALID";

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
            INVALID: "Do not define components during render. Move it outside of the parent component.",
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
                    const isInsideJSXProps = isDeclaredInJSXAttribute(component) && !unsafeIsDeclaredInRenderProp(component);
                    if (isInsideJSXProps || isInsideCreateElementProps(component, context)) {
                        // TODO: define a new messageId for this case
                        context.report({
                            messageId: "INVALID",
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
                            messageId: "INVALID",
                            node: component,
                        });

                        continue;
                    }

                    const isInsideClassComponentRenderMethod = isInsideRenderMethod(component, context);

                    if (isInsideClassComponentRenderMethod) {
                        context.report({
                            messageId: "INVALID",
                            node: component,
                        });
                    }
                }
            },
        };
    },
});
