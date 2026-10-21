import type { RuleContext } from "@eslint-react/eslint";
import { hasProperty } from "@local/eff";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Resolve an identifier to the AST node that represents its value,
 * suitable for use in ESLint rule analysis.
 *
 * The resolution follows these rules per definition type:
 *
 * | Definition type          | `def.node`                                   | Returns                            |
 * |--------------------------|----------------------------------------------|------------------------------------|
 * | `CatchClause`            | `CatchClause`                                | `null`                             |
 * | `ClassName`              | `ClassDeclaration` / `ClassExpression`       | `def.node`                         |
 * | `FunctionName`           | `FunctionDeclaration` / `FunctionExpression` | `def.node`                         |
 * | `ImplicitGlobalVariable` | any node                                     | `null`                             |
 * | `ImportBinding`          | import specifier                             | `null`                             |
 * | `Parameter`              | containing function node                     | `null` (the value is supplied by the caller) |
 * | `TSEnumMember`           | `TSEnumMember`                               | `def.node.initializer` (or `null`) |
 * | `TSEnumName`             | `TSEnumDeclaration`                          | `def.node`                         |
 * | `TSModuleName`           | `TSModuleDeclaration`                        | `null`                             |
 * | `Type`                   | type alias node                              | `null`                             |
 * | `Variable`               | `VariableDeclarator`                         | `def.node.init` for a plain identifier binding; `null` for destructured bindings or missing init |
 *
 * @param context The ESLint rule context.
 * @param node The identifier to resolve.
 * @param options Optional settings:
 * - `at`: Index of the definition to resolve (default: `0` for the first definition).
 * - `localOnly`: If `true`, only consider variables declared in the same scope as the identifier
 *   (this will miss variables declared in an outer scope). When `false` (default), traverse the
 *   scope chain upward via `findVariable` so that references to outer-scope bindings are resolved
 *   correctly.
 * @returns The resolved node, or `null` if the identifier cannot be resolved to a value node.
 *
 * For origin/pedigree tracking that maps destructured bindings to the declarator's
 * initializer, see {@link resolveOrigin}.
 */
export function resolve(
  context: RuleContext,
  node: TSESTree.Identifier,
  options?: Partial<{
    at: number;
    localOnly: boolean;
  }>,
): TSESTree.Node | null {
  const { at = 0, localOnly = false } = options ?? {};
  const scope = context.sourceCode.getScope(node);
  const variable = localOnly
    ? scope.set.get(node.name)
    : findVariable(scope, node);
  if (variable == null) return null;
  const def = variable.defs.at(at);
  if (def == null) return null;

  switch (def.type) {
    // Return function declaration/expression node itself
    case DefinitionType.FunctionName:
      return def.node;

    // Return class declaration/expression node itself
    case DefinitionType.ClassName:
      return def.node;

    // Return the initializer expression (if any)
    case DefinitionType.Variable: {
      const { id, init } = def.node;
      // For destructured bindings (e.g. `const { a } = obj`), `def.node` is the whole
      // declarator whose `init` is the source object, not the binding's own value.
      // Only a plain identifier binding (`id === def.name`) has `init` as its value.
      if (id !== def.name) return null;
      if (init == null) return null;
      // Guard against unexpected AST shapes that could cause infinite loops
      if (hasProperty(init, "declarations")) return null;
      return init;
    }

    // A parameter's value is supplied by the caller and is not statically known.
    // (`resolveOrigin` returns the containing function node as the binding's origin.)
    case DefinitionType.Parameter:
      return null;

    // Return enum declaration for member inspection
    case DefinitionType.TSEnumName:
      return def.node;

    // Return enum member's initializer, if present
    case DefinitionType.TSEnumMember:
      return def.node.initializer ?? null;

    // Import bindings reference external values - not locally available
    case DefinitionType.ImportBinding:
      return null;

    // Catch clause bindings hold dynamic error values - not statically determinable
    case DefinitionType.CatchClause:
      return null;

    // Namespace/module names are structural, not value-producing
    case DefinitionType.TSModuleName:
      return null;

    // Type aliases exist only in type system, no runtime value
    case DefinitionType.Type:
      return null;

    // Implicit globals have no local initializer
    case DefinitionType.ImplicitGlobalVariable:
      return null;

    default:
      return null;
  }
}
