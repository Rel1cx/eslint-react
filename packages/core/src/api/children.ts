import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { isMemberExpressionOfReactMember } from "../internal";

// workaround for @typescript-eslint/utils's TS2742 error.
type ChildrenMethodPredicate = (
  node: TSESTree.MemberExpression,
  context: RuleContext,
  pragma?: string,
) => boolean;

export const isChildrenCount: ChildrenMethodPredicate = isMemberExpressionOfReactMember("Children", "count");

export const isChildrenForEach: ChildrenMethodPredicate = isMemberExpressionOfReactMember("Children", "forEach");

export const isChildrenMap: ChildrenMethodPredicate = isMemberExpressionOfReactMember("Children", "map");

export const isChildrenOnly: ChildrenMethodPredicate = isMemberExpressionOfReactMember("Children", "only");

export const isChildrenToArray: ChildrenMethodPredicate = isMemberExpressionOfReactMember("Children", "toArray");
