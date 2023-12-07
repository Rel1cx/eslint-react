import type { RuleContext } from "@eslint-react/shared";
import { Data, M, O, P } from "@eslint-react/tools";
import { DefinitionType, type Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { isNil } from "rambda";

import { is, isOneOf, NodeType } from "../node-type";

export type Construction = Data.TaggedEnum<{
  None: {};
  Array: {
    node: TSESTree.ArrayExpression;
    usage: O.Option<TSESTree.Node>;
  };
  AssignmentExpression: {
    node: TSESTree.Node;
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

const None = Construction.None();

/**
 * Get a function that detects the construction of a given node.
 * @param context The rule context
 * @returns A function that detects the construction of a given node
 */
export function constructionDetector<T extends RuleContext>(
  context: T,
): (node: TSESTree.Node, scope: Scope) => Construction {
  /**
   * Detect if a node is a constructed value.
   * @param node The AST node to detect the construction of
   * @param scope The scope of the node
   * @returns The construction of the node
   */
  const detect = (
    node: TSESTree.Node,
    scope = context.sourceCode.getScope?.(node) ?? context.getScope(),
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ): Construction => {
    return M.match(node)
      .when(is(NodeType.ArrayExpression), (node) => Construction.Array({ node, usage: O.none() }))
      .when(is(NodeType.ObjectExpression), (node) => Construction.ObjectExpression({ node, usage: O.none() }))
      .when(is(NodeType.ClassExpression), (node) => Construction.ClassExpression({ node, usage: O.none() }))
      .when(is(NodeType.JSXElement), (node) => Construction.JSXElement({ node, usage: O.none() }))
      .when(is(NodeType.JSXFragment), (node) => Construction.JSXFragment({ node, usage: O.none() }))
      .when(is(NodeType.NewExpression), (node) => Construction.NewExpression({ node, usage: O.none() }))
      .when(isOneOf([NodeType.FunctionExpression, NodeType.ArrowFunctionExpression]), (node) => {
        return Construction.FunctionExpression({ node, usage: O.none() });
      })
      .when(is(NodeType.MemberExpression), (node) => {
        if (!("object" in node)) {
          return None;
        }

        const object = detect(node.object);

        if (object._tag === "None") {
          return object;
        }

        return {
          ...object,
          usage: O.some(node.object),
        } as const satisfies Construction;
      })
      .when(is(NodeType.AssignmentExpression), (node) => {
        if (!("right" in node)) {
          return None;
        }

        const right = detect(node.right);

        if (right._tag === "None") {
          return right;
        }

        return Construction.AssignmentExpression({
          node: right.node,
          usage: O.some(node),
        });
      })
      .when(is(NodeType.LogicalExpression), (node) => {
        if (!("left" in node && "right" in node)) {
          return None;
        }

        const left = detect(node.left);

        if (left._tag === "None") {
          return None;
        }

        return detect(node.right);
      })
      .when(is(NodeType.ConditionalExpression), (node) => {
        if (!("consequent" in node && "alternate" in node && !isNil(node.alternate))) {
          return None;
        }

        const consequent = detect(node.consequent);

        if (consequent._tag === "None") {
          return None;
        }

        return detect(node.alternate);
      })
      .when(is(NodeType.Identifier), (node) => {
        if (!("name" in node && P.isString(node.name))) {
          return None;
        }

        const maybeLatestDef = O.fromNullable(scope.set.get(node.name)?.defs.at(-1));

        if (O.isNone(maybeLatestDef)) {
          return None;
        }

        const latestDef = maybeLatestDef.value;

        if (latestDef.type !== DefinitionType.Variable && latestDef.type !== DefinitionType.FunctionName) {
          return None;
        }

        if (latestDef.node.type === NodeType.FunctionDeclaration) {
          return Construction.FunctionDeclaration({
            node: latestDef.node,
            usage: O.some(node),
          });
        }

        if (!("init" in latestDef.node) || latestDef.node.init === null) {
          return None;
        }

        return detect(latestDef.node.init);
      })
      .when(is(NodeType.Literal), (node) => {
        if ("regex" in node) {
          return Construction.RegExpLiteral({ node, usage: O.none() });
        }

        return None;
      })
      .when(isOneOf([NodeType.TSAsExpression, NodeType.TSTypeAssertion]), () => {
        if (!("expression" in node) || !P.isObject(node.expression)) {
          return None;
        }

        return detect(node.expression);
      })
      .otherwise(() => None);
  };

  return detect;
}
