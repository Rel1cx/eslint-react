import type { TSESTree } from "@typescript-eslint/utils";
import type { ReadonlyDeep } from "type-fest";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { O } from "../lib/primitives/data";

type MessageIds = "misuseOfJsxExtension";

type Options = ReadonlyDeep<[]>;

const defaultOptions = [] as const satisfies Options;

export default createEslintRule<Options, MessageIds>({
    name: "jsx-filename-no-misuse-jsx",
    meta: {
        type: "suggestion",
        docs: {
            description: "enforce using `.ts` instead of `.tsx` extension when there is no JSX in the file",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            misuseOfJsxExtension: "Potential misuse of the `.tsx` extension. Use `.ts` instead.",
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
                        messageId: "misuseOfJsxExtension",
                        node,
                    });
                }
            },
        };
    },
    defaultOptions,
});
