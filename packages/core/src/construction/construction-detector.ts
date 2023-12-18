import { is, isOneOf, NodeType } from "@eslint-react/ast";
import type { Helper } from "@eslint-react/tools";
import { _, Data, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

const unstableAssignmentPatternTypes = [
  NodeType.JSXElement,
  NodeType.ArrayExpression,
  NodeType.ObjectExpression,
  NodeType.FunctionExpression,
  NodeType.ArrowFunctionExpression,
  NodeType.ClassExpression,
  NodeType.NewExpression,
  NodeType.CallExpression,
] as const;

/**
 * Check if the given node is an unstable assignment pattern (will change between assignments)
 * @param node The AST node to check
 * @param node.right The right side of the assignment
 */
export function isUnstableAssignmentPattern(node: TSESTree.AssignmentPattern): node is
  & TSESTree.AssignmentPattern
  & Helper.Narrow<{
    right: TSESTree.RegExpLiteral | typeof unstableAssignmentPatternTypes[number];
  }>
{
  const { right } = node;
  if (right.type === NodeType.Literal) {
    return "regex" in right;
  }

  return isOneOf(unstableAssignmentPatternTypes)(right);
}

export type ERConstruction = Data.TaggedEnum<{
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

export const ERConstruction = Data.taggedEnum<ERConstruction>();

const None = ERConstruction.None();

/**
 * Get a function that detects the construction of a given node.
 * @param context The rule context
 * @returns A function that detects the construction of a given node
 */
export function constructionDetector<T extends RuleContext>(context: T): (node: TSESTree.Node) => ERConstruction {
  /**
   * Detect if a node is a constructed value.
   * @param node The AST node to detect the construction of
   * @returns The construction of the node
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity
  const detect = (node: TSESTree.Node): ERConstruction => {
    const scope = context.sourceCode.getScope?.(node) ?? context.getScope();

    return match(node)
      .when(is(NodeType.ArrayExpression), (node) => ERConstruction.Array({ node, usage: O.none() }))
      .when(is(NodeType.ObjectExpression), (node) => ERConstruction.ObjectExpression({ node, usage: O.none() }))
      .when(is(NodeType.ClassExpression), (node) => ERConstruction.ClassExpression({ node, usage: O.none() }))
      .when(is(NodeType.JSXElement), (node) => ERConstruction.JSXElement({ node, usage: O.none() }))
      .when(is(NodeType.JSXFragment), (node) => ERConstruction.JSXFragment({ node, usage: O.none() }))
      .when(is(NodeType.NewExpression), (node) => ERConstruction.NewExpression({ node, usage: O.none() }))
      .when(isOneOf([NodeType.FunctionExpression, NodeType.ArrowFunctionExpression]), (node) => {
        return ERConstruction.FunctionExpression({ node, usage: O.none() });
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
        } as const satisfies ERConstruction;
      })
      .when(is(NodeType.AssignmentExpression), (node) => {
        if (!("right" in node)) {
          return None;
        }

        const right = detect(node.right);

        if (right._tag === "None") {
          return right;
        }

        return ERConstruction.AssignmentExpression({
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
        if (!("consequent" in node && "alternate" in node && !_.isNullable(node.alternate))) {
          return None;
        }

        const consequent = detect(node.consequent);

        if (consequent._tag === "None") {
          return None;
        }

        return detect(node.alternate);
      })
      .when(is(NodeType.Identifier), (node) => {
        if (!("name" in node && _.isString(node.name))) {
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
          return ERConstruction.FunctionDeclaration({
            node: latestDef.node,
            usage: O.some(node),
          });
        }

        if (
          !("init" in latestDef.node)
          || latestDef.node.init === null
        ) {
          return None;
        }

        return detect(latestDef.node.init);
      })
      .when(is(NodeType.Literal), (node) => {
        if ("regex" in node) {
          return ERConstruction.RegExpLiteral({ node, usage: O.none() });
        }

        return None;
      })
      .when(isOneOf([NodeType.TSAsExpression, NodeType.TSTypeAssertion]), () => {
        if (!("expression" in node) || !_.isObject(node.expression)) {
          return None;
        }

        return detect(node.expression);
      })
      .otherwise(() => None);
  };

  return detect;
}
