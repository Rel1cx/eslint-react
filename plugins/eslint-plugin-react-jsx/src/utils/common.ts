import { Check, Extract, type TSESTreeJSXElementLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function findChildrenProperty(node: TSESTree.ObjectExpression): TSESTree.Property | null {
  for (const prop of node.properties) {
    if (prop.type === AST.Property && Extract.getStaticPropertyName(prop) === "children") return prop;
  }
  return null;
}

export function getChildrenContentRange(node: TSESTreeJSXElementLike): [start: number, end: number] | null {
  const first = node.children.at(0);
  const last = node.children.at(-1);
  if (first == null || last == null) return null;
  return [first.range[0], last.range[1]];
}

export function getChildrenPropText(context: RuleContext, prop: TSESTree.JSXAttribute): string | null {
  const { sourceCode } = context;
  const { value } = prop;
  if (value == null) return null;

  if (value.type === AST.Literal) {
    return escapeJsxText(String(value.value));
  }

  if (value.type !== AST.JSXExpressionContainer) return null;

  const { expression } = value;
  if (expression.type === AST.JSXEmptyExpression) return null;

  const exprText = sourceCode.getText(expression);
  if (Check.isJSXElementOrFragment(expression)) return exprText;
  return `{${exprText}}`;
}

function escapeJsxText(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;");
}

export function getPropRemovalRange(context: RuleContext, prop: TSESTree.JSXAttribute): [start: number, end: number] {
  const { sourceCode } = context;
  let start = prop.range[0];
  const end = prop.range[1];

  while (start > 0 && /\s/.test(sourceCode.text[start - 1] ?? "")) start--;

  return [start, end];
}
