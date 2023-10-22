import { NodeType } from "@eslint-react/ast";
import { getPropNameWithNamespace } from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { isString } from "effect/Predicate";

import { createRule } from "../../utils";

export const RULE_NAME = "jsx/no-script-url";

type MessageID = "INVALID";

type ConfigItem = {
    name: string;
    props: string[];
};

type Options = readonly [ConfigItem[]?];

const defaultOptions = [[
    {
        name: "a",
        props: ["href"],
    },
]] satisfies Options;

const schema = [{
    type: "array",
    uniqueItems: true,
    items: {
        type: "object",
        properties: {
            name: {
                type: "string",
            },
            props: {
                type: "array",
                uniqueItems: true,
                items: {
                    type: "string",
                },
            },
        },
        required: ["name", "props"],
        additionalProperties: false,
    },
}] as [JSONSchema4];

// @see https://github.com/facebook/react/blob/6db7f4209e6f32ebde298a0b7451710dd6aa3e19/packages/react-dom-bindings/src/shared/sanitizeURL.js#L22
// dprint-ignore
// eslint-disable-next-line no-control-regex
const isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\t\n\r]*a[\t\n\r]*v[\t\n\r]*a[\t\n\r]*s[\t\n\r]*c[\t\n\r]*r[\t\n\r]*i[\t\n\r]*p[\t\n\r]*t[\t\n\r]*:/iu;

function hasJavaScriptProtocol(attr: TSESTree.JSXAttribute) {
    return "value" in attr
        && attr.value?.type === NodeType.Literal
        && isString(attr.value.value)
        && isJavaScriptProtocol.test(attr.value.value);
}

function shouldVerifyElement(
    node: TSESTree.JSXOpeningElement,
    config: ConfigItem[],
): node is TSESTree.JSXOpeningElement & { name: TSESTree.JSXIdentifier } {
    if (!("name" in node && node.name.type === NodeType.JSXIdentifier)) {
        return false;
    }
    const { name } = node.name;

    return config.some((i) => i.name === name);
}

function shouldVerifyProp(node: TSESTree.JSXAttribute, config: ConfigItem[]) {
    if (!(node.parent.type === NodeType.JSXOpeningElement && shouldVerifyElement(node.parent, config))) {
        return false;
    }
    const parentName = node.parent.name.name;
    const name = getPropNameWithNamespace(node);
    const props = config.find((i) => i.name === parentName)?.props ?? [];

    return props.includes(name);
}

export default createRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow `javascript:` URLs as JSX event handler prop's value",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema,
        messages: {
            INVALID: "",
        },
    },
    defaultOptions,
    create(context) {
        const options = context.options[0] ?? defaultOptions[0];

        return {
            JSXAttribute(node) {
                if (node.parent.type !== NodeType.JSXOpeningElement) {
                    return;
                }

                if (!shouldVerifyProp(node, options) || !hasJavaScriptProtocol(node)) {
                    return;
                }

                context.report({
                    node,
                    messageId: "INVALID",
                });
            },
        };
    },
});
