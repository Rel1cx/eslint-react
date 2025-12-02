import * as AST from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ClassComponent } from "./component-semantic-node";

import { IdGenerator } from "@eslint-react/shared";
import { ComponentFlag } from "./component-flag";
import { isClassComponent, isPureComponent } from "./component-is";

const idGen = new IdGenerator("class_component_");

export declare namespace useComponentCollectorLegacy {
  type ReturnType = {
    ctx: {
      getAllComponents: (node: TSESTree.Program) => ClassComponent[];
    };
    listeners: ESLintUtils.RuleListener;
  };
}

/**
 * Get a ctx and listeners object for the rule to collect class components
 * @returns The context and listeners for the rule
 */
export function useComponentCollectorLegacy(): useComponentCollectorLegacy.ReturnType {
  const components = new Map<string, ClassComponent>();

  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllComponents(node: TSESTree.Program) {
      return [...components.values()];
    },
  } as const;

  const collect = (node: AST.TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = AST.getClassId(node);
    const key = idGen.next();
    const flag = isPureComponent(node)
      ? ComponentFlag.PureComponent
      : ComponentFlag.None;
    components.set(
      key,
      {
        id,
        key,
        kind: "class",
        name: id?.name,
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

  const listeners = {
    "ClassDeclaration[type]": collect,
    "ClassExpression[type]": collect,
  } as const satisfies ESLintUtils.RuleListener;

  return { ctx, listeners } as const;
}
