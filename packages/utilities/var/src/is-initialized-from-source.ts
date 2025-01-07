import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
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
  const latestDef = O.flatMapNullable(findVariable(name, initialScope), (v) => v.defs.at(-1));
  if (O.isNone(latestDef)) return false;
  const { node, parent } = latestDef.value;
  if (node.type === T.VariableDeclarator && node.init) {
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
    return F.pipe(
      getRequireExpressionArguments(init),
      O.flatMapNullable((args) => args[0]),
      O.filter(AST.isStringLiteral),
      // check for: `require('source')` or `require('source/...')`
      O.exists((arg) => arg.value === source || arg.value.startsWith(`${source}/`)),
    );
  }
  // latest definition is an import declaration: import { variable } from 'source'
  return isMatching({ type: "ImportDeclaration", source: { value: source } }, parent);
}

function getRequireExpressionArguments(node: TSESTree.Node): O.Option<TSESTree.CallExpressionArgument[]> {
  switch (true) {
    // require('source')
    case node.type === T.CallExpression
      && node.callee.type === T.Identifier
      && node.callee.name === "require": {
      return O.some(node.arguments);
    }
    // require('source').variable
    case node.type === T.MemberExpression: {
      return getRequireExpressionArguments(node.object);
    }
  }
  return O.none();
}
