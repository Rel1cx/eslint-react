import type { RuleDefinition } from "@eslint-react/kit";

/** Require `onChange` or `readOnly` when using `checked` on `<input>`. */
export function checkedRequiresOnchangeOrReadonly(): RuleDefinition {
  return {
    name: "checked-requires-onchange-or-readonly",
    make: (context) => ({
      JSXOpeningElement(node) {
        const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
        if (name !== "input") return;
        const attrs = node.attributes.filter((a) => a.type === "JSXAttribute");
        const hasChecked = attrs.some((a) => a.name.name === "checked");
        if (!hasChecked) return;
        const hasOnChange = attrs.some((a) => a.name.name === "onChange");
        const hasReadOnly = attrs.some((a) => a.name.name === "readOnly");
        if (!hasOnChange && !hasReadOnly) {
          context.report({
            node,
            message: "`checked` requires `onChange` or `readOnly`.",
          });
        }
      },
    }),
  };
}
