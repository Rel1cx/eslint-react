import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";

export function findProperty(of: TSESTree.ObjectLiteralElement[], named: string): TSESTree.Property | null {
  for (const property of of) {
    if (property.type === AST.Property && Extract.getPropertyName(property.key) === named) {
      return property;
    }
    if (property.type === AST.SpreadElement && property.argument.type === AST.ObjectExpression) {
      const found = findProperty(property.argument.properties, named);
      if (found != null) return found;
    }
  }
  return null;
}

export function getSignalValueExpression(context: RuleContext, node: TSESTree.Node | null): TSESTree.Node | null {
  if (node == null) return null;
  switch (node.type) {
    case AST.Identifier: {
      const resolved = resolve(context, node);
      // If the identifier is a function parameter (resolve returns the containing function),
      // treat it as a valid signal expression (e.g. `signal` from foxact/use-abortable-effect).
      if (resolved != null && Check.isFunction(resolved)) {
        return node;
      }
      return getSignalValueExpression(context, resolved);
    }
    case AST.MemberExpression:
      return node;
    default:
      return null;
  }
}

export const defaultOptions: {
  capture: boolean | null;
  // once: boolean | null;
  signal: TSESTree.Node | null;
} = {
  capture: false,
  // once: false,
  signal: null,
};

export function getOptions(context: RuleContext, node: TSESTree.CallExpressionArgument): typeof defaultOptions {
  const initialScope = context.sourceCode.getScope(node);
  function getOpts(node: TSESTree.Node): typeof defaultOptions {
    switch (node.type) {
      case AST.Identifier: {
        const initNode = resolve(context, node);
        if (initNode?.type === AST.ObjectExpression) {
          return getOpts(initNode);
        }
        return defaultOptions;
      }
      case AST.Literal: {
        return { ...defaultOptions, capture: Boolean(node.value) };
      }
      case AST.ObjectExpression: {
        const pCapture = findProperty(node.properties, "capture");
        const vCapture = match(pCapture)
          .with(P.nullish, () => false)
          .with({ type: AST.Property }, (prop) => {
            const value = prop.value;
            switch (value.type) {
              case AST.Literal:
                return Boolean(value.value);
              default:
                return Boolean(getStaticValue(value, initialScope)?.value);
            }
          })
          .otherwise(() => false);
        const pSignal = findProperty(node.properties, "signal");
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
  return getOpts(node);
}
