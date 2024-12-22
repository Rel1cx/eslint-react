import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { isMatching } from "ts-pattern";

import { findVariable } from "./find-variable";

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
  const maybeLatestDef = O.flatMapNullable(findVariable(name, initialScope), (v) => v.defs.at(-1));
  if (O.isNone(maybeLatestDef)) return false;
  const { node, parent } = maybeLatestDef.value;
  if (node.type === AST_NODE_TYPES.VariableDeclarator && node.init) {
    const { init } = node;
    // check for: `variable = Source.variable`
    if (init.type === AST_NODE_TYPES.MemberExpression && init.object.type === AST_NODE_TYPES.Identifier) {
      return isInitializedFromSource(init.object.name, source, initialScope);
    }
    // check for: `{ variable } = Source`
    if (init.type === AST_NODE_TYPES.Identifier) {
      return isInitializedFromSource(init.name, source, initialScope);
    }
    // check for: `variable = require('source')` or `variable = require('source').variable`
    return F.pipe(
      getRequireExpressionArgument(init),
      O.flatMapNullable((args) => args[0]),
      O.filter(AST.isStringLiteral),
      // check for: `require('source')` or `require('source/...')`
      O.exists((arg) => arg.value === source || arg.value.startsWith(`${source}/`)),
    );
  }
  // latest definition is an import declaration: import { variable } from 'source'
  return isMatching({ type: "ImportDeclaration", source: { value: source } }, parent);
}

function getRequireExpressionArgument(node: TSESTree.Node): O.Option<TSESTree.CallExpressionArgument[]> {
  switch (true) {
    // require('source')
    case node.type === AST_NODE_TYPES.CallExpression
      && node.callee.type === AST_NODE_TYPES.Identifier
      && node.callee.name === "require": {
      return O.some(node.arguments);
    }
    // require('source').variable
    case node.type === AST_NODE_TYPES.MemberExpression: {
      return getRequireExpressionArgument(node.object);
    }
  }
  return O.none();
}
