import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { match, P } from "ts-pattern";

/**
 * Get a StaticValue of the attribute value
 * @param context The rule context
 * @param node The JSX attribute node
 * @param name The name of the attribute
 * @returns The StaticValue of the attribute value
 */
export function getAttributeValue(
  context: RuleContext,
  node: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
  name: string,
): Exclude<VAR.LazyValue, { kind: "lazy" }> {
  const initialScope = context.sourceCode.getScope(node);
  switch (node.type) {
    case T.JSXAttribute:
      if (node.value?.type === T.Literal) {
        return {
          kind: "some",
          node: node.value,
          initialScope,
          value: node.value.value,
        } as const;
      }
      if (node.value?.type === T.JSXExpressionContainer) {
        return VAR.toStaticValue({
          kind: "lazy",
          node: node.value.expression,
          initialScope,
        });
      }
      return { kind: "none", node, initialScope } as const;
    case T.JSXSpreadAttribute: {
      const staticValue = VAR.toStaticValue({
        kind: "lazy",
        node: node.argument,
        initialScope,
      });
      if (staticValue.kind === "none") {
        return staticValue;
      }
      return match(staticValue.value)
        .with({ [name]: P.select(P.any) }, (value) => ({
          kind: "some",
          node: node.argument,
          initialScope,
          value,
        } as const))
        .otherwise(() => ({ kind: "none", node, initialScope } as const));
    }
    default:
      return { kind: "none", node, initialScope } as const;
  }
}
