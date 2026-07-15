import type { TSESTree } from "@typescript-eslint/types";

/**
 * Discriminated union representing the resolved value of a JSX attribute.
 *
 * Each variant carries the original AST `node` (where applicable) and a
 * `toStatic()` helper that attempts to collapse the value into a plain
 * JavaScript value at analysis time.
 */
export type JsxAttributeValue =
  | JsxAttributeValueBoolean
  | JsxAttributeValueElement
  | JsxAttributeValueLiteral
  | JsxAttributeValueUnknown
  | JsxAttributeValueMissing
  | JsxAttributeValueSpreadChild
  | JsxAttributeValueSpreadProps;

/** Boolean attribute with no value (ex: `<input disabled />`). */
interface JsxAttributeValueBoolean {
  readonly kind: "boolean";
  readonly node: null;
  toStatic(): true;
}

/** JSX element used as an attribute value (ex: `<Slot icon=<Icon /> />`). */
interface JsxAttributeValueElement {
  readonly kind: "element";
  readonly node: TSESTree.JSXElement;
  toStatic(): null;
}

/** Literal value (ex: `<img alt="photo" />`). */
interface JsxAttributeValueLiteral {
  readonly kind: "literal";
  readonly node: TSESTree.Literal;
  toStatic(): TSESTree.Literal["value"];
}

/** Expression container value (ex: `<Comp value={expr} />`). */
interface JsxAttributeValueUnknown {
  readonly kind: "unknown";
  readonly node: TSESTree.JSXExpressionContainer["expression"];
  toStatic(): unknown;
}

/** Empty expression container (ex: `<Comp value={} />`). */
interface JsxAttributeValueMissing {
  readonly kind: "missing";
  readonly node: TSESTree.JSXEmptyExpression;
  toStatic(): null;
}

/** Spread child expression (ex: `{...items}` as children). */
interface JsxAttributeValueSpreadChild {
  readonly kind: "spreadChild";
  getChildren(): unknown;
  readonly node: TSESTree.JSXSpreadChild["expression"];
  toStatic(): null;
}

/** Spread props (ex: `<Comp {...props} />`). */
interface JsxAttributeValueSpreadProps {
  readonly kind: "spreadProps";
  getProperty(name: string): unknown;
  readonly node: TSESTree.JSXSpreadAttribute["argument"];
  toStatic(): null;
}
