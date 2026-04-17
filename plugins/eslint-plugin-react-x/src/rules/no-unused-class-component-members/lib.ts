import { type TSESTreeMethodOrPropertyDefinition } from "@eslint-react/ast";
import { constFalse, constTrue } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

export type Property = TSESTreeMethodOrPropertyDefinition["key"];

// A set of React lifecycle methods that are implicitly used and should not be flagged as unused
export const LIFECYCLE_METHODS = new Set([
  "componentDidCatch",
  "componentDidMount",
  "componentDidUpdate",
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUnmount",
  "componentWillUpdate",
  "constructor",
  "getSnapshotBeforeUpdate",
  "render",
  "shouldComponentUpdate",
  "state",
  "UNSAFE_componentWillMount",
  "UNSAFE_componentWillReceiveProps",
  "UNSAFE_componentWillUpdate",
]);

// Checks if a property key is a literal or a non-computed identifier
export function isKeyLiteral(
  node:
    | TSESTree.MemberExpression
    | TSESTree.MethodDefinition
    | TSESTree.Property
    | TSESTree.PropertyDefinition,
  key: TSESTree.Node,
) {
  return match(key)
    .with({ type: AST.Literal }, constTrue)
    .with({ type: AST.TemplateLiteral, expressions: [] }, constTrue)
    .with({ type: AST.Identifier }, () => !node.computed)
    .otherwise(constFalse);
}
