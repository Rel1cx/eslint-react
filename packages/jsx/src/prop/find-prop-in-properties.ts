import { findVariableByNameUpToGlobal, getVariableInit, is, NodeType } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

/**
 * @param properties The properties to search in
 * @param context The rule context
 * @param seenProps The properties that have already been seen
 * @returns A function that searches for a property in the given properties
 */
export function findPropInProperties(
  properties: (TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement)[] | TSESTree.ObjectLiteralElement[],
  context: RuleContext,
  seenProps: string[] = [],
) {
  const startScope = context.getScope();

  /**
   * Search for a property in the given properties
   * @param propName The name of the property to search for
   * @returns The property if found
   */
  return (propName: string): O.Option<(typeof properties)[number]> => {
    return O.fromNullable(
      properties.find((prop) => {
        return match(prop)
          .when(is(NodeType.Property), (prop) => {
            return "name" in prop.key && prop.key.name === propName;
          })
          .when(is(NodeType.SpreadElement), (prop) => {
            return match(prop.argument)
              .when(is(NodeType.Identifier), (argument) => {
                const { name } = argument;
                const maybeInit = O.flatMap(
                  findVariableByNameUpToGlobal(name, startScope),
                  getVariableInit(0),
                );
                if (O.isNone(maybeInit)) {
                  return false;
                }
                const init = maybeInit.value;

                if (init.type !== NodeType.ObjectExpression) {
                  return false;
                }

                if (seenProps.includes(name)) {
                  return false;
                }

                return O.isSome(findPropInProperties(init.properties, context, [...seenProps, name])(propName));
              })
              .when(is(NodeType.ObjectExpression), (argument) => {
                return O.isSome(findPropInProperties(argument.properties, context, seenProps)(propName));
              })
              .when(is(NodeType.MemberExpression), () => {
                // Not implemented
              })
              .when(is(NodeType.CallExpression), () => {
                // Not implemented
              })
              .otherwise(F.constFalse);
          })
          .when(is(NodeType.RestElement), () => {
            // Not implemented
            return false;
          })
          .otherwise(F.constFalse);
      }),
    );
  };
}
