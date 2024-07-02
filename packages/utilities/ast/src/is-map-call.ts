import { isMatching, P } from "ts-pattern";

import { NodeType } from "./types";

export const isMapCallLoose = isMatching({
  callee: {
    type: NodeType.MemberExpression,
    property: {
      name: P.union("map", P.string.endsWith("Map")),
    },
  },
});
