import type { TSESTree } from "@typescript-eslint/utils";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";
import { O } from "../lib/primitives/data";

const RULE_NAME: RuleName = "no-misused-jsx-extension";

type MessageIds = "MISUSED_JSX_EXTENSION";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce using `.ts` instead of `.tsx` extension when there is no JSX in the file",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            MISUSED_JSX_EXTENSION: "Potential misuse of the `.tsx` extension. Use `.ts` instead.",
        },
    },
    create(context) {
        const filename = context.getFilename();

        const jsxNodeRef = {
            current: O.none<TSESTree.JSXElement | TSESTree.JSXFragment>(),
        };

        return {
            JSXElement(node) {
                jsxNodeRef.current = O.some(node);
            },
            JSXFragment(node) {
                jsxNodeRef.current = O.some(node);
            },
            "Program:exit"(node) {
                const fileNameExt = filename.slice(filename.lastIndexOf("."));

                if (fileNameExt === ".tsx" && O.isNone(jsxNodeRef.current)) {
                    return context.report({
                        messageId: "MISUSED_JSX_EXTENSION",
                        node,
                    });
                }
            },
        };
    },
    defaultOptions,
});
