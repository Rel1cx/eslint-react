import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { unit } from "@eslint-react/eff";
import { identity } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener, report } from "@eslint-react/shared";
import { findVariable } from "@eslint-react/var";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { isIdentifier, isVariableDeclarator } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor, SourceCode } from "@typescript-eslint/utils/ts-eslint";
import { match } from "ts-pattern";

import { createRule } from "../../utils";

export const RULE_NAME = "no-unnecessary-use-callback";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default" | "noUnnecessaryUseCallbackInsideUseEffect";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows unnecessary usage of 'useCallback'.",
    },
    messages: {
      default: "An 'useCallback' with empty deps and no references to the component scope may be unnecessary.",
      noUnnecessaryUseCallbackInsideUseEffect:
        "{{name}} is only used inside 1 useEffect, which may be unnecessary. You can move the computation into useEffect directly and merge the dependency arrays.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `useCallback` is not present in the file
  if (!context.sourceCode.text.includes("useCallback")) return {};

  return defineRuleListener(
    {
      VariableDeclarator(node) {
        const { id, init } = node;
        if (id.type !== AST.Identifier || init?.type !== AST.CallExpression || !core.isUseCallbackCall(init)) return;
        const [cbk, ...rest] = context.sourceCode.getDeclaredVariables(node);
        // Skip non-standard `useCallback()` usages to prevent false positives
        if (cbk == null || rest.length > 0) return;

        const checkForUsageInsideUseEffectReport = checkForUsageInsideUseEffect(context.sourceCode, init);

        const scope = context.sourceCode.getScope(init);
        const component = context.sourceCode.getScope(init).block;

        if (!ast.isFunction(component)) {
          return;
        }
        const [arg0, arg1] = init.arguments;
        if (arg0 == null || arg1 == null) {
          return;
        }

        const hasEmptyDeps = match(arg1)
          .with({ type: AST.ArrayExpression }, (n) => n.elements.length === 0)
          .with({ type: AST.Identifier }, (n) => {
            const variable = findVariable(n.name, scope);
            const initNode = resolve(variable);
            if (initNode?.type !== AST.ArrayExpression) {
              return false;
            }
            return initNode.elements.length === 0;
          })
          .otherwise(() => false);

        if (!hasEmptyDeps) {
          report(context)(checkForUsageInsideUseEffectReport);
          return;
        }

        const arg0Node = match(arg0)
          .with({ type: AST.ArrowFunctionExpression }, (n) => {
            if (n.body.type === AST.ArrowFunctionExpression) {
              return n.body;
            }
            return n;
          })
          .with({ type: AST.FunctionExpression }, identity)
          .with({ type: AST.Identifier }, (n) => {
            const variable = findVariable(n.name, scope);
            const initNode = resolve(variable);
            if (initNode?.type !== AST.ArrowFunctionExpression && initNode?.type !== AST.FunctionExpression) {
              return null;
            }
            return initNode;
          })
          .otherwise(() => null);
        if (arg0Node == null) return;

        function getChildScopes(scope: Scope): Scope[] {
          return scope.childScopes.reduce((acc, child) => [...acc, ...getChildScopes(child)], [scope]);
        }
        const arg0NodeScope = context.sourceCode.getScope(arg0Node);
        const arg0NodeReferences = getChildScopes(arg0NodeScope).flatMap((x) => x.references);
        const isReferencedToComponentScope = arg0NodeReferences.some((x) => x.resolved?.scope.block === component);

        if (!isReferencedToComponentScope) {
          context.report({
            messageId: "default",
            node,
          });
          return;
        }
        report(context)(checkForUsageInsideUseEffectReport);
      },
    },
  );
}

function checkForUsageInsideUseEffect(
  sourceCode: Readonly<SourceCode>,
  node: TSESTree.CallExpression,
): ReportDescriptor<MessageID> | unit {
  if (!/use\w*Effect/u.test(sourceCode.text)) return;

  if (!isVariableDeclarator(node.parent)) {
    return;
  }

  if (!isIdentifier(node.parent.id)) {
    return;
  }

  const references = sourceCode.getDeclaredVariables(node.parent)[0]?.references ?? [];
  const usages = references.filter((ref) => ref.init !== true);
  // Skip if there are no usages of the memoized value, the no-unused-vars rule will catch it
  if (usages.length === 0) {
    return;
  }
  const effectSet = new Set<TSESTree.Node>();

  for (const usage of usages) {
    const effect = ast.findParentNode(usage.identifier, core.isUseEffectLikeCall);

    if (effect == null) {
      return;
    }

    effectSet.add(effect);
    if (effectSet.size > 1) {
      return;
    }
  }
  return {
    data: { name: node.parent.id.name },
    messageId: "noUnnecessaryUseCallbackInsideUseEffect",
    node,
  };
}

function resolve(v: Variable | unit) {
  if (v == null) return unit;
  const def = v.defs.at(0);
  if (def == null) return unit;
  if ("init" in def.node && def.node.init != null && !("declarations" in def.node.init)) {
    return def.node.init;
  }
  return def.node;
}
