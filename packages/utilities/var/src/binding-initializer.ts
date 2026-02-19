import * as ast from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import type { Variable } from "@typescript-eslint/scope-manager";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

/**
 * Get the initializer expression or statement of a variable definition at a specified index
 * @param variable The variable to get the initializer from
 * @param at The index of the variable definition to get the initializer from
 * @returns The initializer expression or statement of the variable definition at the specified index, or unit if not found
 */
export function getVariableInitializer(variable: Variable | unit, at: number):
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
 * Get the initializer expression or statement of a variable definition at a specified index, or the function declaration if the variable is a parameter of a function
 * @param variable The variable to get the initializer from
 * @param at The index of the variable definition to get the initializer from
 * @returns The initializer expression or statement of the variable definition at the specified index, or the function declaration if the variable is a parameter of a function, or unit if not found
 */
export function getVariableInitializerLoose(variable: Variable | unit, at: number):
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
  const node = getVariableInitializer(variable, at);
  if (node != null) return node;
  const def = variable.defs.at(at);
  if (def?.type === DefinitionType.Parameter && ast.isFunction(def.node)) return def.node;
  return unit;
}
