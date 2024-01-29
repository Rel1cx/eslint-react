import { NodeType } from "@eslint-react/ast";
import type { Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { Function as F, Option as O } from "effect";

/**
 * Get the init node of the nth definition of a variable
 * @param at The index number of def in defs
 * @returns A function that takes a variable and returns the init node of the nth definition of that variable
 */
export function getVariableInit(at: number) {
  return (variable: Variable): O.Option<TSESTree.Expression | TSESTree.LetOrConstOrVarDeclaration> => {
    return F.pipe(
      O.some(variable),
      O.flatMapNullable(v => v.defs.at(at)),
      O.flatMap(d =>
        "init" in d.node
          ? O.fromNullable(d.node.init)
          : O.none()
      ),
    );
  };
}

function isInitExpression(
  node:
    | TSESTree.Expression
    | TSESTree.LetOrConstOrVarDeclaration,
): node is TSESTree.Expression {
  return node.type !== NodeType.VariableDeclaration;
}

export function getVariableInitExpression(at: number) {
  return (variable: Variable): O.Option<TSESTree.Expression> => {
    return F.pipe(
      O.some(variable),
      O.flatMapNullable(v => v.defs.at(at)),
      O.flatMap(d =>
        "init" in d.node
          ? O.fromNullable(d.node.init)
          : O.none()
      ),
      O.filter(isInitExpression),
    );
  };
}
