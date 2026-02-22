import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import {
  IMPURE_CONSTRUCTORS,
  IMPURE_FUNCTIONS,
  type RuleContext,
  type RuleFeature,
  defineRuleListener,
} from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../../utils";

export const RULE_NAME = "purity";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

function isImpureMemberCall(node: TSESTree.CallExpression) {
  if (node.callee.type !== AST.MemberExpression) return false;
  const { object, property } = node.callee;
  if (object.type !== AST.Identifier) return false;
  if (property.type !== AST.Identifier) return false;
  const methods = IMPURE_FUNCTIONS.get(object.name);
  if (methods == null) return false;
  return methods.has(property.name);
}

function isImpureNewExpression(node: TSESTree.NewExpression) {
  if (node.callee.type !== AST.Identifier) return false;
  return IMPURE_CONSTRUCTORS.has(node.callee.name);
}

function getImpureCallName(node: TSESTree.CallExpression) {
  if (node.callee.type !== AST.MemberExpression) return null;
  const { object, property } = node.callee;
  if (object.type !== AST.Identifier) return null;
  if (property.type !== AST.Identifier) return null;
  return `${object.name}.${property.name}()`;
}

function getImpureNewName(node: TSESTree.NewExpression) {
  if (node.callee.type !== AST.Identifier) return null;
  return `new ${node.callee.name}()`;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates that components and hooks are pure by checking that they do not call known-impure functions during render.",
    },
    messages: {
      default:
        "Do not call '{{name}}' during render. Components and hooks must be pure. Move this call into an event handler, effect, or state initializer.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const hCollector = core.useHookCollector(context);
  const cCollector = core.useComponentCollector(context);
  const cExprs: {
    name: string;
    node: TSESTree.CallExpression;
    func: ast.TSESTreeFunction;
  }[] = [];
  const nExprs: {
    name: string;
    node: TSESTree.NewExpression;
    func: ast.TSESTreeFunction;
  }[] = [];
  return defineRuleListener(
    hCollector.visitor,
    cCollector.visitor,
    {
      CallExpression(node: TSESTree.CallExpression) {
        if (!isImpureMemberCall(node)) return;
        const name = getImpureCallName(node);
        if (name == null) return;
        const func = ast.findParentNode(node, ast.isFunction);
        if (func == null) return;
        cExprs.push({ name, node, func });
      },
      NewExpression(node: TSESTree.NewExpression) {
        if (!isImpureNewExpression(node)) return;
        const name = getImpureNewName(node);
        if (name == null) return;
        const func = ast.findParentNode(node, ast.isFunction);
        if (func == null) return;
        nExprs.push({ name, node, func });
      },
      "Program:exit"(node) {
        const components = cCollector.ctx.getAllComponents(node);
        const hooks = hCollector.ctx.getAllHooks(node);
        const funcs = [...components, ...hooks];
        for (const { name, node, func } of [...cExprs, ...nExprs]) {
          if (!funcs.some((f) => f.node === func)) continue;
          context.report({
            messageId: "default",
            node,
            data: { name },
          });
        }
      },
    },
  );
}
