import { NodeType } from "@eslint-react/ast";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

import { createRule } from "../../utils";

export const RULE_NAME = "jsx/no-script-url";

type MessageID = "INVALID";

// @see https://github.com/facebook/react/blob/6db7f4209e6f32ebde298a0b7451710dd6aa3e19/packages/react-dom-bindings/src/shared/sanitizeURL.js#L22
// dprint-ignore
// eslint-disable-next-line no-control-regex
const isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\t\n\r]*a[\t\n\r]*v[\t\n\r]*a[\t\n\r]*s[\t\n\r]*c[\t\n\r]*r[\t\n\r]*i[\t\n\r]*p[\t\n\r]*t[\t\n\r]*:/iu;

/**
 * This rule is adapted from eslint-plugin-solid's jsx-no-script-url rule under the MIT license.
 * Thank you for your work!
 */
export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow `javascript:` URLs as JSX event handler prop's value",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID: "",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            JSXAttribute(node) {
                if (node.name.type !== NodeType.JSXIdentifier || !node.value) {
                    return;
                }
                const link = getStaticValue(
                    node.value.type === NodeType.JSXExpressionContainer
                        ? node.value.expression
                        : node.value,
                    context.getScope(),
                );
                if (link && typeof link.value === "string" && isJavaScriptProtocol.test(link.value)) {
                    context.report({
                        node: node.value,
                        messageId: "INVALID",
                    });
                }
            },
        };
    },
});
