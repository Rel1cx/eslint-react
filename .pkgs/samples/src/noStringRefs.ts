import type { RuleFunction } from "@eslint-react/kit";

/** Disallow deprecated string refs. */
export function noStringRefs(): RuleFunction {
  return (context) => {
    // Fast path: skip if no `ref` attribute can be present in the file
    if (!context.sourceCode.text.includes("ref")) return {};

    return {
      JSXAttribute(node) {
        // Guard: only check `ref` attributes
        if (node.name.type !== "JSXIdentifier" || node.name.name !== "ref") {
          return;
        }

        // Guard: only string literal values are string refs
        const value = node.value;
        if (value?.type !== "Literal" || typeof value.value !== "string") {
          return;
        }

        context.report({
          message: [
            "String refs are deprecated and should not be used.",
            "Use React.useRef() instead.",
          ].join(" "),
          node,
        });
      },
    };
  };
}
