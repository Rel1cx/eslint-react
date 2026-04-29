import { Check, Extract } from "@eslint-react/ast";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { getRequireExpressionArguments } from "./get-require-expression-arguments";

export function resolveImportSource(
  name: string,
  initialScope: Scope,
  visited = new Set<string>(),
) {
  if (visited.has(name)) return null;
  visited.add(name);
  const latestDef = findVariable(initialScope, name)?.defs.at(-1);
  if (latestDef == null) return null;
  const { node, parent } = latestDef;
  if (node.type === AST.VariableDeclarator && node.init != null) {
    const init = Extract.unwrap(node.init);
    // check for: variable = Source.variable
    if (init.type === AST.MemberExpression && init.object.type === AST.Identifier) {
      return resolveImportSource(init.object.name, initialScope, visited);
    }
    // check for: { variable } = Source
    if (init.type === AST.Identifier) {
      return resolveImportSource(init.name, initialScope, visited);
    }
    // check for: variable = require('source') or variable = require('source').variable
    const args = getRequireExpressionArguments(init);
    const arg0 = args?.[0];
    if (arg0 == null || !Check.isLiteral("string")(arg0)) {
      return null;
    }
    // check for: require('source') or require('source/...')
    return arg0.value;
  }
  // latest definition is an import declaration: import { variable } from 'source'
  if (parent?.type === AST.ImportDeclaration) return parent.source.value;
  return null;
}
