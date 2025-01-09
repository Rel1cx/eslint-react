import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { Variable } from "@typescript-eslint/scope-manager";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Get the init node of the nth definition of a variable
 * @param at The index number of def in defs
 * @returns A function that takes a variable and returns the init node of the nth definition of that variable
 */
export function getVariableNode(at: number) {
  return (
    variable: Variable,
  ): O.Option<
    | TSESTree.ClassDeclaration
    | TSESTree.ClassDeclarationWithName
    | TSESTree.ClassDeclarationWithOptionalName
    | TSESTree.Expression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionDeclarationWithName
    | TSESTree.FunctionDeclarationWithOptionalName
  > => {
    return F.pipe(
      O.some(variable),
      O.flatMapNullable(v => v.defs.at(at)),
      O.flatMapNullable(def => {
        switch (true) {
          case def.type === DefinitionType.FunctionName
            && def.node.type === T.FunctionDeclaration:
            return def.node;
          case def.type === DefinitionType.ClassName
            && def.node.type === T.ClassDeclaration:
            return def.node;
          case def.type === DefinitionType.Parameter
            && AST.isFunction(def.node):
            return def.node;
          case "init" in def.node
            && def.node.init != null
            && !("declarations" in def.node.init):
            return def.node.init;
          default:
            return null;
        }
      }),
    );
  };
}
