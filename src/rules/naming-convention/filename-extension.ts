import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../../tools/create-rule";
import { MutRef, O } from "../../lib/primitives";
import { isJSXFileExt } from "../../utils/jsx";

export const RULE_NAME = "naming-convention/filename-extension";

type MessageID = "INVALID";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce using `.ts` instead of `.tsx` extension when there is no JSX in the file",
        },
        schema: [],
        messages: {
            INVALID: "Potential misuse of the `.tsx` extension. Use `.ts` instead.",
        },
    },
    defaultOptions: [],
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

                if (isJSXFileExt(fileNameExt) && O.isNone(MutRef.get(jsxNodeRef))) {
                    return context.report({
                        messageId: "INVALID",
                        node,
                    });
                }
            },
        };
    },
});
