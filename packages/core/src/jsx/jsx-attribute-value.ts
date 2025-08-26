import type { RuleContext } from "@eslint-react/kit";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

/**
 * Extracts the value of a JSX attribute by name
 * @param context - ESLint rule context
 * @param node - JSX attribute or spread attribute node
 * @param name - Name of the attribute to extract
 * @returns The extracted attribute value in a structured format
 */
export function getAttributeValue(
  context: RuleContext,
  node: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
  name: string,
): Exclude<VAR.LazyValue, { kind: "lazy" }> {
  // Get the initial scope from the node's context
  const initialScope = context.sourceCode.getScope(node);
  switch (node.type) {
    case T.JSXAttribute:
      // Case 1: Literal value (e.g., className="container")
      if (node.value?.type === T.Literal) {
        return {
          kind: "some",
          node: node.value,
          initialScope,
          value: node.value.value,
        } as const;
      }
      // Case 2: Expression container (e.g., className={variable})
      if (node.value?.type === T.JSXExpressionContainer) {
        return VAR.toStaticValue({
          kind: "lazy",
          node: node.value.expression,
          initialScope,
        });
      }
      // Case 3: Boolean attribute with no value (e.g., disabled)
      return { kind: "none", node, initialScope } as const;
    case T.JSXSpreadAttribute: {
      // For spread attributes (e.g., {...props}), try to extract static value
      const staticValue = VAR.toStaticValue({
        kind: "lazy",
        node: node.argument,
        initialScope,
      });
      // If can't extract static value, return none
      if (staticValue.kind === "none") {
        return staticValue;
      }
      // If spread object contains the named property, extract its value
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
      // Fallback case for unknown node types
      return { kind: "none", node, initialScope } as const;
  }
}
