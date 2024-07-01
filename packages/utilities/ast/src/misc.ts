import { isMatching, P } from "ts-pattern";

import { NodeType } from "./ast-node";

export const isMapCallLoose = isMatching({
  callee: {
    type: NodeType.MemberExpression,
    property: {
      name: P.union("map", P.string.endsWith("Map")),
    },
  },
});
