import type { RuleFunction } from "@eslint-react/kit";

/** Require `onChange` or `readOnly` when using `checked` on `<input>`. */
export function checkedRequiresOnchangeOrReadonly(): RuleFunction {
  return (context) => ({
    JSXOpeningElement(node) {
      // › Verify this is an <input> element
      const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (name !== "input") return;

      // › Collect all attribute names
      const attrs = new Set<string>();
      for (const attr of node.attributes) {
        if (attr.type === "JSXAttribute" && attr.name.type === "JSXIdentifier") {
          attrs.add(attr.name.name);
        }
      }

      // › Guard: must have checked attribute
      if (!attrs.has("checked")) return;

      // › Validate: requires onChange or readOnly
      if (!attrs.has("onChange") && !attrs.has("readOnly")) {
        context.report({
          node,
          message: "`checked` requires `onChange` or `readOnly`.",
        });
      }
    },
  });
}
