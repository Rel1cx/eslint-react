import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";

export const isMapCallLoose = isMatching({
  callee: {
    type: AST_NODE_TYPES.MemberExpression,
    property: {
      name: P.union("map", P.string.endsWith("Map")),
    },
  },
});
