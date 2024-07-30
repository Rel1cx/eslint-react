import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import * as R from "remeda";

import { getElementName } from "./get-element-name";
import { findPropInAttributes, getPropValue } from "./get-prop";

export function getElementType(context: RuleContext, polymorphicPropName?: string) {
  return (node: TSESTree.JSXOpeningElement) => {
    const initialScope = context.sourceCode.getScope(node);
    return F.pipe(
      O.fromNullable(polymorphicPropName),
      O.flatMap(findPropInAttributes(node.attributes, context, initialScope)),
      O.flatMap(attr => getPropValue(attr, context)),
      O.flatMapNullable(v => v?.value),
      O.filter(R.isString),
      O.getOrElse(() => getElementName(node)),
    );
  };
}
