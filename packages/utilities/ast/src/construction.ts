import type { TSESTree } from "@typescript-eslint/types";
import type { Option as O } from "effect";
import { Data } from "effect";

export type Construction = Data.TaggedEnum<{
  Array: {
    node: TSESTree.ArrayExpression;
    usage: O.Option<TSESTree.Node>;
  };
  AssignmentExpression: {
    node: TSESTree.Node;
    usage: O.Option<TSESTree.Node>;
  };
  AssignmentPattern: {
    node: TSESTree.Node;
    usage: O.Option<TSESTree.Node>;
  };
  CallExpression: {
    node: TSESTree.CallExpression;
    usage: O.Option<TSESTree.Node>;
  };
  ClassExpression: {
    node: TSESTree.ClassExpression;
    usage: O.Option<TSESTree.Node>;
  };
  FunctionDeclaration: {
    node: TSESTree.FunctionDeclaration;
    usage: O.Option<TSESTree.Expression | TSESTree.Identifier>;
  };
  FunctionExpression: {
    node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;
    usage: O.Option<TSESTree.Node>;
  };
  JSXElement: {
    node: TSESTree.JSXElement;
    usage: O.Option<TSESTree.Node>;
  };
  JSXFragment: {
    node: TSESTree.JSXFragment;
    usage: O.Option<TSESTree.Node>;
  };
  NewExpression: {
    node: TSESTree.NewExpression;
    usage: O.Option<TSESTree.Node>;
  };
  None: {};
  ObjectExpression: {
    node: TSESTree.ObjectExpression;
    usage: O.Option<TSESTree.Node>;
  };
  RegExpLiteral: {
    node: TSESTree.Literal;
    usage: O.Option<TSESTree.Node>;
  };
}>;

export const Construction = Data.taggedEnum<Construction>();
