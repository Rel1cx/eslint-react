import type * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/types";

import { getFunctionComponentIdentifier } from "./component-id";
import { isComponentName } from "./component-name";

export function hasNoneOrValidComponentName(node: AST.TSESTreeFunction, context: RuleContext) {
  const mbIdentifier = getFunctionComponentIdentifier(node, context);
  if (O.isNone(mbIdentifier)) {
    return true;
  }
  const id = mbIdentifier.value;
  const name = Array.isArray(id)
    ? id.at(-1)?.name
    : id.name;
  return name != null && isComponentName(name);
}
