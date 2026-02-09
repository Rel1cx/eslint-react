import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, report } from "@eslint-react/shared";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { ReportDescriptor, RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "missingKey"
  | "missingKeyWithCreateElement"
  | "unexpectedFragmentSyntax";

type Descriptor = ReportDescriptor<MessageID>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows missing 'key' on items in list rendering.",
    },
    messages: {
      missingKey: "Missing 'key' for element when rendering list.",
      missingKeyWithCreateElement: "Missing 'key' for 'createElement' call when rendering list.",
      unexpectedFragmentSyntax: "Use fragment component instead of '<>' because it does not support `key`.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  let inChildrenToArray = false;

  function check(node: TSESTree.Node, scope?: Scope): Descriptor | null {
    scope ??= context.sourceCode.getScope(node);
    switch (node.type) {
      case AST.JSXElement: {
        const key = core.getJsxAttribute(context, node, scope)("key");
        if (key == null) {
          return { messageId: "missingKey", node };
        }
        return null;
      }
      case AST.JSXFragment:
        return { messageId: "unexpectedFragmentSyntax", node };
      case AST.CallExpression: {
        if (!core.isCreateElementCall(context, node)) return null;
        // createElement(type)            — no props at all
        // createElement(type, null)      — explicit null
        // createElement(type, undefined) — explicit undefined
        // createElement(type, { ... })   — check for `key` property
        // createElement(type, variable)  — can't determine statically, skip
        const props = node.arguments[1];
        if (props == null) {
          return { messageId: "missingKeyWithCreateElement", node };
        }
        if (props.type === AST.Literal && props.value == null) {
          return { messageId: "missingKeyWithCreateElement", node };
        }
        if (props.type === AST.Identifier && props.name === "undefined") {
          return { messageId: "missingKeyWithCreateElement", node };
        }
        if (props.type === AST.ObjectExpression) {
          const hasKey = props.properties.some(
            (p) =>
              p.type === AST.Property
              && p.key.type === AST.Identifier
              && p.key.name === "key",
          );
          return hasKey ? null : { messageId: "missingKeyWithCreateElement", node };
        }
        // Props is a variable / spread — can't determine statically, assume ok
        return null;
      }
      default:
        return null;
    }
  }

  function checkExpr(node: TSESTree.Expression): Descriptor | null {
    switch (node.type) {
      case AST.ConditionalExpression:
        return check(node.consequent) ?? check(node.alternate);
      case AST.LogicalExpression:
        return check(node.left) ?? check(node.right);
      case AST.JSXElement:
      case AST.JSXFragment:
      case AST.CallExpression:
        return check(node);
      default:
        return null;
    }
  }

  function checkBlock(node: TSESTree.BlockStatement): Descriptor[] {
    const descriptors: Descriptor[] = [];
    for (const stmt of ast.getNestedReturnStatements(node)) {
      if (stmt.argument == null) continue;
      const descriptor = check(stmt.argument);
      if (descriptor == null) continue;
      descriptors.push(descriptor);
    }
    return descriptors;
  }

  return {
    ArrayExpression(node) {
      if (inChildrenToArray) return;
      const scope = context.sourceCode.getScope(node);
      for (const el of node.elements) {
        if (el == null) continue;
        const descriptor = check(el, scope);
        if (descriptor == null) continue;
        context.report(descriptor);
      }
    },
    CallExpression(node) {
      inChildrenToArray ||= core.isChildrenToArrayCall(context, node);
      if (inChildrenToArray) return;
      if (node.callee.type !== AST.MemberExpression) return;
      if (node.callee.property.type !== AST.Identifier) return;
      const name = node.callee.property.name;
      const idx = name === "from" ? 1 : name === "map" ? 0 : -1;
      if (idx < 0) return;
      const cb = node.arguments[idx];
      if (!ast.isFunction(cb)) return;
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
  };
}
