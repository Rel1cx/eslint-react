import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, report } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { ReportDescriptor, RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "missingKey" | "unexpectedFragmentSyntax";

type Descriptor = ReportDescriptor<MessageID>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows missing 'key' on items in list rendering.",
    },
    messages: {
      missingKey: "Missing 'key' for element when rendering list.",
      unexpectedFragmentSyntax: "Use fragment component instead of '<>' because it does not support `key`.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(ctx: RuleContext<MessageID, []>): RuleListener {
  let inChildrenToArray = false;

  function check(node: TSESTree.Node): Descriptor | null {
    if (node.type === AST.JSXElement) {
      return core.getJsxAttribute(ctx, node)("key") == null
        ? { messageId: "missingKey", node }
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
    return ast.getNestedReturnStatements(node)
      .filter((stmt) => stmt.argument != null)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((stmt) => check(stmt.argument!))
      .filter((d): d is Descriptor => d != null);
  }

  return {
    ArrayExpression(node) {
      if (inChildrenToArray) return;
      const elements = node.elements.filter(ast.is(AST.JSXElement));
      if (elements.length === 0) return;
      const scope = ctx.sourceCode.getScope(node);
      for (const el of elements) {
        if (core.getJsxAttribute(ctx, el, scope)("key") == null) {
          ctx.report({ messageId: "missingKey", node: el });
        }
      }
    },
    CallExpression(node) {
      inChildrenToArray ||= core.isChildrenToArrayCall(ctx, node);
      if (inChildrenToArray) return;
      if (node.callee.type !== AST.MemberExpression) return;
      if (node.callee.property.type !== AST.Identifier) return;
      const name = node.callee.property.name;
      const idx = name === "from" ? 1 : name === "map" ? 0 : -1;
      if (idx < 0) return;
      const cb = node.arguments[idx];
      if (!ast.isFunction(cb)) return;
      if (cb.body.type === AST.BlockStatement) {
        checkBlock(cb.body).forEach(report(ctx));
      } else {
        report(ctx)(checkExpr(cb.body));
      }
    },
    "CallExpression:exit"(node) {
      if (core.isChildrenToArrayCall(ctx, node)) {
        inChildrenToArray = false;
      }
    },
    JSXFragment(node) {
      if (inChildrenToArray) return;
      if (node.parent.type === AST.ArrayExpression) {
        ctx.report({ messageId: "unexpectedFragmentSyntax", node });
      }
    },
  };
}
