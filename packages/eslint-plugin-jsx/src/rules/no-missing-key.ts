import { getNestedReturnStatements, is, isOneOf, NodeType, unsafeIsArrayFromCall, unsafeIsMapCall } from "@eslint-react/ast";
import { hasProp } from "@eslint-react/jsx";
import { getFragmentFromContext, getPragmaFromContext } from "@eslint-react/pragma";
import { createRule, getChildrenToArraySelector } from "@eslint-react/shared";
import { E, MutRef, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { match } from "ts-pattern";

export const RULE_NAME = "jsx/no-missing-key";

type MessageID = "INVALID" | "INVALID_FRAGMENT";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "require `key` prop when rendering list",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID: "Missing `key` prop for element when rendering list",
            INVALID_FRAGMENT:
                "Missing `key` prop for element when rendering list. Use `{{reactPragma}}.{{fragmentPragma}}` component instead of `<>` because it does not support key prop",
        },
    },
    defaultOptions: [],
    // eslint-disable-next-line sonarjs/cognitive-complexity
    create(context) {
        const maybeReactPragma = getPragmaFromContext(context);
        if (E.isLeft(maybeReactPragma)) {
            console.error(maybeReactPragma.left);

            return {};
        }
        const maybeFragmentPragma = getFragmentFromContext(context);
        if (E.isLeft(maybeFragmentPragma)) {
            console.error(maybeFragmentPragma.left);

            return {};
        }
        const reactPragma = maybeReactPragma.right;
        const fragmentPragma = maybeFragmentPragma.right;
        const childrenToArraySelector = getChildrenToArraySelector(reactPragma);
        const isWithinChildrenToArrayRef = MutRef.make(false);
        function checkIteratorElement(node: TSESTree.Node): O.Option<ReportDescriptor<MessageID>> {
            if (node.type === NodeType.JSXElement && !hasProp(node.openingElement.attributes, "key", context)) {
                return O.some({
                    messageId: "INVALID",
                    node,
                });
            }
            if (node.type === NodeType.JSXFragment) {
                return O.some({
                    data: {
                        fragmentPragma,
                        reactPragma,
                    },
                    messageId: "INVALID_FRAGMENT",
                    node,
                });
            }

            return O.none();
        }

        function checkExpression(node: TSESTree.Expression): O.Option<ReportDescriptor<MessageID>> {
            return match(node)
                .with({ type: NodeType.JSXElement }, checkIteratorElement)
                .with({ type: NodeType.JSXFragment }, checkIteratorElement)
                .with({ type: NodeType.ConditionalExpression }, (n) => {
                    if (!("consequent" in n)) {
                        return O.none();
                    }

                    return O.orElse(checkIteratorElement(n.consequent), () => checkIteratorElement(n.alternate));
                })
                .with({ type: NodeType.LogicalExpression }, (n) => {
                    if (!("left" in n)) {
                        return O.none();
                    }

                    return O.orElse(checkIteratorElement(n.left), () => checkIteratorElement(n.right));
                })
                .otherwise(O.none);
        }

        function checkBlockStatement(node: TSESTree.BlockStatement) {
            return getNestedReturnStatements(node)
                .reduce<ReportDescriptor<MessageID>[]>((acc, statement) => {
                    if (!statement.argument) {
                        return acc;
                    }
                    const maybeDescriptor = checkIteratorElement(statement.argument);
                    if (O.isNone(maybeDescriptor)) {
                        return acc;
                    }
                    const descriptor = maybeDescriptor.value;

                    return [...acc, descriptor];
                }, []);
        }

        return {
            [`${childrenToArraySelector}:exit`]() {
                MutRef.set(isWithinChildrenToArrayRef, false);
            },
            ArrayExpression(node) {
                if (MutRef.get(isWithinChildrenToArrayRef)) {
                    return;
                }
                const elements = node.elements.filter(is(NodeType.JSXElement));
                if (elements.length === 0) {
                    return;
                }
                for (const element of elements) {
                    if (!hasProp(element.openingElement.attributes, "key", context)) {
                        context.report({
                            messageId: "INVALID",
                            node: element,
                        });
                    }
                }
            },
            CallExpression(node) {
                const isMapCall = unsafeIsMapCall(node);
                const isArrayFromCall = unsafeIsArrayFromCall(node);
                if (!isMapCall && !isArrayFromCall) {
                    return;
                }
                if (MutRef.get(isWithinChildrenToArrayRef)) {
                    return;
                }
                const fn = node.arguments[isMapCall ? 0 : 1];
                if (!isOneOf([NodeType.ArrowFunctionExpression, NodeType.FunctionExpression])(fn)) {
                    return;
                }
                if (fn.body.type === NodeType.BlockStatement) {
                    for (const descriptor of checkBlockStatement(fn.body)) {
                        context.report(descriptor);
                    }

                    return;
                }
                O.map(checkExpression(fn.body), context.report);
            },
            JSXFragment(node) {
                if (MutRef.get(isWithinChildrenToArrayRef)) {
                    return;
                }
                if (node.parent.type === NodeType.ArrayExpression) {
                    context.report({
                        data: {
                            fragmentPragma,
                            reactPragma,
                        },
                        messageId: "INVALID_FRAGMENT",
                        node,
                    });
                }
            },
            [childrenToArraySelector]() {
                MutRef.set(isWithinChildrenToArrayRef, true);
            },
        };
    },
});
