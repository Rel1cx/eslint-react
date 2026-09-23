import { Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { type AttributeDescriptor, getAttributeDescriptor, resolveAttribute } from "./attribute-descriptor";
import { findSpreadProperty } from "./attribute-find";
import { getChildren } from "./children";
import { getElementFullType } from "./element-type";

/** A structural description of an authored JSX element, fragment, or `createElement` call. */
export type ElementDescriptor =
  & (
    | { readonly kind: "jsx"; readonly node: TSESTree.JSXElement | TSESTree.JSXFragment }
    | { readonly kind: "createElement"; readonly node: TSESTree.CallExpression }
  )
  & {
    /** The syntactic element type, unquoted for string literals and empty for JSX fragments. */
    readonly type: string;
    /**
     * Get nested JSX children (using the JSX `getChildren` helper) or positional call arguments.
     * Explicit attribute/config children remain available through `getProp("children")`, not this method.
     * Nodes retain their syntax and identity: no runtime flattening, filtering, or spread evaluation occurs.
     */
    getChildren(): readonly TSESTree.Node[];
    /** Read authored attributes/config properties only, without synthesizing children or applying defaultProps. */
    getProp(name: string): AttributeDescriptor | undefined;
  };

/**
 * Describe an element without constructing or evaluating a React element.
 *
 * Calls use the same name-based heuristic as core's API checks: bare `createElement`
 * or a fully qualified name ending in `.createElement`. There is no import identity
 * or alias resolution; unrelated APIs with that name also match.
 * TypeScript wrappers are unwrapped. String literal types use their value; other
 * types use their syntactic fully qualified name/source text, not runtime inference.
 * Missing types, non-string literal types, and spreads in the type/config positions
 * are rejected because the element type or argument layout cannot be described reliably.
 * @param context The ESLint rule context, used for source text and authored prop resolution.
 * @param node The node to describe.
 * @returns An element descriptor, or `undefined` for unsupported nodes or argument layouts.
 */
export function resolveElement(context: RuleContext, node: TSESTree.Node): ElementDescriptor | undefined {
  const element = Extract.unwrap(node);
  if (element.type === AST.JSXElement || element.type === AST.JSXFragment) {
    return {
      kind: "jsx",
      type: getElementFullType(element),
      getChildren: () => getChildren(element),
      getProp: (name) => element.type === AST.JSXElement ? getAttributeDescriptor(context, element, name) : undefined,
      node: element,
    };
  }
  if (element.type !== AST.CallExpression) return undefined;

  const getText = (node: TSESTree.Node) => context.sourceCode.getText(node);
  const name = Extract.getFullyQualifiedName(Extract.unwrap(element.callee), getText);
  if (name !== "createElement" && !name.endsWith(".createElement")) return undefined;

  const [typeArgument, config] = element.arguments;
  if (typeArgument == null || typeArgument.type === AST.SpreadElement || config?.type === AST.SpreadElement) return undefined;
  const type = Extract.unwrap(typeArgument);
  if (type.type === AST.Literal && typeof type.value !== "string") return undefined;

  return {
    kind: "createElement",
    type: type.type === AST.Literal ? type.value : Extract.getFullyQualifiedName(type, getText),
    getChildren: () => element.arguments.slice(2),
    getProp(name) {
      if (config == null) return undefined;
      const property = findSpreadProperty(context, config, name);
      return property == null ? undefined : resolveAttribute(context, property);
    },
    node: element,
  };
}
