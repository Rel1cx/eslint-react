import { Check, Extract } from "@eslint-react/ast";
import type { ImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if a call expression targets a `react-dom` API.
 *
 * Matches both direct calls to an imported binding (ex: `render()`) and calls
 * through a module binding (ex: `ReactDOM.render()`). Import provenance is
 * resolved through `imports`.
 * @param node The call expression to check.
 * @param imports The import lookup for `react-dom`.
 * @param api The API name to match (ex: "render").
 * @param allowGlobalDirect Whether a bare global identifier with the API name
 * also matches without an import.
 * @returns `true` if the call targets the API through a supported binding.
 */
export function isReactDOMCall(node: TSESTree.CallExpression, imports: ImportLookup, api: string, allowGlobalDirect = false): boolean {
  const callee = Extract.unwrap(node.callee);
  if (Check.isIdentifier(callee)) {
    return (allowGlobalDirect && callee.name === api) || imports.has(callee.name, api);
  }
  return callee.type === AST.MemberExpression
    && Check.isIdentifier(callee.object)
    && Extract.getCalleeName(node) === api
    && imports.isModuleBinding(callee.object.name);
}
