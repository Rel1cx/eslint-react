import type { RuleDefinition } from "@eslint-react/kit";

/** Require `onChange` or `readOnly` when using `checked` on `<input>`. */
export function checkedRequiresOnchangeOrReadonly(): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (name !== "input") return;
      const attrs = new Set<string>();
      for (const attr of node.attributes) {
        if (attr.type === "JSXAttribute" && attr.name.type === "JSXIdentifier") {
          attrs.add(attr.name.name);
        }
      }
      if (!attrs.has("onChange") && !attrs.has("readOnly")) {
        context.report({
          node,
          message: "`checked` requires `onChange` or `readOnly`.",
        });
      }
    },
  });
}
