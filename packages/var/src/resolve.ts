import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { type ResolveOptions, getBinding, projectBinding } from "./resolve-binding";

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
 * @param options Optional resolution settings; see {@link ResolveOptions}.
 * @returns The resolved node, or `null` if the identifier cannot be resolved to a value node.
 *
 * For origin/pedigree tracking that maps destructured bindings to the declarator's
 * initializer, see {@link resolveOrigin}.
 */
export function resolve(context: RuleContext, node: TSESTree.Identifier, options?: ResolveOptions): TSESTree.Node | null {
  const binding = getBinding(context, node, options);
  if (binding?.definition == null) return null;
  return projectBinding(binding.definition, "value");
}
