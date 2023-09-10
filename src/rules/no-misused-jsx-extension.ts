import type { TSESTree } from "@typescript-eslint/utils";

import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";
import { MutRef, O } from "../lib/primitives/data";
import { Enum } from "../lib/primitives/enum";

const RULE_NAME: RuleName = "no-misused-jsx-extension";

const MessageID = Enum("MISUSED_JSX_EXTENSION");

type MessageID = Enum<typeof MessageID>;

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

export default createEslintRule<Options, MessageID>({
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

                if (fileNameExt === ".tsx" && O.isNone(MutRef.get(jsxNodeRef))) {
                    return context.report({
                        messageId: MessageID.MISUSED_JSX_EXTENSION,
                        node,
                    });
                }
            },
        };
    },
    defaultOptions,
});
