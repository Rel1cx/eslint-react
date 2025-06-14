import type { Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { unit } from "@eslint-react/eff";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getVariableInitNode(variable: Variable | unit, at: number):
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
      && def.node.type === T.FunctionDeclaration:
      return def.node;
    case def.type === DefinitionType.ClassName
      && def.node.type === T.ClassDeclaration:
      return def.node;
    case "init" in def.node
      && def.node.init != null
      && !("declarations" in def.node.init):
      return def.node.init;
    default:
      return unit;
  }
}
