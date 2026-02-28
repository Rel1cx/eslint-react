import * as ast from "@eslint-react/ast";
import { identity } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";

/**
 * Get the arguments of a require expression
 * @param node The node to match
 * @returns The require expression arguments or null if the node is not a require expression
 * @internal
 */
function getRequireExpressionArguments(node: TSESTree.Node) {
  return match<typeof node, TSESTree.CallExpressionArgument[] | null>(node)
    .with(
      {
        // require("source")
        type: AST.CallExpression,
        arguments: P.select(),
        callee: {
          type: AST.Identifier,
          name: "require",
        },
      },
      identity,
    )
    .with(
      {
        // require("source").variable
        type: AST.MemberExpression,
        object: P.select(),
      },
      getRequireExpressionArguments,
    )
    .otherwise(() => null);
}

/**
 * Find the import source of a variable
 * @param name The variable name
 * @param initialScope The initial scope to search
 * @returns The import source or null if not found
 */
export function findImportSource(
  name: string,
  initialScope: Scope,
) {
  const latestDef = findVariable(initialScope, name)?.defs.at(-1);
  if (latestDef == null) return null;
  const { node, parent } = latestDef;
  if (node.type === AST.VariableDeclarator && node.init != null) {
    const { init } = node;
    // check for: variable = Source.variable
    if (init.type === AST.MemberExpression && init.object.type === AST.Identifier) {
      return findImportSource(init.object.name, initialScope);
    }
    // check for: { variable } = Source
    if (init.type === AST.Identifier) {
      return findImportSource(init.name, initialScope);
    }
    // check for: variable = require('source') or variable = require('source').variable
    const args = getRequireExpressionArguments(init);
    const arg0 = args?.[0];
    if (arg0 == null || !ast.isLiteral(arg0, "string")) {
      return null;
    }
    // check for: require('source') or require('source/...')
    return arg0.value;
  }
  // latest definition is an import declaration: import { variable } from 'source'
  if (parent?.type === AST.ImportDeclaration) return parent.source.value;
  return null;
}
