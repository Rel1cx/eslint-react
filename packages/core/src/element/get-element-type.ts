import * as JSX from "@eslint-react/jsx";
import { decodeSettings, normalizeSettings } from "@eslint-react/shared";
import { F, isString, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

export function getElementType(node: TSESTree.JSXOpeningElement, context: RuleContext) {
  const elementName = JSX.getElementName(node);
  if (elementName === elementName.toLowerCase()) return elementName;
  const { components, polymorphicPropName } = normalizeSettings(decodeSettings(context.settings));
  const asElementName = components.get(elementName);
  if (isString(asElementName)) return asElementName;
  return F.pipe(
    O.fromNullable(polymorphicPropName),
    O.flatMap(JSX.findPropInAttributes(node.attributes, context.sourceCode.getScope(node))),
    O.flatMap(attr => JSX.getPropValue(attr, context.sourceCode.getScope(attr))),
    O.filter(isString),
    O.getOrElse(() => elementName),
  );
}
