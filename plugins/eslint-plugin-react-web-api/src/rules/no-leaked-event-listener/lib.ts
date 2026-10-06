import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve, resolveOrigin } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable, getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";

// Whether the identifier is bound by destructuring a `signal` property, e.g.
// `signal` in `const { signal } = ...` or `sig` in `const { signal: sig } = ...`.
function isSignalPropertyBinding(context: RuleContext, node: TSESTree.Identifier): boolean {
  const variable = findVariable(context.sourceCode.getScope(node), node);
  const defNode = variable?.defs.at(-1)?.node;
  if (defNode?.type !== AST.VariableDeclarator || defNode.id.type !== AST.ObjectPattern) {
    return false;
  }
  for (const prop of defNode.id.properties) {
    if (prop.type !== AST.Property || prop.computed) {
      continue;
    }
    const key = Extract.unwrap(prop.key);
    if (key.type !== AST.Identifier || key.name !== "signal") {
      continue;
    }
    const value = Extract.unwrap(prop.value);
    return value.type === AST.Identifier && value.name === node.name;
  }
  return false;
}

export function getSignalValueExpression(context: RuleContext, node: TSESTree.Node | null): TSESTree.Node | null {
  if (node == null) return null;
  switch (node.type) {
    case AST.Identifier: {
      const resolved = resolveOrigin(context, node);
      const unwrapped = resolved == null ? null : Extract.unwrap(resolved);
      // If the identifier is a function parameter (resolveOrigin returns the containing function),
      // treat it as a valid signal expression (e.g. `signal` from foxact/use-abortable-effect).
      if (unwrapped != null && Check.isFunction(unwrapped)) {
        return node;
      }
      // A `signal` destructured from `new AbortController()` is a valid signal expression
      // (e.g. `const { signal, abort } = new AbortController()`).
      if (unwrapped != null && unwrapped.type === AST.NewExpression && isSignalPropertyBinding(context, node)) {
        const newCallee = Extract.unwrap(unwrapped.callee);
        if (newCallee.type === AST.Identifier && newCallee.name === "AbortController") {
          return node;
        }
      }
      return getSignalValueExpression(context, unwrapped);
    }
    case AST.MemberExpression:
      return node;
    default:
      return null;
  }
}

export const defaultOptions: {
  capture: boolean;
  signal: TSESTree.Node | null;
} = {
  capture: false,
  signal: null,
};

export function getOptions(context: RuleContext, node: TSESTree.CallExpressionArgument): typeof defaultOptions {
  function visit(node: TSESTree.Node): typeof defaultOptions {
    switch (node.type) {
      case AST.Identifier: {
        const initNode = resolve(context, node);
        if (initNode?.type === AST.ObjectExpression) {
          return visit(initNode);
        }
        return defaultOptions;
      }
      case AST.Literal: {
        return { ...defaultOptions, capture: Boolean(node.value) };
      }
      case AST.ObjectExpression: {
        const pCapture = Extract.findProperty(node.properties, "capture");
        const vCapture = match(pCapture)
          .with(P.nullish, () => false)
          .with({ type: AST.Property }, (prop) => {
            const value = prop.value;
            switch (value.type) {
              case AST.Literal:
                return Boolean(value.value);
              default:
                return Boolean(getStaticValue(value, context.sourceCode.getScope(node))?.value);
            }
          })
          .otherwise(() => false);
        const pSignal = Extract.findProperty(node.properties, "signal");
        const vSignal = pSignal?.type === AST.Property
          ? getSignalValueExpression(context, pSignal.value)
          : null;
        return { capture: vCapture, signal: vSignal };
      }
      default: {
        return defaultOptions;
      }
    }
  }
  return visit(node);
}
