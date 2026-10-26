import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import { isFunction, isString } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * A test that determines whether a JSX element or fragment matches.
 *
 * - `string` matches the full element type (ex: "div", "React.Fragment"; a
 *   fragment has type `""`)
 * - `readonly string[]` matches when the full element type equals any entry
 * - `function` receives the full element type string and the element or fragment node.
 *
 * The function form receives `(elementType, node)`; this order is intentional:
 * the element type is the primary subject of the test.
 */
export type ElementTest =
  | string
  | readonly string[]
  | ((elementType: string, node: TSESTreeJSXElementLike) => boolean);

/**
 * Get the string representation of a JSX element or fragment's type.
 *
 * - `<div>` -> `"div"`
 * - `<Foo.Bar>` -> `"Foo.Bar"`
 * - `<React.Fragment>` -> `"React.Fragment"`
 * - `<xml:space>` -> `"xml:space"`
 * - `<></>` -> `""`.
 * @param node The `JSXElement` or `JSXFragment` node.
 * @returns The fully qualified element type string.
 */
export function getElementFullType(node: TSESTreeJSXElementLike): string {
  if (node.type === AST.JSXFragment) return "";
  function getQualifiedName(
    node:
      | TSESTree.JSXIdentifier
      | TSESTree.JSXNamespacedName
      | TSESTree.JSXMemberExpression,
  ): string {
    switch (node.type) {
      case AST.JSXIdentifier:
        return node.name;
      case AST.JSXNamespacedName:
        return node.namespace.name + ":" + node.name.name;
      default:
        return getQualifiedName(node.object) + "." + getQualifiedName(node.property);
    }
  }
  return getQualifiedName(node.openingElement.name);
}

/**
 * Get the self name (last dot-separated segment) of a JSX element or fragment type.
 *
 * - `<Foo.Bar.Baz>` -> `"Baz"`
 * - `<div>` -> `"div"`
 * - `<xml:space>` -> `"xml:space"` (only `.` separates segments, not `:`)
 * - `<></>` -> `""`
 * @param node The `JSXElement` or `JSXFragment` node.
 * @returns The last dot-separated segment of the element type, or `""` for fragments.
 */
export function getElementSelfType(node: TSESTreeJSXElementLike): string {
  return getElementFullType(node).split(".").at(-1) ?? "";
}

/**
 * Check if the element test is the function form of {@link ElementTest}.
 * @param test The element test to check.
 * @returns `true` if the test is a function.
 */
function isElementTestFunction(test: ElementTest): test is (elementType: string, node: TSESTreeJSXElementLike) => boolean {
  return isFunction(test);
}

/**
 * Check if the node is a `JSXElement` (or `JSXFragment`), optionally matching a given test.
 *
 * Modelled after [`hast-util-is-element`](https://github.com/syntax-tree/hast-util-is-element):
 * the `test` parameter controls what counts as a match. When called without a test,
 * the function acts as a simple type guard for `JSXElement | JSXFragment`.
 * @param node The node to check.
 * @param test Optional test to match the full element type against.
 * @returns `true` if the node is a matching JSX element or fragment.
 */
export function isElement(node: TSESTree.Node | null | undefined, test?: ElementTest): node is TSESTreeJSXElementLike {
  if (node == null) return false;
  if (node.type !== AST.JSXElement && node.type !== AST.JSXFragment) return false;
  // No test, confirm that it is a JSX element / fragment.
  if (test == null) return true;
  const type = getElementFullType(node);
  if (isString(test)) return type === test;
  if (isElementTestFunction(test)) return test(type, node);
  return test.includes(type);
}

/**
 * Check if the node is a React Fragment element.
 *
 * Recognizes the shorthand `<>...</>` syntax (`JSXFragment`) and the explicit
 * `<Fragment>` / `<React.Fragment>` form (`JSXElement`). Matching compares only
 * the last dot-separated segment, so with the usual `"React.Fragment"` factory
 * both `<React.Fragment>` and `<Fragment>` match.
 *
 * The factory is a required parameter (no implicit `"React.Fragment"` default) so
 * that callers always pass the project-configured pragma — see `getJSXConfig` in
 * `@eslint-react/core` — and cannot silently use the wrong factory under a custom
 * JSX runtime (ex: Preact). Note the self-name comparison is a heuristic: any
 * `<*.Fragment>` member expression matches, regardless of the qualifier.
 * @param node The node to check.
 * @param jsxFragmentFactory The configured fragment factory string (ex: "React.Fragment");
 * only its last dot-separated segment is compared.
 * @returns `true` if the node is a `JSXFragment` or its element type's self name matches the configured fragment self name.
 */
export function isFragmentElement(node: TSESTree.Node | null | undefined, jsxFragmentFactory: string): node is TSESTreeJSXElementLike {
  if (node == null) return false;
  if (node.type === AST.JSXFragment) return true;
  if (node.type !== AST.JSXElement) return false;

  const fragment = jsxFragmentFactory.split(".").at(-1) ?? "Fragment";
  return getElementFullType(node).split(".").at(-1) === fragment;
}

/**
 * Check if the node is a host (intrinsic / DOM) element, that is, a `JSXElement`
 * whose tag name starts with an ASCII lowercase letter (ex: `<div>` vs
 * `<MyComponent>`). For namespaced names, the local part is checked (ex: `rect`
 * in `<svg:rect>`). Member-expression names (ex: `<foo.Bar>`) are not host elements.
 * @param node The node to check.
 * @returns `true` if the node is a `JSXElement` with a plain or namespaced tag
 * name starting with an ASCII lowercase letter.
 */
export function isHostElement(node: TSESTree.Node | null | undefined): node is TSESTree.JSXElement {
  if (node?.type !== AST.JSXElement) return false;
  const name = node.openingElement.name;
  if (name.type === AST.JSXIdentifier) return /^[a-z]/u.test(name.name);
  if (name.type === AST.JSXNamespacedName) return /^[a-z]/u.test(name.name.name);
  return false;
}
