import { NodeType } from "@eslint-react/ast";
import { E, F } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { getPragmaFromContext } from "./get-pragma";
import { isDestructuredFromPragma } from "./is-destructured-from-pragma";

export type CallFromPragmaPredicate = (node: TSESTree.Node, context: RuleContext) => node is TSESTree.CallExpression;

/**
 * Checks if the given node is a call expression to the given function or method of the pragma
 * @param name The name of the function or method to check
 * @returns A predicate that checks if the given node is a call expression to the given function or method
 */
export const isCallFromPragma =
  (name: string) => (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression => {
    if (node.type !== NodeType.CallExpression || !("callee" in node)) {
      return false;
    }

    const maybePragma = getPragmaFromContext(context);
    if (E.isLeft(maybePragma)) {
      return false;
    }

    const pragma = maybePragma.right;

    return match(node.callee)
      .with(
        {
          type: NodeType.MemberExpression,
          object: { name: pragma },
          property: { name },
        },
        F.constTrue,
      )
      .with({ name }, ({ name }) => isDestructuredFromPragma(name, context))
      .otherwise(F.constFalse);
  };
