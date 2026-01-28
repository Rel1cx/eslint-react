import * as AST from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import { IdGenerator, type RuleContext } from "@eslint-react/shared";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";

import { ComponentFlag } from "./component-flag";
import { isClassComponent, isPureComponent } from "./component-is";
import type { ClassComponentSemanticNode } from "./component-semantic-node";

const idGen = new IdGenerator("class_component_");

export declare namespace useComponentCollectorLegacy {
  type ReturnType = {
    ctx: {
      getAllComponents: (node: TSESTree.Program) => ClassComponentSemanticNode[];
    };
    visitor: ESLintUtils.RuleListener;
  };
}

/**
 * Get a ctx and visitor object for the rule to collect class componentss
 * @param context The ESLint rule context
 * @returns The ctx and visitor of the collector
 */
export function useComponentCollectorLegacy(context: RuleContext): useComponentCollectorLegacy.ReturnType {
  const components = new Map<string, ClassComponentSemanticNode>();

  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllComponents(node: TSESTree.Program) {
      return [...components.values()];
    },
  } as const;

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const collect = (node: AST.TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = AST.getClassId(node);
    const key = idGen.next();
    const name = id == null ? unit : AST.toStringFormat(id, getText);
    const flag = isPureComponent(node)
      ? ComponentFlag.PureComponent
      : ComponentFlag.None;
    components.set(
      key,
      {
        id,
        key,
        kind: "class",
        name,
        node,
        // TODO: Get displayName of class component
        displayName: unit,
        flag,
        hint: 0n,
        // TODO: Get methods of class component
        methods: [],
      },
    );
  };

  const visitor = {
    ClassDeclaration: collect,
    ClassExpression: collect,
  } as const satisfies ESLintUtils.RuleListener;

  return { ctx, visitor } as const;
}

/**
 * Check whether the given node is a this.setState() call
 * @param node The node to check
 * @internal
 */
export function isThisSetState(node: TSESTree.CallExpression) {
  const { callee } = node;
  return (
    callee.type === T.MemberExpression
    && AST.isThisExpressionLoose(callee.object)
    && callee.property.type === T.Identifier
    && callee.property.name === "setState"
  );
}

/**
 * Check whether the given node is an assignment to this.state
 * @param node The node to check
 * @internal
 */
export function isAssignmentToThisState(node: TSESTree.AssignmentExpression) {
  const { left } = node;
  return left.type === T.MemberExpression
    && AST.isThisExpressionLoose(left.object)
    && AST.getPropertyName(left.property) === "state";
}
