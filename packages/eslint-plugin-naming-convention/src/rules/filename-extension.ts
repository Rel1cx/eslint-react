import { MutRef, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createRule, isJSXFile } from "../utils";

export const RULE_NAME = "filename-extension";

export type MessageID = "FILE_NAME_EXTENSION_INVALID" | "FILE_NAME_EXTENSION_UNEXPECTED";

type Cond = "always" | "as-needed";

type Options = readonly [Cond?];

const defaultOptions = ["always"] as const satisfies Options;

const schema = [
  {
    anyOf: [
      {
        type: "string",
        enum: ["always", "as-needed"],
      },
    ],
  },
] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce naming convention for JSX file extensions",
      requiresTypeChecking: false,
    },
    schema,
    messages: {
      FILE_NAME_EXTENSION_INVALID: "JSX files must have a `.jsx` or `.tsx` extension",
      FILE_NAME_EXTENSION_UNEXPECTED: "use `.jsx` or `.tsx` extension as needed",
    },
  },
  defaultOptions,
  create(context) {
    const cond = context.options[0] ?? defaultOptions[0];
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
              messageId: "FILE_NAME_EXTENSION_INVALID",
              node,
            });
          }

          return;
        }

        if (cond === "as-needed" && isJSXFile(fileNameExt)) {
          context.report({
            messageId: "FILE_NAME_EXTENSION_UNEXPECTED",
            node,
          });
        }
      },
    };
  },
});
