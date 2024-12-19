import type * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/types";

import { getFunctionComponentIdentifier } from "./component-id";
import { isComponentName } from "./component-name";

export function hasNoneOrValidComponentName(node: AST.TSESTreeFunction, context: RuleContext) {
  return O.match(
    getFunctionComponentIdentifier(node, context),
    {
      onNone: F.constTrue,
      onSome: id => {
        const name = Array.isArray(id)
          ? id.at(-1)?.name
          : id.name;
        return !!name && isComponentName(name);
      },
    },
  );
}
