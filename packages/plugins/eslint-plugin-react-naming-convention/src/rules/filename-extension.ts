import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { MutableRef as MutRef, Predicate as Prd } from "effect";

import { createRule } from "../utils";

export const RULE_NAME = "filename-extension";

export type MessageID =
  | "FILE_NAME_EXTENSION_INVALID"
  | "FILE_NAME_EXTENSION_UNEXPECTED";

type Allow = "always" | "as-needed";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  | {
    allow?: Allow;
    extensions?: readonly string[];
    // Reserved for future use
    // excepts?: readonly string[];
  }
  | Allow
  | undefined,
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [{
  allow: "as-needed",
  extensions: [".jsx", ".tsx"],
}] as const satisfies Options;

const schema = [
  {
    anyOf: [
      {
        type: "string",
        enum: ["always", "as-needed"],
      },
      {
        type: "object",
        additionalProperties: false,
        properties: {
          allow: {
            type: "string",
            enum: ["always", "as-needed"],
          },
          extensions: {
            type: "array",
            items: {
              type: "string",
            },
            uniqueItems: true,
          },
        },
      },
    ],
  },
] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce naming convention for JSX file extensions",
    },
    messages: {
      FILE_NAME_EXTENSION_INVALID: "The JSX file extension is required.",
      FILE_NAME_EXTENSION_UNEXPECTED: "Use JSX file extension as needed.",
    },
    schema,
  },
  name: RULE_NAME,
  create(context) {
    const options = context.options[0] ?? defaultOptions[0];
    const allow = Prd.isObject(options) ? options.allow : options;
    const extensions = Prd.isObject(options) && "extensions" in options
      ? options.extensions
      : defaultOptions[0].extensions;

    const filename = context.getFilename();
    const hasJSXNodeRef = MutRef.make<boolean>(false);

    return {
      JSXElement() {
        MutRef.set(hasJSXNodeRef, true);
      },
      JSXFragment() {
        MutRef.set(hasJSXNodeRef, true);
      },
      "Program:exit"(node) {
        const fileNameExt = filename.slice(filename.lastIndexOf("."));
        const isJSXExt = extensions.includes(fileNameExt);
        const hasJSXCode = MutRef.get(hasJSXNodeRef);

        if (hasJSXCode && !isJSXExt) {
          context.report({
            messageId: "FILE_NAME_EXTENSION_INVALID",
            node,
          });
          return;
        }

        if (
          !hasJSXCode
          && isJSXExt
          && allow === "as-needed"
        ) {
          context.report({
            messageId: "FILE_NAME_EXTENSION_UNEXPECTED",
            node,
          });
        }
      },
    };
  },
  defaultOptions,
}) satisfies ESLintUtils.RuleModule<MessageID, Options>;
