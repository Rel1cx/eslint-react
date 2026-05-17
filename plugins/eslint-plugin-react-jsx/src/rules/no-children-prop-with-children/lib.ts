import { Extract } from "@eslint-react/ast";
import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
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
export function getObjectPropertyRemovalRange(
  context: RuleContext,
  prop: TSESTree.Property,
  parent: TSESTree.ObjectExpression,
): [start: number, end: number] {
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
  while (start > 0 && /\s/.test(sourceCode.text[start - 1]!)) {
    start--;
  }

  return [start, end];
}

// ---------------------------------------------------------------------------
// Element helpers (JSXElement | JSXFragment)
// ---------------------------------------------------------------------------

/**
 * Compute the range covering **all** children content of a JSX element or
 * fragment (from the start of the first child to the end of the last child).
 *
 * Returns `null` when there are no children at all.
 * @param node The JSX element or fragment.
 */
export function getChildrenContentRange(node: TSESTreeJSXElementLike): [start: number, end: number] | null {
  if (node.children.length === 0) return null;
  const first = node.children[0]!;
  const last = node.children[node.children.length - 1]!;
  return [first.range[0], last.range[1]];
}
