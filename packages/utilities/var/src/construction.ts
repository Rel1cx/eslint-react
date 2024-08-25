import { is, isOneOf } from "@eslint-react/ast";
import { Data, isNullable, isObject, isString, O } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { match } from "ts-pattern";

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

export type ConstructionHint = bigint;

export const ConstructionHint = {
  None: 0n,
  StrictCallExpression: 1n << 0n,
};

/**
 * Get a function that detects the construction of a given node.
 * @param node The AST node to detect the construction of
 * @param initialScope The initial scope to use when detecting the construction
 * @param hint The hint to use when detecting the construction
 * @returns A function that detects the construction of a given node
 */
export function inspectConstruction(
  node: TSESTree.Node,
  initialScope: Scope,
  hint = ConstructionHint.None,
): Construction {
  /**
   * Detect if a node is a constructed value.
   * @param node The AST node to detect the construction of
   * @returns The construction of the node
   */
  const detect = (node: TSESTree.Node): Construction => {
    return match(node)
      .when(is(AST_NODE_TYPES.ArrayExpression), (node) => Construction.Array({ node, usage: O.none() }))
      .when(is(AST_NODE_TYPES.ObjectExpression), (node) => Construction.ObjectExpression({ node, usage: O.none() }))
      .when(is(AST_NODE_TYPES.ClassExpression), (node) => Construction.ClassExpression({ node, usage: O.none() }))
      .when(is(AST_NODE_TYPES.JSXElement), (node) => Construction.JSXElement({ node, usage: O.none() }))
      .when(is(AST_NODE_TYPES.JSXFragment), (node) => Construction.JSXFragment({ node, usage: O.none() }))
      .when(is(AST_NODE_TYPES.CallExpression), (node) => {
        if (hint & ConstructionHint.StrictCallExpression) {
          return Construction.CallExpression({ node, usage: O.none() });
        }
        return Construction.None();
      })
      .when(is(AST_NODE_TYPES.NewExpression), (node) => Construction.NewExpression({ node, usage: O.none() }))
      .when(
        isOneOf([
          AST_NODE_TYPES.FunctionExpression,
          AST_NODE_TYPES.ArrowFunctionExpression,
        ]),
        (node) => {
          return Construction.FunctionExpression({ node, usage: O.none() });
        },
      )
      .when(is(AST_NODE_TYPES.MemberExpression), (node) => {
        if (!("object" in node)) return Construction.None();
        const object = detect(node.object);
        if (object._tag === "None") return object;
        return {
          ...object,
          usage: O.some(node.object),
        } as const satisfies Construction;
      })
      .when(is(AST_NODE_TYPES.AssignmentExpression), (node) => {
        if (!("right" in node)) return Construction.None();
        const right = detect(node.right);
        if (right._tag === "None") return right;
        return Construction.AssignmentExpression({
          node: right.node,
          usage: O.some(node),
        });
      })
      .when(is(AST_NODE_TYPES.AssignmentPattern), (node) => {
        if (!("right" in node)) return Construction.None();
        const right = detect(node.right);
        if (right._tag === "None") return right;
        return Construction.AssignmentPattern({
          node: right.node,
          usage: O.some(node),
        });
      })
      .when(is(AST_NODE_TYPES.LogicalExpression), (node) => {
        if (!("left" in node && "right" in node)) return Construction.None();
        const left = detect(node.left);
        if (left._tag !== "None") return left;
        return detect(node.right);
      })
      .when(is(AST_NODE_TYPES.ConditionalExpression), (node) => {
        if (!("consequent" in node && "alternate" in node && !isNullable(node.alternate))) {
          return Construction.None();
        }
        const consequent = detect(node.consequent);
        if (consequent._tag !== "None") return Construction.None();
        return detect(node.alternate);
      })
      .when(is(AST_NODE_TYPES.Identifier), (node) => {
        if (!("name" in node && isString(node.name))) return Construction.None();
        const maybeLatestDef = O.fromNullable(initialScope.set.get(node.name)?.defs.at(-1));
        if (O.isNone(maybeLatestDef)) return Construction.None();
        const latestDef = maybeLatestDef.value;
        if (
          latestDef.type !== DefinitionType.Variable
          && latestDef.type !== DefinitionType.FunctionName
        ) {
          return Construction.None();
        }
        if (latestDef.node.type === AST_NODE_TYPES.FunctionDeclaration) {
          return Construction.FunctionDeclaration({
            node: latestDef.node,
            usage: O.some(node),
          });
        }
        if (!("init" in latestDef.node) || latestDef.node.init === null) {
          return Construction.None();
        }
        return detect(latestDef.node.init);
      })
      .when(is(AST_NODE_TYPES.Literal), (node) => {
        if ("regex" in node) {
          return Construction.RegExpLiteral({ node, usage: O.none() });
        }
        return Construction.None();
      })
      .when(
        isOneOf([
          AST_NODE_TYPES.TSAsExpression,
          AST_NODE_TYPES.TSTypeAssertion,
        ]),
        () => {
          if (!("expression" in node) || !isObject(node.expression)) {
            return Construction.None();
          }
          return detect(node.expression);
        },
      )
      .otherwise(() => Construction.None());
  };
  return detect(node);
}
