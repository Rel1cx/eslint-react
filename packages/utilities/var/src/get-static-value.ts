import { F, O } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import * as ASTUtils from "@typescript-eslint/utils/ast-utils";

export function getStaticValue(node: TSESTree.Node, initialScope: Scope): O.Option<unknown> {
  return F.pipe(
    O.fromNullable(ASTUtils.getStaticValue(node, initialScope)),
    O.map((v) => v.value),
  );
}
