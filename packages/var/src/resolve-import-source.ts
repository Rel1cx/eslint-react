import { Check, Extract } from "@eslint-react/ast";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { P, isMatching } from "ts-pattern";

/**
 * Get the arguments of a require expression.
 * @param node The node to check.
 * @returns The require expression arguments, or `null` when the node is not a require expression.
 */
function getRequireExpressionArguments(node: TSESTree.Node) {
  const unwrapped = Extract.unwrap(node);
  if (unwrapped.type === AST.CallExpression) {
    const callee = Extract.unwrap(unwrapped.callee);
    if (Check.isIdentifier(callee, "require")) return unwrapped.arguments;
    return null;
  }
  if (unwrapped.type === AST.MemberExpression) return getRequireExpressionArguments(unwrapped.object);
  return null;
}

/**
 * Resolve the import source of a variable by walking its latest definition.
 * @param name The variable name.
 * @param initialScope The initial scope.
 * @param seen The set of already visited variable names (for cycle detection).
 * @returns The import source, or `null` when it cannot be resolved.
 */
export function resolveImportSource(name: string, initialScope: Scope, seen = new Set<string>()) {
  if (seen.has(name)) return null;
  seen.add(name);
  const latestDef = findVariable(initialScope, name)?.defs.at(-1);
  if (latestDef == null) return null;
  const { node, parent } = latestDef;
  if (node.type === AST.VariableDeclarator && node.init != null) {
    const init = Extract.unwrap(node.init);
    // Check for: variable = Source.variable
    if (init.type === AST.MemberExpression && init.object.type === AST.Identifier) {
      return resolveImportSource(init.object.name, initialScope, seen);
    }
    // Check for: { variable } = Source
    if (init.type === AST.Identifier) {
      return resolveImportSource(init.name, initialScope, seen);
    }
    // Check for: variable = require('source') or variable = require('source').variable
    const args = getRequireExpressionArguments(init);
    const arg0 = args?.[0];
    if (arg0 == null || !isMatching({ type: AST.Literal, value: P.string }, arg0)) {
      return null;
    }
    // Check for: require('source') or require('source/...')
    return arg0.value;
  }
  // The latest definition is an import declaration: import { variable } from 'source'
  if (parent?.type === AST.ImportDeclaration) return parent.source.value;
  return null;
}
