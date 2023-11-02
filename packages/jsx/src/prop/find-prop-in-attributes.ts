import { findVariableByNameUpToGlobal, getVariableInitFirst, is, NodeType } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { findPropInProperties } from "./find-prop-in-properties";
import { getPropName } from "./get-prop-name";

/**
 * @param attributes The attributes to search in
 * @param context The rule context
 * @returns A function that searches for a property in the given attributes
 */
export function findPropInAttributes(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  context: RuleContext,
) {
  const startScope = context.getScope();

  /**
   * Search for a property in the given attributes
   * @param propName The name of the property to search for
   * @returns The property if found
   */
  return (propName: string) => {
    return O.fromNullable(
      attributes.find((attr) => {
        return match(attr)
          .when(is(NodeType.JSXAttribute), (attr) => getPropName(attr) === propName)
          .when(is(NodeType.JSXSpreadAttribute), (attr) => {
            return match<typeof attr.argument, boolean>(attr.argument)
              .with({ type: NodeType.Identifier }, (argument) => {
                const { name } = argument;
                const maybeInit = O.flatMap(
                  findVariableByNameUpToGlobal(name, startScope),
                  getVariableInitFirst,
                );
                if (O.isNone(maybeInit)) {
                  return false;
                }
                const init = maybeInit.value;

                if (!("properties" in init)) {
                  return false;
                }

                return O.isSome(findPropInProperties(init.properties, context)(propName));
              })
              .when(is(NodeType.ObjectExpression), (argument) => {
                return O.isSome(findPropInProperties(argument.properties, context)(propName));
              })
              .when(is(NodeType.MemberExpression), () => {
                // Not implemented
                return false;
              })
              .when(is(NodeType.CallExpression), () => {
                // Not implemented
                return false;
              })
              .otherwise(F.constFalse);
          })
          .otherwise(F.constFalse);
      }),
    );
  };
}
