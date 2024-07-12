import { O, Pred } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { Construction } from "./construction";
import { ConstructionHint } from "./construction-hint";
import { is, isOneOf } from "./is";
import { NodeType } from "./types";

const None = Construction.None();

/**
 * Get a function that detects the construction of a given node.
 * @param node The AST node to detect the construction of
 * @param context The rule context
 * @param hint The hint to use when detecting the construction
 * @returns A function that detects the construction of a given node
 */
export function inspectConstruction(
  node: TSESTree.Node,
  context: RuleContext,
  hint = ConstructionHint.None,
): Construction {
  /**
   * Detect if a node is a constructed value.
   * @param node The AST node to detect the construction of
   * @returns The construction of the node
   */

  const detect = (node: TSESTree.Node): Construction => {
    const scope = context.sourceCode.getScope(node);

    return match(node)
      .when(is(NodeType.ArrayExpression), (node) => Construction.Array({ node, usage: O.none() }))
      .when(is(NodeType.ObjectExpression), (node) => Construction.ObjectExpression({ node, usage: O.none() }))
      .when(is(NodeType.ClassExpression), (node) => Construction.ClassExpression({ node, usage: O.none() }))
      .when(is(NodeType.JSXElement), (node) => Construction.JSXElement({ node, usage: O.none() }))
      .when(is(NodeType.JSXFragment), (node) => Construction.JSXFragment({ node, usage: O.none() }))
      .when(is(NodeType.CallExpression), (node) => {
        if (hint & ConstructionHint.StrictCallExpression) {
          return Construction.CallExpression({ node, usage: O.none() });
        }

        return None;
      })
      .when(is(NodeType.NewExpression), (node) => Construction.NewExpression({ node, usage: O.none() }))
      .when(isOneOf([NodeType.FunctionExpression, NodeType.ArrowFunctionExpression]), (node) => {
        return Construction.FunctionExpression({ node, usage: O.none() });
      })
      .when(is(NodeType.MemberExpression), (node) => {
        if (!("object" in node)) return None;
        const object = detect(node.object);
        if (object._tag === "None") return object;

        return {
          ...object,
          usage: O.some(node.object),
        } as const satisfies Construction;
      })
      .when(is(NodeType.AssignmentExpression), (node) => {
        if (!("right" in node)) return None;
        const right = detect(node.right);
        if (right._tag === "None") return right;

        return Construction.AssignmentExpression({
          node: right.node,
          usage: O.some(node),
        });
      })
      .when(is(NodeType.AssignmentPattern), (node) => {
        if (!("right" in node)) return None;
        const right = detect(node.right);
        if (right._tag === "None") return right;

        return Construction.AssignmentPattern({
          node: right.node,
          usage: O.some(node),
        });
      })
      .when(is(NodeType.LogicalExpression), (node) => {
        if (!("left" in node && "right" in node)) return None;
        const left = detect(node.left);
        if (left._tag !== "None") return left;

        return detect(node.right);
      })
      .when(is(NodeType.ConditionalExpression), (node) => {
        if (!("consequent" in node && "alternate" in node && !Pred.isNullable(node.alternate))) {
          return None;
        }
        const consequent = detect(node.consequent);
        if (consequent._tag !== "None") return None;

        return detect(node.alternate);
      })
      .when(is(NodeType.Identifier), (node) => {
        if (!("name" in node && Pred.isString(node.name))) return None;
        const maybeLatestDef = O.fromNullable(scope.set.get(node.name)?.defs.at(-1));
        if (O.isNone(maybeLatestDef)) return None;
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
        if (!("init" in latestDef.node) || latestDef.node.init === null) return None;

        return detect(latestDef.node.init);
      })
      .when(is(NodeType.Literal), (node) => {
        if ("regex" in node) return Construction.RegExpLiteral({ node, usage: O.none() });

        return None;
      })
      .when(isOneOf([NodeType.TSAsExpression, NodeType.TSTypeAssertion]), () => {
        if (!("expression" in node) || !Pred.isObject(node.expression)) return None;

        return detect(node.expression);
      })
      .otherwise(() => None);
  };

  return detect(node);
}
