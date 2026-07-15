import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

// ---------------------------------------------------------------------------
// Object property helpers
// ---------------------------------------------------------------------------

/**
 * Find a `children` property inside an ObjectExpression.
 * @param node The object expression.
 * @returns The Property node whose key is "children", or null.
 */
export function findChildrenProperty(node: TSESTree.ObjectExpression): TSESTree.Property | null {
  for (const prop of node.properties) {
    if (prop.type !== AST.Property) continue;
    const key = Extract.unwrap(prop.key);
    if (key.type === AST.Identifier && key.name === "children") return prop;
    if (key.type === AST.Literal && key.value === "children") return prop;
  }
  return null;
}

/**
 * Compute the removal range for an ObjectExpression property, consuming any
 * leading or trailing comma and whitespace so the resulting object stays clean.
 * @param context The rule context.
 * @param prop The property to remove.
 * @param parent The parent ObjectExpression.
 */
export function getObjectPropertyRemovalRange(context: RuleContext, prop: TSESTree.Property, parent: TSESTree.ObjectExpression): [start: number, end: number] {
  const { sourceCode } = context;
  const props = parent.properties;
  const propIndex = props.indexOf(prop);
  let start = prop.range[0];
  let end = prop.range[1];

  if (propIndex < props.length - 1) {
    // Not the last property: remove trailing comma
    const afterText = sourceCode.text.slice(end);
    const commaMatch = /^\s*,/.exec(afterText);
    if (commaMatch != null) {
      end += commaMatch[0].length;
    }
  } else {
    // Last property: remove leading comma
    const beforeText = sourceCode.text.slice(0, start);
    const lastComma = beforeText.lastIndexOf(",");
    if (lastComma >= parent.range[0]) {
      start = lastComma;
    }
  }

  // Walk backwards over whitespace
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  while (start > parent.range[0] && /\s/.test(sourceCode.text[start - 1]!)) {
    start--;
  }

  return [start, end];
}

// ---------------------------------------------------------------------------
// Attribute helpers (single JSXAttribute + source text)
// ---------------------------------------------------------------------------

/**
 * Compute the removal range for a JSX attribute, consuming any leading
 * whitespace (spaces, tabs, newlines) so the resulting markup stays clean.
 * @param context The rule context.
 * @param prop The JSX attribute.
 */
export function getPropRemovalRange(context: RuleContext, prop: TSESTree.JSXAttribute): [start: number, end: number] {
  const { sourceCode } = context;
  let start = prop.range[0];
  const end = prop.range[1];

  // Walk backwards over whitespace
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  while (start > 0 && /\s/.test(sourceCode.text[start - 1]!)) {
    start--;
  }

  return [start, end];
}

/**
 * Extract the text to use as JSX children content from a `children` prop.
 *
 * - `children="text"`        -> `text`  (raw string, no quotes)
 * - `children={<div />}`     -> `<div />`  (JSX element, no braces)
 * - `children={<>…</>}`      -> `<>…</>`  (JSX fragment, no braces)
 * - `children={expression}`  -> `{expression}`  (wrapped in braces)
 * - `children`               -> `null`  (boolean shorthand, cannot extract)
 * @param context The rule context.
 * @param prop The JSX attribute.
 */
export function getChildrenPropText(context: RuleContext, prop: TSESTree.JSXAttribute): string | null {
  const { sourceCode } = context;
  const { value } = prop;
  if (value == null) return null;

  // children="text" -> text
  if (value.type === AST.Literal) {
    return String(value.value);
  }

  // children={expression}
  if (value.type === AST.JSXExpressionContainer) {
    const { expression } = value;
    // {  } – empty expression, nothing to extract
    if (expression.type === AST.JSXEmptyExpression) return null;

    const exprText = sourceCode.getText(expression);

    // JSX elements and fragments can be placed directly as children
    if (Check.isJSXElementOrFragment(expression)) {
      return exprText;
    }

    // All other expressions must be wrapped in braces to remain valid JSX
    return `{${exprText}}`;
  }

  return null;
}
