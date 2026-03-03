import * as ast from "@eslint-react/ast";
import { identity } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import { resolve } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";

import type { JsxAttributeValue } from "./jsx-attribute-value";
import type { JsxConfig } from "./jsx-config";
import { getJsxConfigFromAnnotation, getJsxConfigFromContext } from "./jsx-config";
import { stringifyJsx } from "./jsx-stringify";

// ---------------------------------------------------------------------------
// JsxInspector – fluent API for analysing JSX AST nodes
// ---------------------------------------------------------------------------

/**
 * A stateful helper that binds an ESLint `RuleContext` once and exposes
 * ergonomic methods for the most common JSX inspection tasks that rules need.
 *
 * ### Typical usage inside a rule's `create` function
 *
 * ```ts
 * export function create(context: RuleContext) {
 *   const jsx = JsxInspector.from(context);
 *
 *   return defineRuleListener({
 *     JSXElement(node) {
 *       // element type
 *       const type = jsx.getElementType(node);           // "div" | "React.Fragment" | …
 *
 *       // attribute lookup + value resolution in one step
 *       const val  = jsx.getAttributeValue(node, "sandbox");
 *       if (typeof val?.getStatic() === "string") { … }
 *
 *       // simple boolean checks
 *       if (jsx.isHostElement(node)) { … }
 *       if (jsx.isFragmentElement(node)) { … }
 *       if (jsx.hasAttribute(node, "key")) { … }
 *     },
 *   });
 * }
 * ```
 */
export class JsxInspector {
  readonly context: RuleContext;

