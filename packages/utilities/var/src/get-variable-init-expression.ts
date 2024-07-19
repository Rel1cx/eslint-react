import { NodeType } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

function isInitExpression(
  node:
    | TSESTree.Expression
    | TSESTree.LetOrConstOrVarDeclaration,
) {
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
