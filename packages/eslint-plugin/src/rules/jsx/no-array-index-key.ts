import { isOneOf, NodeType, unsafeIsStringCall, unsafeIsToStringCall } from "@eslint-react/ast";
import { isCreateElement } from "@eslint-react/create-element";
import { getPragmaFromContext } from "@eslint-react/pragma";
import { E, O, Record } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching } from "ts-pattern";

import { createRule } from "../../utils";
import { isCloneElement } from "../../utils/is-clone-element";

export const RULE_NAME = "jsx/no-array-index-key";

type MessageID = "INVALID";

const reactChildrenMethod = ["forEach", "map"] as const;

function isReactChildrenMethod(name: string): name is typeof reactChildrenMethod[number] {
    return reactChildrenMethod.some((method) => method === name);
}

const iteratorFunctionIndexParamPosition = {
    every: 1,
    filter: 1,
    find: 1,
    findIndex: 1,
    findLast: 1,
    findLastIndex: 1,
    flatMap: 1,
    forEach: 1,
    map: 1,
    reduce: 2,
    reduceRight: 2,
    some: 1,
} as const;

function isUsingReactChildren(node: TSESTree.CallExpression, context: RuleContext) {
    const { callee } = node;
    if (!("property" in callee) || !("object" in callee) || !("name" in callee.property)) {
        return null;
    }
    if (!isReactChildrenMethod(callee.property.name)) {
        return null;
    }
    const obj = callee.object;
    if ("name" in obj && obj.name === "Children") {
        return true;
    }
    const maybePragma = getPragmaFromContext(context);
    if (E.isLeft(maybePragma)) {
        return null;
    }

    return isMatching({ object: { name: maybePragma.right } }, obj);
}

function getMapIndexParamName(node: TSESTree.CallExpression, context: RuleContext) {
    const { callee } = node;
    if (callee.type !== NodeType.MemberExpression) {
        return O.none();
    }

    if (callee.property.type !== NodeType.Identifier) {
        return O.none();
    }

    const { name } = callee.property;
    if (!Record.has(iteratorFunctionIndexParamPosition, name)) {
        return O.none();
    }

    const callbackArg = node.arguments[isUsingReactChildren(node, context) ? 1 : 0];
    if (!callbackArg) {
        return O.none();
    }

    if (!isOneOf([NodeType.ArrowFunctionExpression, NodeType.FunctionExpression])(callbackArg)) {
        return O.none();
    }

    const { params } = callbackArg;
    const maybeIndexParamPosition = Record.get(iteratorFunctionIndexParamPosition, name);
    if (O.isNone(maybeIndexParamPosition)) {
        return O.none();
    }

    const indexParamPosition = maybeIndexParamPosition.value;
    if (params.length < indexParamPosition + 1) {
        return O.none();
    }

    const param = params.at(indexParamPosition);

    return param && "name" in param ? O.some(param.name) : O.none();
}

function getIdentifiersFromBinaryExpression(side: TSESTree.Node): TSESTree.Identifier[] {
    if (side.type === NodeType.Identifier) {
        return [side];
    }

    if (side.type === NodeType.BinaryExpression) {
        return [
            ...getIdentifiersFromBinaryExpression(side.left),
            ...getIdentifiersFromBinaryExpression(side.right),
        ].filter(Boolean);
    }

    return [];
}

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow using Array index as key",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID: "Do not use Array index as key",
        },
    },
    defaultOptions: [],
    create(context) {
        const indexParamNames: string[] = [];

        function pushIndexParamName(node: TSESTree.CallExpression) {
            O.map(getMapIndexParamName(node, context), (name) => indexParamNames.push(name));
        }

        function popIndexParamName(node: TSESTree.CallExpression) {
            O.map(getMapIndexParamName(node, context), () => indexParamNames.pop());
        }

        function isArrayIndex(node: TSESTree.Node): node is TSESTree.Identifier {
            return node.type === NodeType.Identifier && indexParamNames.some((name) => name === node.name);
        }

        function checkPropValue(node: TSESTree.Node): ReportDescriptor<MessageID>[] {
            // key={bar}
            if (isArrayIndex(node)) {
                return [{ messageId: "INVALID", node }];
            }
            // key={`foo-${bar}`} or key={'foo' + bar}
            if (isOneOf([NodeType.TemplateLiteral, NodeType.BinaryExpression])(node)) {
                const exps = NodeType.TemplateLiteral === node.type
                    ? node.expressions
                    : getIdentifiersFromBinaryExpression(node);

                return exps.reduce<ReportDescriptor<MessageID>[]>((acc, exp) => {
                    if (isArrayIndex(exp)) {
                        return [...acc, { messageId: "INVALID", node: exp }];
                    }

                    return acc;
                }, []);
            }
            // key={bar.toString()}
            if (unsafeIsToStringCall(node)) {
                if (!("object" in node.callee && isArrayIndex(node.callee.object))) {
                    return [];
                }

                return [{ messageId: "INVALID", node: node.callee.object }];
            }
            // key={String(bar)}
            if (unsafeIsStringCall(node)) {
                const [arg] = node.arguments;
                if (arg && isArrayIndex(arg)) {
                    return [{ messageId: "INVALID", node: arg }];
                }
            }

            return [];
        }

        return {
            CallExpression(node) {
                if ((isCreateElement(node, context) || isCloneElement(node, context)) && node.arguments.length > 1) {
                    if (indexParamNames.length === 0) {
                        return;
                    }

                    const props = node.arguments[1];
                    if (props?.type !== NodeType.ObjectExpression) {
                        return;
                    }

                    for (const prop of props.properties) {
                        if (!isMatching({ key: { name: "key" } }, prop)) {
                            continue;
                        }

                        if (!("value" in prop)) {
                            continue;
                        }

                        const descriptors = checkPropValue(prop.value);
                        for (const descriptor of descriptors) {
                            context.report(descriptor);
                        }
                    }
                }

                pushIndexParamName(node);
            },
            JSXAttribute(node) {
                if (node.name.name !== "key") {
                    return;
                }

                if (indexParamNames.length === 0) {
                    return;
                }

                const { value } = node;
                if (value?.type !== NodeType.JSXExpressionContainer) {
                    return;
                }

                const descriptors = checkPropValue(value.expression);
                for (const descriptor of descriptors) {
                    context.report(descriptor);
                }
            },
            "CallExpression:exit": popIndexParamName,
        };
    },
});
