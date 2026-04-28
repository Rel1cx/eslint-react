import { Check, Extract, is } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { hasAttribute } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

import { getNestedReturnStatements, report } from "./lib";

import { createRule } from "../../utils";

export const RULE_NAME = "no-missing-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "unexpectedFragmentSyntax";

type Descriptor = ReportDescriptor<MessageID>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows missing 'key' on items in list rendering.",
    },
    messages: {
      default: "Missing 'key' for element when rendering list.",
      unexpectedFragmentSyntax: "Use fragment component instead of '<>' because it does not support `key`.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  let inChildrenToArray = false;

  function check(node: TSESTree.Node): Descriptor | null {
    if (node.type === AST.JSXElement) {
      return !hasAttribute(context, node, "key")
        ? { messageId: "default", node }
        : null;
    }
    if (node.type === AST.JSXFragment) {
      return { messageId: "unexpectedFragmentSyntax", node };
    }
    return null;
  }

  function checkExpr(node: TSESTree.Expression): Descriptor | null {
    switch (node.type) {
      case AST.ConditionalExpression:
        return check(node.consequent) ?? check(node.alternate);
      case AST.LogicalExpression:
        return check(node.left) ?? check(node.right);
      case AST.JSXElement:
      case AST.JSXFragment:
        return check(node);
      default:
        return null;
    }
  }

  function checkBlock(node: TSESTree.BlockStatement): Descriptor[] {
    const descriptors: Descriptor[] = [];
    for (const stmt of getNestedReturnStatements(node)) {
      if (stmt.argument == null) continue;
      const desc = check(stmt.argument);
      if (desc == null) continue;
      descriptors.push(desc);
    }
    return descriptors;
  }

  return merge(
    {
      ArrayExpression(node) {
        if (inChildrenToArray) return;
        const elements = node.elements.filter(is(AST.JSXElement));
        if (elements.length === 0) return;
        for (const el of elements) {
          if (!hasAttribute(context, el, "key")) {
            context.report({ messageId: "default", node: el });
          }
        }
      },
      CallExpression(node) {
        inChildrenToArray ||= core.isChildrenToArrayCall(context, node);
        if (inChildrenToArray) return;
        const callee = Extract.unwrap(node.callee);
        if (callee.type !== AST.MemberExpression) return;
        if (callee.property.type !== AST.Identifier) return;
        const name = callee.property.name;
        const idx = name === "from" ? 1 : name === "map" ? 0 : -1;
        if (idx < 0) return;
        const cb = node.arguments[idx];
        if (!Check.isFunction(cb)) return;
        if (cb.body.type === AST.BlockStatement) {
          checkBlock(cb.body).forEach(report(context));
        } else {
          report(context)(checkExpr(cb.body));
        }
      },
      "CallExpression:exit"(node) {
        if (core.isChildrenToArrayCall(context, node)) {
          inChildrenToArray = false;
        }
      },
      JSXFragment(node) {
        if (inChildrenToArray) return;
        if (node.parent.type === AST.ArrayExpression) {
          context.report({ messageId: "unexpectedFragmentSyntax", node });
        }
      },
    },
  );
}
