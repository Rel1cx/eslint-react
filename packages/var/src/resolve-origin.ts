import { Check } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Resolve an identifier to the AST node its value **originates from**,
 * suitable for origin/pedigree tracking in ESLint rule analysis.
 *
 * The resolution follows these rules per definition type:
 *
 * | Definition type          | `def.node`                                   | Returns                            |
 * |--------------------------|----------------------------------------------|------------------------------------|
 * | `CatchClause`            | `CatchClause`                                | `null`                             |
 * | `ClassName`              | `ClassDeclaration` / `ClassExpression`       | `def.node`                         |
 * | `FunctionName`           | `FunctionDeclaration` / `FunctionExpression` | `def.node`                         |
 * | `ImplicitGlobalVariable` | any node                                     | `null`                             |
 * | `ImportBinding`          | import specifier                             | `def.node` (the import specifier)  |
 * | `Parameter`              | containing function node                     | `def.node` (if a real function)    |
 * | `TSEnumMember`           | `TSEnumMember`                               | `def.node.initializer` (or `null`) |
 * | `TSEnumName`             | `TSEnumDeclaration`                          | `def.node`                         |
 * | `TSModuleName`           | `TSModuleDeclaration`                        | `null`                             |
 * | `Type`                   | type alias node                              | `null`                             |
 * | `Variable`               | `VariableDeclarator`                         | `def.node.init` (or `null`), including for destructured bindings |
 *
 * Unlike {@link resolve}, a binding declared through a destructuring
 * pattern (e.g. `setState` in `const [state, setState] = useState()`) resolves to the
 * declarator's initializer (the `useState()` call), i.e. the source expression the
 * binding derives from rather than the binding's own value; and a parameter resolves
 * to the containing function node (the binding's declaration site) instead of `null`;
 * and an import binding resolves to its import specifier (whose parent
 * `ImportDeclaration` carries the module source) instead of `null`.
 *
 * Use this for origin/pedigree tracking ("what produced this value?"); use
 * {@link resolve} when the precise value of the binding is needed.
 *
 * @param context The ESLint rule context.
 * @param node The identifier to resolve.
 * @param options Optional settings:
 * - `at`: Index of the definition to resolve (default: `0` for the first definition).
 * - `localOnly`: If `true`, only consider variables declared in the same scope as the identifier
 *   (this will miss variables declared in an outer scope). When `false` (default), traverse the
 *   scope chain upward via `findVariable` so that references to outer-scope bindings are resolved
 *   correctly.
 * @returns The resolved origin node, or `null` if the identifier cannot be resolved.
 */
export function resolveOrigin(
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

    // Return the initializer expression (if any); destructured bindings resolve to
    // the declarator's initializer as their origin (e.g. `const [s, setS] = useState()`)
    case DefinitionType.Variable: {
      const { init } = def.node;
      if (init == null) return null;
      // Guard against unexpected AST shapes that could cause infinite loops
      if ("declarations" in init) return null;
      return init;
    }

    // Return containing function node only for real functions (not type signatures)
    case DefinitionType.Parameter:
      return Check.isFunction(def.node) ? def.node : null;

    // Return enum declaration for member inspection
    case DefinitionType.TSEnumName:
      return def.node;

    // Return enum member's initializer, if present
    case DefinitionType.TSEnumMember:
      return def.node.initializer ?? null;

    // Import bindings reference external values; return the import specifier as the
    // origin so callers can trace the module source via its parent ImportDeclaration
    case DefinitionType.ImportBinding:
      return def.node;

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
