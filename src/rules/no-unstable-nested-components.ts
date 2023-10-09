import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../tools/create-rule";
import { traverseUpGuard } from "../utils/ast-traverse";
import { isFunction, type TSESTreeFunction } from "../utils/ast-types";
import * as ComponentCollector from "../utils/component-collector";
import { isInsideRenderMethod } from "../utils/component-detector-legacy";
import { isInsideCreateElementProps } from "../utils/is-inside-create-element-props";
import { isDeclaredInJSXAttribute, isFunctionReturningJSX } from "../utils/jsx";
import { unsafeIsMapCall } from "../utils/misc";
import { unsafeIsReturnStatementOfReactHook } from "../utils/react-hook";
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
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID: "Do not define components during render. Move it outside of the parent component.",
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
                        unsafeIsMapCall(component)
                        || unsafeIsMapCall(component.parent)
                        // Do not mark components declared inside hooks (or falsy '() => null' clean-up methods)
                        || unsafeIsReturnStatementOfReactHook(component)
                        // Do not mark objects containing render methods
                        || unsafeIsDirectValueOfRenderProperty(component)
                        // Prevent reporting nested class components twice
                        // || isInsideRenderMethod(component, context)
                        // Prevent falsely reporting detected "components" which do not return JSX
                        || !isFunctionReturningJSX(component, context, false, true)
                        // TODO: prevent duplicate reports
                    ) {
                        continue;
                    }

                    const parentComponent = traverseUpGuard(component, isComponent);

                    if (parentComponent) {
                        // const parentComponentId = getFunctionIdentifier(parentComponent);

                        // const parentComponentName = parentComponentId?.name ?? "Component";

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
