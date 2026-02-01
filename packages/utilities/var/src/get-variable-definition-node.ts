import * as ast from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import type { Variable } from "@typescript-eslint/scope-manager";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

/**
 * Get the definition node of a variable at a specific definition index
 * @param variable The variable to get the definition node from
 * @param at The index of the definition to retrieve (negative index supported)
 * @returns The definition node or unit if not found
 */
export function getVariableDefinitionNode(variable: Variable | unit, at: number):
  | unit
  | TSESTree.ClassDeclaration
  | TSESTree.ClassDeclarationWithName
  | TSESTree.ClassDeclarationWithOptionalName
  | TSESTree.Expression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionDeclarationWithName
  | TSESTree.FunctionDeclarationWithOptionalName
{
  if (variable == null) return unit;
  const def = variable.defs.at(at);
  if (def == null) return unit;
  switch (true) {
    case def.type === DefinitionType.FunctionName
      && def.node.type === AST.FunctionDeclaration:
      return def.node;
    case def.type === DefinitionType.ClassName
      && def.node.type === AST.ClassDeclaration:
      return def.node;
    case "init" in def.node
      && def.node.init != null
      && !("declarations" in def.node.init):
      return def.node.init;
    default:
      return unit;
  }
}

/**
 * Get the definition node of a variable at a specific definition index (loose version)
 * Also returns the function node if the definition is a parameter
 * @param variable The variable to get the definition node from
 * @param at The index of the definition to retrieve
 * @returns The definition node or unit if not found
 */
export function getVariableDefinitionNodeLoose(variable: Variable | unit, at: number):
  | unit
  | TSESTree.ClassDeclaration
  | TSESTree.ClassDeclarationWithName
  | TSESTree.ClassDeclarationWithOptionalName
  | TSESTree.Expression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionDeclarationWithName
  | TSESTree.FunctionDeclarationWithOptionalName
{
  if (variable == null) return unit;
  const node = getVariableDefinitionNode(variable, at);
  if (node != null) return node;
  const def = variable.defs.at(at);
  if (def?.type === DefinitionType.Parameter && ast.isFunction(def.node)) return def.node;
  return unit;
}
