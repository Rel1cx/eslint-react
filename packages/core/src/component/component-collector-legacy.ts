import * as ast from "@eslint-react/ast";
import { IdGenerator, type RuleContext } from "@eslint-react/shared";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { isClassComponent, isPureComponent } from "./component-detection-legacy";
import { ComponentFlag } from "./component-flag";
import type { ClassComponentSemanticNode } from "./component-semantic-node";

const idGen = new IdGenerator("class-component:");

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
    getAllComponents(node: TSESTree.Program) {
      return [...components.values()];
    },
  } as const;

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const collect = (node: ast.TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = ast.getClassId(node);
    const key = idGen.next();
    const name = id == null ? null : ast.getFullyQualifiedName(id, getText);
    const flag = isPureComponent(node)
      ? ComponentFlag.PureComponent
      : ComponentFlag.None;
    components.set(
      key,
      {
        id,
        key,
        kind: "class-component",
        name,
        // TODO: Get displayName of class component
        displayName: null,
        flag,
        hint: 0n,
        // TODO: Get methods of class component
        methods: [],
        node,
      },
    );
  };

  const visitor = {
    ClassDeclaration: collect,
    ClassExpression: collect,
  } as const satisfies ESLintUtils.RuleListener;

  return { ctx, visitor } as const;
}
