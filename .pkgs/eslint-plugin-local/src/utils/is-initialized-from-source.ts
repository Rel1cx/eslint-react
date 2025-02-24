import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import { findVariable } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Check if an identifier is initialized from the given source
 * @param name The top-level identifier's name
 * @param source The import source to check against
 * @param initialScope Initial scope to search for the identifier
 * @returns Whether the identifier is initialized from the given source
 */
export function isInitializedFromSource(
  name: string,
  source: string,
  initialScope: Scope,
): boolean {
  const latestDef = findVariable(name, initialScope)?.defs.at(-1);
  if (latestDef == null) return false;
  const { node, parent } = latestDef;
  if (node.type === T.VariableDeclarator && node.init != null) {
    const { init } = node;
    // check for: `variable = Source.variable`
    if (init.type === T.MemberExpression && init.object.type === T.Identifier) {
      return isInitializedFromSource(init.object.name, source, initialScope);
    }
    // check for: `{ variable } = Source`
    if (init.type === T.Identifier) {
      return isInitializedFromSource(init.name, source, initialScope);
    }
    // check for: `variable = require('source')` or `variable = require('source').variable`
    const args = getRequireExpressionArguments(init);
    const arg0 = args?.[0];
    if (arg0 == null || !AST.isStringLiteral(arg0)) {
      return false;
    }
    // check for: `require('source')` or `require('source/...')`
    return arg0.value === source
      || arg0
        .value
        .startsWith(`${source}/`);
  }
  // latest definition is an import declaration: import { variable } from 'source'
  return parent?.type === T.ImportDeclaration && parent.source.value === source;
}

function getRequireExpressionArguments(node: TSESTree.Node): TSESTree.CallExpressionArgument[] | _ {
  switch (true) {
    // require('source')
    case node.type === T.CallExpression
      && node.callee.type === T.Identifier
      && node.callee.name === "require": {
      return node.arguments;
    }
    // require('source').variable
    case node.type === T.MemberExpression: {
      return getRequireExpressionArguments(node.object);
    }
  }
  return _;
}
