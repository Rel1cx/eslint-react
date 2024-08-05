import type { TSESTreeFunction } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";

import { getFunctionComponentIdentifier } from "./component-id";
import { isComponentName } from "./component-name";

export function hasNoneOrValidComponentName(node: TSESTreeFunction, context: RuleContext) {
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
