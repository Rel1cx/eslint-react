import { F, isString, O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

export function getElementRepresentName(node: TSESTree.JSXOpeningElement, context: RuleContext) {
  const rawElementName = JSX.getElementName(node);
  if (rawElementName === rawElementName.toLowerCase()) return rawElementName;
  const { components, polymorphicPropName } = getSettingsFromContext(context);
  const asElementName = components.get(rawElementName);
  if (isString(asElementName)) return asElementName;
  return F.pipe(
    O.fromNullable(polymorphicPropName),
    O.flatMap(JSX.findPropInAttributes(node.attributes, context.sourceCode.getScope(node))),
    O.flatMap(attr => JSX.getPropValue(attr, context.sourceCode.getScope(attr))),
    O.filter(isString),
    O.getOrElse(() => rawElementName),
  );
}
