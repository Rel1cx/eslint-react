import type { TSESTreeFunction } from "@eslint-react/ast";
// import { Function as F, Option as O } from "effect";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { getFunctionComponentIdentifier } from "./component-id";

export const RE_COMPONENT_NAME = /^[A-Z]/u;

export function getComponentNameFromIdentifier(node: TSESTree.Identifier | TSESTree.Identifier[]) {
  return Array.isArray(node)
    ? node.map(n => n.name).join(".")
    : node.name;
}

export function isComponentName(name: string) {
  return !!name && RE_COMPONENT_NAME.test(name);
}

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
