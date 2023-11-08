import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "render-prop";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all render props and render functions",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      RENDER_PROP: "render prop found, name: {{name}}",
    },
  },
  defaultOptions: [],
  create() {
    return {
      // TODO: implement this
    };
  },
});
