import { isOneOf, NodeType } from "@eslint-react/ast";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type TSESTree } from "@typescript-eslint/utils";

export const isJsxTagNameExpression = isOneOf([
    NodeType.JSXIdentifier,
    NodeType.JSXMemberExpression,
    NodeType.JSXNamespacedName,
]);
