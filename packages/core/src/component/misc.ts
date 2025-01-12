import type * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";

import { getFunctionComponentIdentifier } from "./component-id";
import { isComponentName } from "./component-name";

export function hasNoneOrValidComponentName(node: AST.TSESTreeFunction, context: RuleContext) {
  const id = getFunctionComponentIdentifier(node, context);
  if (id == null) return true;
  const name = Array.isArray(id)
    ? id.at(-1)?.name
    : id.name;
  return name != null && isComponentName(name);
}
