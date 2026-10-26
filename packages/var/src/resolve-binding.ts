import { Check } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { hasProperty } from "@local/eff";
import { type Definition, DefinitionType, type Scope, type ScopeVariable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Options shared by the identifier-resolution helpers.
 *
 * Used by {@link resolve}, {@link resolveOrigin}, and the internal binding
 * helpers.
 */
export interface ResolveOptions {
  /**
   * Index of the definition to select (default: `0`; negative indexes count from the end).
   *
   * `resolve` and `resolveOrigin` default to the first definition.
   * `resolveOriginChain` applies this index at every step. `resolveObjectType`
   * defaults to `-1` (the latest definition).
   */
  at?: number;
  /**
   * Only look up the variable in the identifier's own scope (default: `false`).
   *
   * When `false`, the scope chain is traversed upward so references to
   * outer-scope bindings are resolved. `resolveObjectType` exposes the same
   * concept as `scope: "local" | "chain"`.
   */
  localOnly?: boolean;
}

/** A variable together with the selected definition. */
export interface Binding {
  /**
   * The selected definition of that variable, or `null` when the variable has
   * no definition (for example a global configured through `languageOptions.globals`).
   */
  definition: Definition | null;
  /** The variable the identifier refers to. */
  variable: ScopeVariable;
}

/** Which node a definition projects to. */
export type BindingProjection = "value" | "origin";

/**
 * Resolve an identifier to its variable and the selected definition, starting
 * from an already-computed scope.
 * @param scope The scope of the identifier.
 * @param node The identifier to resolve.
 * @param options Optional definition selection settings.
 * @returns The variable and definition, or `null` when the identifier cannot be resolved.
 */
export function getBindingFromScope(scope: Scope, node: TSESTree.Identifier, options?: ResolveOptions): Binding | null {
  const { at = 0, localOnly = false } = options ?? {};
  const variable = localOnly ? scope.set.get(node.name) : findVariable(scope, node);
  if (variable == null) return null;
  // A variable may exist without a definition (configured/global variables,
  // `arguments`); callers that need a definition check for `null` themselves.
  return { definition: variable.defs.at(at) ?? null, variable };
}

/**
 * Resolve an identifier to its variable and the selected definition.
 * @param context The ESLint rule context.
 * @param node The identifier to resolve.
 * @param options Optional definition selection settings.
 * @returns The variable and definition, or `null` when the identifier cannot be resolved.
 */
export function getBinding(context: RuleContext, node: TSESTree.Identifier, options?: ResolveOptions): Binding | null {
  return getBindingFromScope(context.sourceCode.getScope(node), node, options);
}

/**
 * Project a definition to the AST node it denotes in the requested mode.
 *
 * - `"value"`: the node that represents the binding's own value.
 * - `"origin"`: the node the value originates from (optional for destructured
 *   bindings, parameters, and imports).
 *
 * @param definition The definition to project.
 * @param projection The projection mode.
 * @returns The projected node, or `null` when the definition has none in this mode.
 */
export function projectBinding(definition: Definition, projection: BindingProjection): TSESTree.Node | null {
  switch (definition.type) {
    // Return function declaration/expression node itself
    case DefinitionType.FunctionName:
    case DefinitionType.ClassName:
      return definition.node;

    // Return the initializer expression (if any)
    case DefinitionType.Variable: {
      const { id, init } = definition.node;
      if (init == null) return null;
      // For destructured bindings (e.g. `const { a } = obj`), the declarator's
      // `init` is the source object, not the binding's own value. Only a plain
      // identifier binding (`id === definition.name`) has `init` as its value.
      if (projection === "value" && id !== definition.name) return null;
      // Guard against unexpected AST shapes that could cause infinite loops
      if (hasProperty(init, "declarations")) return null;
      return init;
    }

    // A parameter's value is supplied by the caller; only its declaration site
    // (the containing function) is a meaningful origin.
    case DefinitionType.Parameter:
      return projection === "origin" && Check.isFunction(definition.node) ? definition.node : null;

    // Return enum declaration for member inspection
    case DefinitionType.TSEnumName:
      return definition.node;

    // Return enum member's initializer, if present
    case DefinitionType.TSEnumMember:
      return definition.node.initializer ?? null;

    // Import bindings reference external values; the import specifier is their
    // closest local origin, while they have no locally available value.
    case DefinitionType.ImportBinding:
      return projection === "origin" ? definition.node : null;

    // Catch clause, module, type, and implicit-global definitions have no
    // value/origin node that rule analysis can use.
    case DefinitionType.CatchClause:
    case DefinitionType.ImplicitGlobalVariable:
    case DefinitionType.TSModuleName:
    case DefinitionType.Type:
      return null;

    default:
      return null;
  }
}
