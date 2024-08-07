import { F, isString, O } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { getElementName } from "./get-element-name";
import { findPropInAttributes, getPropValue } from "./get-prop";

export function getElementType(
  ctx: { getScope: (node: TSESTree.Node) => Scope },
  components?: Map<string, string>,
  polymorphicPropName?: string,
) {
  return (node: TSESTree.JSXOpeningElement) => {
    const elementName = getElementName(node);
    if (elementName === elementName.toLowerCase()) return elementName;
    const asElementName = components?.get(elementName);
    if (isString(asElementName)) return asElementName;
    const initialScope = ctx.getScope(node);
    return F.pipe(
      O.fromNullable(polymorphicPropName),
      O.flatMap(findPropInAttributes(node.attributes, initialScope)),
      O.flatMap(attr => getPropValue(attr, ctx.getScope(attr))),
      O.flatMapNullable(v => v?.value),
      O.filter(isString),
      O.getOrElse(() => elementName),
    );
  };
}
