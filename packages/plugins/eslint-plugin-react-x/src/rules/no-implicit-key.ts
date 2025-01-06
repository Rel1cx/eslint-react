import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-implicit-key";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow implicit 'key' props",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noImplicitKey: "Do not use implicit 'key' props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function getReportDescriptor(node: TSESTree.JSXOpeningElement): O.Option<ReportDescriptor<MessageID>> {
      const initialScope = context.sourceCode.getScope(node);
      const keyPropFound = JSX.findPropInAttributes(node.attributes, initialScope)("key");
      const keyPropOnElement = node.attributes.some(n => AST.is(T.JSXAttribute)(n) && n.name.name === "key");
      if (O.isSome(keyPropFound) && !keyPropOnElement) {
        return O.some({ messageId: "noImplicitKey", node: keyPropFound.value });
      }
      return O.none();
    }
    return {
      JSXOpeningElement: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
