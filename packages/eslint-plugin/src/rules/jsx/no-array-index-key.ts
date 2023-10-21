import { NodeType } from "@eslint-react/ast";
import { isCreateElement } from "@eslint-react/create-element";
import { MutList } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { isMatching } from "ts-pattern";

import { createRule } from "../../utils";
import { isCloneElement } from "../../utils/is-clone-element";

export const RULE_NAME = "jsx/no-array-index-key";

type MessageID = "INVALID";

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
        const indexParamNameStack = MutList.empty<string>();
        const popIndexParamName = () => MutList.pop(indexParamNameStack);

        return {
            CallExpression(node) {
                if (!isCreateElement(node, context) || !isCloneElement(node, context) || node.arguments.length < 2) {
                    const mapIndexParamName = "";
                    MutList.append(indexParamNameStack, mapIndexParamName);

                    return;
                }
                if (MutList.isEmpty(indexParamNameStack)) {
                    return;
                }
                const props = node.arguments[1];
                if (props?.type !== NodeType.ObjectExpression) {
                    return;
                }

                for (const prop of props.properties) {
                    if (!isMatching({ key: { name: "key" } })(prop)) {
                        continue;
                    }
                    if (!("value" in prop)) {
                        continue;
                    }
                    checkPropValue(prop.value);
                }
            },
            JSXAttribute(node) {
                if (node.name.name !== "key") {
                    return;
                }
                if (MutList.isEmpty(indexParamNameStack)) {
                    return;
                }
                const { value } = node;
                if (value?.type !== NodeType.JSXExpressionContainer) {
                    return;
                }
                checkPropValue(value.expression);
            },
            "CallExpression:exit": popIndexParamName,
            "OptionalCallExpression:exit": popIndexParamName,
        };
    },
});

// TODO: implement this
function checkPropValue(value: unknown) {
    throw new Error("Function not implemented.");
}
