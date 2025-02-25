import * as AST from "@eslint-react/ast";
import { _, identity } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { match, P } from "ts-pattern";

/**
 * Get the arguments of a require expression
 * @param node The node to match
 * @returns The require expression arguments or undefined if the node is not a require expression
 */
function getRequireExpressionArguments(node: TSESTree.Node) {
  return match<typeof node, TSESTree.CallExpressionArgument[] | _>(node)
    // require("source")
    .with({ type: T.CallExpression, arguments: P.select(), callee: { type: T.Identifier, name: "require" } }, identity)
    // require("source").variable
    .with({ type: T.MemberExpression, object: P.select() }, getRequireExpressionArguments)
    .otherwise(() => _);
}

/**
 * Check if an identifier is initialized from react
 * @param name The top-level identifier's name
 * @param importSource The import source to check against
 * @param initialScope Initial scope to search for the identifier
 * @returns Whether the identifier is initialized from react
 */
export function isInitializedFromReact(
  name: string,
  importSource: string,
  initialScope: Scope,
): boolean {
  if (name.toLowerCase() === "react") return true;
  const latestDef = VAR.findVariable(name, initialScope)?.defs.at(-1);
  if (latestDef == null) return false;
  const { node, parent } = latestDef;
  if (node.type === T.VariableDeclarator && node.init != null) {
    const { init } = node;
    // check for: `variable = React.variable`
    if (init.type === T.MemberExpression && init.object.type === T.Identifier) {
      return isInitializedFromReact(init.object.name, importSource, initialScope);
    }
    // check for: `{ variable } = React`
    if (init.type === T.Identifier) {
      return isInitializedFromReact(init.name, importSource, initialScope);
    }
    // check for: `variable = require('react')` or `variable = require('react').variable`
    const args = getRequireExpressionArguments(init);
    const arg0 = args?.[0];
    if (arg0 == null || !AST.isKindOfLiteral(arg0, "string")) {
      return false;
    }
    // check for: `require('react')` or `require('react/...')`
    return arg0.value === importSource || arg0.value.startsWith(`${importSource}/`);
  }
  // latest definition is an import declaration: import { variable } from 'react'
  return parent?.type === T.ImportDeclaration && parent.source.value === importSource;
}
