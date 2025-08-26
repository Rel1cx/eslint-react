import * as AST from "@eslint-react/ast";
import { type RuleContext, type RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-key";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents the use of unnecessary `key` props on JSX elements when rendering lists.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnnecessaryKey:
        "Unnecessary `key` prop on this element. The `key` should be on the top-level element returned from the array.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.getText().includes("key=")) {
    return {};
  }

  return {
    JSXAttribute(node: TSESTree.JSXAttribute) {
      if (node.name.name !== "key") return;
      const jsxElement = node.parent.parent;
      const pMapCallback = AST.findParentNode(jsxElement, isMapCallback);
      if (pMapCallback == null) return;
      const pKeyedElementOrElse = AST.findParentNode(
        jsxElement,
        (n) => {
          if (n === pMapCallback) return true;
          return AST.isJSXElement(n)
            && n
              .openingElement
              .attributes
              .some((n) =>
                n.type === T.JSXAttribute
                && n.name.type === T.JSXIdentifier
                && n.name.name === "key"
              );
        },
      );
      // No parent JSX element with a key prop found between the map callback and this element
      if (pKeyedElementOrElse == null || pKeyedElementOrElse === pMapCallback) return;
      context.report({ messageId: "noUnnecessaryKey", node });
    },
  };
}

function isMapCallback(node: TSESTree.Node) {
  if (node.parent == null) return false;
  if (!AST.isArrayMapCall(node.parent)) return false;
  return AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(AST.getJSExpression(node));
}
