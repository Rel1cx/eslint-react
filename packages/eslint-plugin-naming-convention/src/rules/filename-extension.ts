import { createRule, isJSXFile } from "@eslint-react/shared";
import { MutRef, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

export const RULE_NAME = "naming-convention/filename-extension";

type MessageID = "INVALID" | "UNEXPECTED";

type Options = readonly [
    {
        rule?: "always" | "as-needed";
    }?,
];

const defaultOptions = [
    {
        rule: "always",
    },
] as const satisfies Options;

const schema = [
    {
        type: "object",
        additionalProperties: false,
        properties: {
            rule: {
                type: "string",
                default: "always",
                enum: ["always", "as-needed"],
            },
        },
    },
] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforces naming convention for JSX file extensions",
            requiresTypeChecking: false,
        },
        schema,
        messages: {
            INVALID: "JSX files must have a `.jsx` or `.tsx` extension",
            UNEXPECTED: "use `.jsx` or `.tsx` extension as needed",
        },
    },
    defaultOptions,
    create(context) {
        const rule = context.options[0]?.rule ?? "always";
        const filename = context.getFilename();
        const jsxNodeRef = MutRef.make<O.Option<TSESTree.JSXElement | TSESTree.JSXFragment>>(O.none());

        return {
            JSXElement(node) {
                MutRef.set(jsxNodeRef, O.some(node));
            },
            JSXFragment(node) {
                MutRef.set(jsxNodeRef, O.some(node));
            },
            "Program:exit"(node) {
                const fileNameExt = filename.slice(filename.lastIndexOf("."));

                if (O.isSome(MutRef.get(jsxNodeRef))) {
                    if (!isJSXFile(fileNameExt)) {
                        context.report({
                            messageId: "INVALID",
                            node,
                        });
                    }

                    return;
                }

                if (rule === "as-needed" && isJSXFile(fileNameExt)) {
                    context.report({
                        messageId: "UNEXPECTED",
                        node,
                    });
                }
            },
        };
    },
});
