import { isObject } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/shared";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createRule } from "../utils";

export const RULE_NAME = "filename-extension";

export const RULE_FEATURES = [
  "CHK",
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID =
  | "filenameExtensionInvalid"
  | "filenameExtensionUnexpected";

type Allow = "always" | "as-needed";

/* eslint-disable no-restricted-syntax */
type Options = readonly [
  | Allow
  | undefined
  | {
    allow?: Allow;
    extensions?: readonly string[];
    ignoreFilesWithoutCode?: boolean;
  },
];
/* eslint-enable no-restricted-syntax */

const defaultOptions = [{
  allow: "as-needed",
  extensions: [".jsx", ".tsx"],
  ignoreFilesWithoutCode: false,
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
          ignoreFilesWithoutCode: {
            type: "boolean",
          },
        },
      },
    ],
  },
] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    docs: {
      description: "enforce naming convention for JSX file extensions",
    },
    messages: {
      filenameExtensionInvalid: "The JSX file extension is required.",
      filenameExtensionUnexpected: "Use JSX file extension as needed.",
    },
    schema,
  },
  name: RULE_NAME,
  create(context) {
    const options = context.options[0] ?? defaultOptions[0];
    const allow = isObject(options) ? options.allow : options;
    const extensions = isObject(options) && "extensions" in options
      ? options.extensions
      : defaultOptions[0].extensions;
    const filename = context.filename;

    let hasJSXNode = false;

    return {
      JSXElement() {
        hasJSXNode = true;
      },
      JSXFragment() {
        hasJSXNode = true;
      },
      "Program:exit"(node) {
        const fileNameExt = filename.slice(filename.lastIndexOf("."));
        const isJSXExt = extensions.includes(fileNameExt);
        if (hasJSXNode && !isJSXExt) {
          context.report({
            messageId: "filenameExtensionInvalid",
            node,
          });
          return;
        }

        const hasCode = node.body.length > 0;
        const ignoreFilesWithoutCode = isObject(options) && options.ignoreFilesWithoutCode === true;
        if (!hasCode && ignoreFilesWithoutCode) {
          return;
        }
        if (
          !hasJSXNode
          && isJSXExt
          && allow === "as-needed"
        ) {
          context.report({
            messageId: "filenameExtensionUnexpected",
            node,
          });
        }
      },
    };
  },
  defaultOptions,
});
