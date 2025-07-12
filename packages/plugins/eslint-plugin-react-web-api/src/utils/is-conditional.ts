import * as AST from "@eslint-react/ast";
import { or } from "@eslint-react/eff";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export const isControlFlow = or(
  AST.isLoop,
  AST.isOneOf([
    T.IfStatement,
    T.SwitchStatement,
  ]),
);

export const isConditional = or(
  isControlFlow,
  AST.isOneOf([
    T.LogicalExpression,
    T.ConditionalExpression,
  ]),
);
