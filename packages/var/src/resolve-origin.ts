import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { type ResolveOptions, getBinding, projectBinding } from "./resolve-binding";

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
 * {@link resolve} when the precise value of the binding is needed. To follow a
 * chain of aliases to a fixed point, use {@link resolveOriginChain}.
 *
 * @param context The ESLint rule context.
 * @param node The identifier to resolve.
 * @param options Optional resolution settings; see {@link ResolveOptions}.
 * @returns The resolved origin node, or `null` if the identifier cannot be resolved.
 */
export function resolveOrigin(context: RuleContext, node: TSESTree.Identifier, options?: ResolveOptions): TSESTree.Node | null {
  const binding = getBinding(context, node, options);
  if (binding?.definition == null) return null;
  return projectBinding(binding.definition, "origin");
}