  /**
   * Merged JSX configuration (tsconfig compiler options + pragma annotations).
   * The result is lazily computed and cached for the lifetime of this inspector.
   */
  get jsxConfig(): Required<JsxConfig> {
    return (this.#jsxConfig ??= {
      ...getJsxConfigFromContext(this.context),
      ...getJsxConfigFromAnnotation(this.context),
    });
  }

  // ----- construction ------------------------------------------------------

  /**
   * Lazily resolved & cached JSX configuration (merged from tsconfig +
   * pragma annotations). Use {@link jsxConfig} to access.
   */
  #jsxConfig: Required<JsxConfig> | undefined;

  private constructor(context: RuleContext) {
    this.context = context;
  }

  // ----- JSX configuration -------------------------------------------------

  /**
   * Walk **up** the AST from `node` to find the nearest ancestor that is a
   * `JSXAttribute` and passes the optional `test` predicate.
   * @param node The starting node for the search.
   * @param test A predicate function to test each ancestor node.
   */
  static findParentAttribute(
    node: TSESTree.Node,
    test: (node: TSESTree.JSXAttribute) => boolean = () => true,
  ): TSESTree.JSXAttribute | null {
    const guard = (n: TSESTree.Node): n is TSESTree.JSXAttribute => {
      return n.type === AST.JSXAttribute && test(n);
    };
    return ast.findParentNode(node, guard);
  }

  // ----- element type ------------------------------------------------------

  /**
   * Create a new `JsxInspector` bound to the given rule context.
   * @param context The ESLint rule context to bind to this inspector instance.
   */
  static from(context: RuleContext): JsxInspector {
    return new JsxInspector(context);
  }

  /**
   * Whether the node is a `JSXText` or a `Literal` node.
   * @param node The node to check.
   */
  static isJsxText(node: TSESTree.Node | null): node is TSESTree.JSXText | TSESTree.Literal {
    if (node == null) return false;
    return node.type === AST.JSXText || node.type === AST.Literal;
  }

  // ----- element predicates ------------------------------------------------

  /**
   * Find a JSX attribute (or spread attribute containing the property) by name
   * on a given element.
   *
   * Returns the **last** matching attribute (to mirror React's behaviour where
   * later props win), or `undefined` if not found.
   * @param node The JSX element to search for the attribute.
   * @param name The name of the attribute to find (e.g. `"className"`).
   */
  findAttribute(
    node: TSESTree.JSXElement,
    name: string,
  ): ast.TSESTreeJSXAttributeLike | undefined {
    return node.openingElement.attributes.findLast((attr) => {
      if (attr.type === AST.JSXAttribute) {
        return stringifyJsx(attr.name) === name;
      }
      switch (attr.argument.type) {
        case AST.Identifier: {
          const initNode = resolve(this.context, attr.argument);
          if (initNode?.type === AST.ObjectExpression) {
            return ast.findProperty(initNode.properties, name) != null;
          }
          return false;
        }
        case AST.ObjectExpression:
          return ast.findProperty(attr.argument.properties, name) != null;
      }
      return false;
    });
  }

  /**
   * Get the stringified name of a `JSXAttribute` node
   * (e.g. `"className"`, `"aria-label"`, `"xml:space"`).
   * @param node The `JSXAttribute` node to extract the name from.
   * @returns The stringified name of the attribute.
   */
  getAttributeName(node: TSESTree.JSXAttribute): string {
    return stringifyJsx(node.name);
  }

  // ----- attribute helpers -------------------------------------------------

  /**
   * Resolve the static value of an attribute, automatically handling the
   * `spreadProps` case by extracting the named property.
   *
   * This eliminates the repetitive pattern:
   * ```ts
   * const v = core.resolveJsxAttributeValue(ctx, attr);
   * const s = v.kind === "spreadProps" ? v.getProperty(name) : v.toStatic();
   * ```
   *
   * Returns `undefined` when the attribute is not present or its value
   * cannot be statically determined.
   * @param node The JSX element to search for the attribute.
   * @param name The name of the attribute to resolve (e.g. `"className"`).
   * @returns The static value of the attribute, or `undefined` if not found or not statically resolvable.
   */
  getAttributeStaticValue(
    node: TSESTree.JSXElement,
    name: string,
  ): unknown {
    const attr = this.findAttribute(node, name);
    if (attr == null) return undefined;
    const resolved = this.resolveAttributeValue(attr);
    if (resolved.kind === "spreadProps") {
      return resolved.getProperty(name);
    }
    return resolved.toStatic();
  }

  /**
   * **All-in-one helper** – find an attribute by name on an element *and*
   * resolve its value in a single call.
   *
   * Returns `undefined` when the attribute is not present.
   * @param node The JSX element to search for the attribute.
   * @param name The name of the attribute to find and resolve (e.g. `"className"`).
   * @returns A descriptor of the attribute's value that can be further inspected, or `undefined` if the attribute is not found.
   */
  getAttributeValue(
    node: TSESTree.JSXElement,
    name: string,
  ): JsxAttributeValue | undefined {
    const attr = this.findAttribute(node, name);
    if (attr == null) return undefined;
    return this.resolveAttributeValue(attr);
  }

  /**
   * Get the **self name** (last segment) of a JSX element type.
   *
   * - `<Foo.Bar.Baz>` → `"Baz"`
   * - `<div>` → `"div"`
   * - `<></>` → `""`
   * @param node The JSX element or fragment to extract the self name from.
   */
  getElementSelfName(node: TSESTree.JSXElement | TSESTree.JSXFragment): string {
    return this.getElementType(node).split(".").at(-1) ?? "";
  }

  // ----- attribute value resolution ----------------------------------------

  /**
   * Get the string representation of a JSX element's type.
   *
   * - `<div>` → `"div"`
   * - `<Foo.Bar>` → `"Foo.Bar"`
   * - `<React.Fragment>` → `"React.Fragment"`
   * - `<></>` (JSXFragment) → `""`
   * @param node The JSX element or fragment to extract the type from.
   */
  getElementType(node: TSESTree.JSXElement | TSESTree.JSXFragment): string {
    if (node.type === AST.JSXFragment) {
      return "";
    }
    return stringifyJsx(node.openingElement.name);
  }

  /**
   * Shorthand: check whether an attribute exists on the element.
   * @param node The JSX element to check for the attribute.
   * @param name The name of the attribute to check for (e.g. `"className"`).
   * @returns `true` if the attribute exists on the element, `false` otherwise.
   */
  hasAttribute(node: TSESTree.JSXElement, name: string): boolean {
    return this.findAttribute(node, name) != null;
  }

  /**
   * Whether the node is a React **Fragment** element (either `<Fragment>` /
   * `<React.Fragment>` or the shorthand `<>` syntax).
   *
   * The check honours the configured `jsxFragmentFactory`.
   * @param node The node to check.
   */
  isFragmentElement(node: TSESTree.Node): node is TSESTree.JSXElement | TSESTree.JSXFragment {
    if (node.type === AST.JSXFragment) return true;
    if (node.type !== AST.JSXElement) return false;
    const fragment = this.jsxConfig.jsxFragmentFactory.split(".").at(-1) ?? "Fragment";
    return this.getElementType(node).split(".").at(-1) === fragment;
  }

  // ----- children / text helpers -------------------------------------------

  /**
   * Whether the node is a **host** (intrinsic / DOM) element – i.e. its tag
   * name starts with a lowercase letter.
   * @param node The node to check.
   */
  isHostElement(node: TSESTree.Node): node is TSESTree.JSXElement {
    return node.type === AST.JSXElement
      && node.openingElement.name.type === AST.JSXIdentifier
      && /^[a-z]/u.test(node.openingElement.name.name);
  }

  // ----- traversal helpers -------------------------------------------------

  /**
   * Resolve the *value* of a JSX attribute (or spread attribute) into a
   * descriptor that can be inspected further.
   *
   * See {@link JsxAttributeValue} for the full set of `kind` discriminants.
   * @param attribute The attribute node to resolve the value of.
   * @returns A descriptor of the attribute's value that can be further inspected.
   */
  resolveAttributeValue(attribute: ast.TSESTreeJSXAttributeLike) {
    if (attribute.type === AST.JSXAttribute) {
      return this.#resolveJsxAttribute(attribute);
    }
    return this.#resolveJsxSpreadAttribute(attribute);
  }

  // ----- private helpers ---------------------------------------------------

  #resolveJsxAttribute(node: TSESTree.JSXAttribute) {
    const scope = this.context.sourceCode.getScope(node);
    if (node.value == null) {
      return {
        kind: "boolean",
        toStatic() {
          return true;
        },
      } as const satisfies JsxAttributeValue;
    }
    switch (node.value.type) {
      case AST.Literal: {
        const staticValue = node.value.value;
        return {
          kind: "literal",
          node: node.value,
          toStatic() {
            return staticValue;
          },
        } as const satisfies JsxAttributeValue;
      }
      case AST.JSXExpressionContainer: {
        const expr = node.value.expression;
        if (expr.type === AST.JSXEmptyExpression) {
          return {
            kind: "missing",
            node: expr,
            toStatic() {
              return null;
            },
          } as const satisfies JsxAttributeValue;
        }
        return {
          kind: "expression",
          node: expr,
          toStatic() {
            return getStaticValue(expr, scope)?.value;
          },
        } as const satisfies JsxAttributeValue;
      }
      case AST.JSXElement:
        return {
          kind: "element",
          node: node.value,
          toStatic() {
            return null;
          },
        } as const satisfies JsxAttributeValue;
      case AST.JSXSpreadChild: {
        const expr = node.value.expression;
        return {
          kind: "spreadChild",
          node: node.value.expression,
          toStatic() {
            return null;
          },

          getChildren(_at: number) {
            return null;
          },
        } as const satisfies JsxAttributeValue;
      }
    }
  }

  #resolveJsxSpreadAttribute(node: TSESTree.JSXSpreadAttribute) {
    const scope = this.context.sourceCode.getScope(node);
    return {
      kind: "spreadProps",
      node: node.argument,
      toStatic() {
        return null;
      },

      getProperty(name: string) {
        return match(getStaticValue(node.argument, scope)?.value)
          .with({ [name]: P.select(P.any) }, identity)
          .otherwise(() => null);
      },
    } as const satisfies JsxAttributeValue;
  }
}
