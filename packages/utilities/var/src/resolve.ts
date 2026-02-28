import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Resolves an identifier to the AST node that represents its value,
 * suitable for use in ESLint rule analysis.
 *
 * The resolution follows these rules per definition type:
 *
 * | Definition type          | `def.node`                                   | Returns                            |
 * |--------------------------|----------------------------------------------|------------------------------------|
 * | `Variable`               | `VariableDeclarator`                         | `def.node.init` (or `null`)        |
 * | `FunctionName`           | `FunctionDeclaration` / `FunctionExpression` | `def.node`                         |
 * | `ClassName`              | `ClassDeclaration` / `ClassExpression`       | `def.node`                         |
 * | `Parameter`              | containing function node                     | `def.node` (if a real function)    |
 * | `TSEnumName`             | `TSEnumDeclaration`                          | `def.node`                         |
 * | `TSEnumMember`           | `TSEnumMember`                               | `def.node.initializer` (or `null`) |
 * | `ImportBinding`          | import specifier                             | `null`                             |
 * | `CatchClause`            | `CatchClause`                                | `null`                             |
 * | `TSModuleName`           | `TSModuleDeclaration`                        | `null`                             |
 * | `Type`                   | type alias node                              | `null`                             |
 * | `ImplicitGlobalVariable` | any node                                     | `null`                             |
 *
 * @param context The ESLint rule context used for scope lookup.
 * @param node The identifier to resolve.
 * @param at Which definition to use when multiple exist (default: `0`; pass `-1` for the last).
 * @param localOnly When `true`, look up the variable only in the node's own scope (faster, but
 *   will miss variables declared in an outer scope). When `false` (default), traverse the scope
 *   chain upward via `findVariable` so that references to outer-scope bindings are resolved
 *   correctly.
 * @returns The resolved node, or `null` if the identifier cannot be resolved to a value node.
 */
export function resolve(
  context: RuleContext,
  node: TSESTree.Identifier,
  at = 0,
  localOnly = false,
): TSESTree.Node | null {
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
      const { init } = def.node;
      if (init == null) return null;
      // Guard against unexpected AST shapes that could cause infinite loops
      if ("declarations" in init) return null;
      return init;
    }

    // Return containing function node only for real functions (not type signatures)
    case DefinitionType.Parameter:
      return ast.isFunction(def.node) ? def.node : null;

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
