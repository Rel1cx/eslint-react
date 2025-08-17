import type { unit } from "@eslint-react/eff";
import { isObject } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "filename-extension";

export const RULE_FEATURES = [
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID =
  | "useJsxFileExtension"
  | "useNonJsxFileExtension";

type Allow = "always" | "as-needed";

type Options = readonly [
  | unit
  | Allow
  | {
    allow?: Allow;
    extensions?: readonly string[];
    ignoreFilesWithoutCode?: boolean;
  },
];

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
      description: "Enforces consistent file naming conventions.",
    },
    messages: {
      useJsxFileExtension: "Use {{extensions}} file extension for JSX files.",
      useNonJsxFileExtension: "Do not use {{extensions}} file extension for files without JSX.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const options = context.options[0] ?? defaultOptions[0];
  const allow = isObject(options) ? options.allow : options;
  const extensions = isObject(options) && "extensions" in options
    ? options.extensions
    : defaultOptions[0].extensions;
  const extensionsString = extensions.map((ext) => `'${ext}'`).join(", ");
  const filename = context.filename;

  let hasJSXNode = false;

  return {
    JSXElement() {
      hasJSXNode = true;
    },
    JSXFragment() {
      hasJSXNode = true;
    },
    "Program:exit"(program) {
      const fileNameExt = filename.slice(filename.lastIndexOf("."));
      const isJSXExt = extensions.includes(fileNameExt);
      if (hasJSXNode && !isJSXExt) {
        context.report({
          messageId: "useJsxFileExtension",
          node: program,
          data: {
            extensions: extensionsString,
          },
        });
        return;
      }

      const hasCode = program.body.length > 0;
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
          messageId: "useNonJsxFileExtension",
          node: program,
          data: {
            extensions: extensionsString,
          },
        });
      }
    },
  };
}
