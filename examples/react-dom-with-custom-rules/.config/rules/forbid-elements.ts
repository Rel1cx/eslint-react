import type { RuleDefinition } from "@eslint-react/kit";

/** Options for {@link forbidElements}. */
export type ForbidElementsOptions = {
  /** A map from element name to the error message reported when that element is used. */
  forbidden: Map<string, string>;
};

/** Forbid specific JSX elements. */
export const forbidElements = ({ forbidden }: ForbidElementsOptions): RuleDefinition => {
  return (context) => {
    return {
      JSXOpeningElement(node) {
        const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
        if (name != null && forbidden.has(name)) {
          context.report({ node, message: forbidden.get(name)! });
        }
      },
    };
  };
};
