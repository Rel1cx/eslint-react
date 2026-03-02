import * as ast from "@eslint-react/ast";
import { identity } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import { resolve } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
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
   * Lazily resolved & cached JSX configuration (merged from tsconfig +
   * pragma annotations). Use {@link jsxConfig} to access.
   */
  #jsxConfig: Required<JsxConfig> | undefined;

  // ----- construction ------------------------------------------------------

  private constructor(context: RuleContext) {
    this.context = context;
  }

  /**
   * Create a new `JsxInspector` bound to the given rule context.
   */
  static from(context: RuleContext): JsxInspector {
    return new JsxInspector(context);
  }

  // ----- JSX configuration -------------------------------------------------

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

  // ----- element type ------------------------------------------------------

  /**
   * Get the string representation of a JSX element's type.
   *
   * - `<div>` → `"div"`
   * - `<Foo.Bar>` → `"Foo.Bar"`
   * - `<React.Fragment>` → `"React.Fragment"`
   * - `<></>` (JSXFragment) → `""`
   */
  getElementType(node: TSESTree.JSXElement | TSESTree.JSXFragment): string {
    if (node.type === AST.JSXFragment) {
      return "";
    }
    return stringifyJsx(node.openingElement.name);
  }

  /**
   * Get the **self name** (last segment) of a JSX element type.
   *
   * - `<Foo.Bar.Baz>` → `"Baz"`
   * - `<div>` → `"div"`
   * - `<></>` → `""`
   */
  getElementSelfName(node: TSESTree.JSXElement | TSESTree.JSXFragment): string {
    return this.getElementType(node).split(".").at(-1) ?? "";
  }

  // ----- element predicates ------------------------------------------------

  /**
   * Whether the node is a **host** (intrinsic / DOM) element – i.e. its tag
   * name starts with a lowercase letter.
   */
  isHostElement(node: TSESTree.Node): node is TSESTree.JSXElement {
    return node.type === AST.JSXElement
      && node.openingElement.name.type === AST.JSXIdentifier
      && /^[a-z]/u.test(node.openingElement.name.name);
  }

  /**
   * Whether the node is a React **Fragment** element (either `<Fragment>` /
   * `<React.Fragment>` or the shorthand `<>` syntax).
   *
   * The check honours the configured `jsxFragmentFactory`.
   */
  isFragmentElement(node: TSESTree.Node): node is TSESTree.JSXElement | TSESTree.JSXFragment {
    if (node.type === AST.JSXFragment) return true;
    if (node.type !== AST.JSXElement) return false;
    const fragment = this.jsxConfig.jsxFragmentFactory.split(".").at(-1) ?? "Fragment";
    return this.getElementType(node).split(".").at(-1) === fragment;
  }

  // ----- attribute helpers -------------------------------------------------

  /**
   * Find a JSX attribute (or spread attribute containing the property) by name
   * on a given element.
   *
   * Returns the **last** matching attribute (to mirror React's behaviour where
   * later props win), or `undefined` if not found.
   */
  findAttribute(
    node: TSESTree.JSXElement,
    name: string,
    initialScope?: Scope,
  ): ast.TSESTreeJSXAttributeLike | undefined {
    const scope = initialScope ?? this.context.sourceCode.getScope(node);
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
   * Shorthand: check whether an attribute exists on the element.
   */
  hasAttribute(node: TSESTree.JSXElement, name: string, initialScope?: Scope): boolean {
    return this.findAttribute(node, name, initialScope) != null;
  }

  /**
   * Get the stringified name of a `JSXAttribute` node
   * (e.g. `"className"`, `"aria-label"`, `"xml:space"`).
   */
  getAttributeName(node: TSESTree.JSXAttribute): string {
    return stringifyJsx(node.name);
  }

  // ----- attribute value resolution ----------------------------------------

  /**
   * Resolve the *value* of a JSX attribute (or spread attribute) into a
   * descriptor that can be inspected further.
   *
   * See {@link JsxAttributeValue} for the full set of `kind` discriminants.
   */
  resolveAttributeValue(attribute: ast.TSESTreeJSXAttributeLike) {
    const initialScope = this.context.sourceCode.getScope(attribute);

    if (attribute.type === AST.JSXAttribute) {
      return this.#resolveJsxAttribute(attribute, initialScope);
    }
    return this.#resolveJsxSpreadAttribute(attribute, initialScope);
  }

  /**
   * **All-in-one helper** – find an attribute by name on an element *and*
   * resolve its value in a single call.
   *
   * Returns `undefined` when the attribute is not present.
   */
  getAttributeValue(
    node: TSESTree.JSXElement,
    name: string,
    initialScope?: Scope,
  ): JsxAttributeValue | undefined {
    const attr = this.findAttribute(node, name, initialScope);
    if (attr == null) return undefined;
    return this.resolveAttributeValue(attr);
  }

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
   */
  getAttributeStaticValue(
    node: TSESTree.JSXElement,
    name: string,
    initialScope?: Scope,
  ): unknown {
    const attr = this.findAttribute(node, name, initialScope);
    if (attr == null) return undefined;
    const resolved = this.resolveAttributeValue(attr);
    if (resolved.kind === "spreadProps") {
      return resolved.getProperty(name);
    }
    return resolved.toStatic();
  }

  // ----- children / text helpers -------------------------------------------

  /**
   * Whether the node is a `JSXText` or a `Literal` node.
   */
  static isJsxText(node: TSESTree.Node | null): node is TSESTree.JSXText | TSESTree.Literal {
    if (node == null) return false;
    return node.type === AST.JSXText || node.type === AST.Literal;
  }

  // ----- traversal helpers -------------------------------------------------

  /**
   * Walk **up** the AST from `node` to find the nearest ancestor that is a
   * `JSXAttribute` and passes the optional `test` predicate.
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

  // ----- private helpers ---------------------------------------------------

  #resolveJsxAttribute(
    node: TSESTree.JSXAttribute,
    initialScope: Scope,
  ) {
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
              return "{}";
            },
          } as const satisfies JsxAttributeValue;
        }
        return {
          kind: "expression",
          node: expr,
          toStatic() {
            return getStaticValue(expr, initialScope)?.value;
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
            return getStaticValue(expr, initialScope)?.value;
          },
          getChildren(_at: number) {
            return null;
          },
        } as const satisfies JsxAttributeValue;
      }
    }
  }

  #resolveJsxSpreadAttribute(
    node: TSESTree.JSXSpreadAttribute,
    initialScope: Scope,
  ) {
    return {
      kind: "spreadProps",
      node: node.argument,
      toStatic() {
        return getStaticValue(node.argument, initialScope)?.value;
      },
      getProperty(name: string) {
        return match(getStaticValue(node.argument, initialScope)?.value)
          .with({ [name]: P.select(P.any) }, identity)
          .otherwise(() => null);
      },
    } as const satisfies JsxAttributeValue;
  }
}
