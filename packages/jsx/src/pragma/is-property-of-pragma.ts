import { NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { isMatching } from "ts-pattern";

import { getPragmaFromContext } from "./get-pragma";

export function isPropertyOfPragma(name: string, context: RuleContext, pragma = getPragmaFromContext(context)) {
  const isMatch: (node: TSESTree.Node) => boolean = isMatching({
    type: NodeType.MemberExpression,
    object: {
      type: NodeType.Identifier,
      name: pragma,
    },
    property: {
      name,
    },
  });

  return isMatch;
}
