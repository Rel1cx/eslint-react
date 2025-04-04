import type { TSESTree } from "@typescript-eslint/types";

/**
 * Represents the construction type of a expression like node.
 */
export type Construction =
  | { kind: "ArrayExpression"; node: TSESTree.ArrayExpression }
  | { kind: "CallExpression"; node: TSESTree.CallExpression }
  | { kind: "ClassExpression"; node: TSESTree.ClassExpression }
  | { kind: "FunctionDeclaration"; node: TSESTree.FunctionDeclaration }
  | { kind: "FunctionExpression"; node: TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression }
  | { kind: "JSXElement"; node: TSESTree.JSXElement | TSESTree.JSXFragment }
  | { kind: "NewExpression"; node: TSESTree.NewExpression }
  | { kind: "ObjectExpression"; node: TSESTree.ObjectExpression }
  | { kind: "RegExpLiteral"; node: TSESTree.RegExpLiteral };
