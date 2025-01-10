import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { getId } from "../utils";
import type { ERClassComponent } from "./component";
import { ERClassComponentFlag } from "./component-flag";
import { isClassComponent, isPureComponent } from "./is";

export function useComponentCollectorLegacy() {
  const components = new Map<string, ERClassComponent>();

  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllComponents(node: TSESTree.Program): typeof components {
      return components;
    },
  } as const;

  const collect = (node: AST.TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = AST.getClassIdentifier(node);
    const key = getId();
    const flag = isPureComponent(node)
      ? ERClassComponentFlag.PureComponent
      : ERClassComponentFlag.None;
    components.set(
      key,
      {
        _: key,
        id,
        kind: "class",
        name: id?.name,
        node,
        // TODO: Get displayName of class component
        displayName: _,
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
