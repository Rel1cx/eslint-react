import { Check } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

// Allow primitive wrapper types, as they are not expensive to call without lazy initialization
export const LAZY_INIT_ALLOW_LIST = [
  "Boolean",
  "String",
  "Number",
];

const EXPRESSION_VISITOR_KEYS = {
  [AST.ArrayExpression]: ["elements"],
  [AST.ArrayPattern]: ["elements"],
  [AST.AssignmentExpression]: ["left", "right"],
  [AST.AssignmentPattern]: ["left", "right"],
  [AST.AwaitExpression]: ["argument"],
  [AST.BinaryExpression]: ["left", "right"],
  [AST.CallExpression]: ["arguments", "callee"],
  [AST.ChainExpression]: ["expression"],
  [AST.ConditionalExpression]: ["test", "consequent", "alternate"],
  [AST.Decorator]: ["expression"],
  [AST.DoWhileStatement]: ["test"],
  [AST.ExpressionStatement]: ["expression"],
  [AST.ForInStatement]: ["left", "right"],
  [AST.ForOfStatement]: ["left", "right"],
  [AST.ForStatement]: ["test"],
  [AST.IfStatement]: ["test", "consequent", "alternate"],
  [AST.ImportExpression]: ["source"],
  [AST.JSXExpressionContainer]: ["expression"],
  [AST.JSXSpreadChild]: ["expression"],
  [AST.LogicalExpression]: ["left", "right"],
  [AST.MemberExpression]: ["object", "property"],
  [AST.NewExpression]: ["arguments", "callee"],
  [AST.ObjectExpression]: ["properties"],
  [AST.ObjectPattern]: ["properties"],
  [AST.Property]: ["value"],
  [AST.SequenceExpression]: ["expressions"],
  [AST.SpreadElement]: ["argument"],
  [AST.SwitchCase]: ["test", "consequent"],
  [AST.TaggedTemplateExpression]: ["tag", "quasi"],
  [AST.TemplateLiteral]: ["expressions"],
  [AST.TSAsExpression]: ["expression"],
  [AST.TSClassImplements]: ["expression"],
  [AST.TSExportAssignment]: ["expression"],
  [AST.TSExternalModuleReference]: ["expression"],
  [AST.TSInstantiationExpression]: ["expression"],
  [AST.TSInterfaceHeritage]: ["expression"],
  [AST.TSNonNullExpression]: ["expression"],
  [AST.TSSatisfiesExpression]: ["expression"],
  [AST.TSTypeAssertion]: ["expression"],
  [AST.UnaryExpression]: ["argument"],
  [AST.UpdateExpression]: ["argument"],
  [AST.WhileStatement]: ["test"],
  [AST.YieldExpression]: ["argument"],
} as const;

/**
 * Get all nested expressions of type T in an expression like node
 * @param type The type of the expression to retrieve within the node
 * @returns A partially applied function bound to a predicate of type AST. The returned function can be called passing a
 * node, and it will return an array of all nested expressions of type AST.
 */
// dprint-ignore
function getNestedExpressionsOfType<TNodeType extends AST>(type: TNodeType): (node: TSESTree.Node) => Extract<TSESTree.Node, { type: TNodeType }>[] {
  const isNodeOfType = Check.is(type);
  const recurse = (node: TSESTree.Node): Extract<TSESTree.Node, { type: TNodeType }>[] => {
    const expressions: Extract<TSESTree.Node, { type: TNodeType }>[] = [];
    simpleTraverse(node, {
      enter(node, parent) {
        // Skip the property of a non-computed member access: `obj.prop` reads `obj`, not `prop`
        if (parent?.type === AST.MemberExpression && !parent.computed && parent.property === node) return;
        if (isNodeOfType(node)) expressions.push(node);
      },
      visitorKeys: EXPRESSION_VISITOR_KEYS,
    });
    return expressions;
  };
  return recurse;
}

/**
 * Get all nested new expressions in an expression like node
 * @param node The node to get the nested new expressions from
 * @returns All nested new expressions
 */
export const getNestedNewExpressions = getNestedExpressionsOfType(AST.NewExpression);

/**
 * Get all nested call expressions in a expression like node
 * @param node The node to get the nested call expressions from
 * @returns All nested call expressions
 */
export const getNestedCallExpressions = getNestedExpressionsOfType(AST.CallExpression);
