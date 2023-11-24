import { getClassIdentifier, NodeType, type TSESTreeClass } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { E, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { uid } from "../helper";
import { ExRClassComponentFlag } from "./component-flag";
import { type ExRClassComponent, isClassComponent, isPureComponent } from "./component-kind";

export function componentCollectorLegacy(context: RuleContext) {
  const components = new Map<string, ExRClassComponent>();

  const ctx = {
    getAllComponents(): E.Either<Error, typeof components> {
      if (context.getScope().block.type !== NodeType.Program) {
        return E.left(new Error("getAllComponents should only be called in Program:exit"));
      }

      return E.right(components);
    },
    getCurrentComponents() {
      return new Map(components);
    },
  } as const;

  const collect = (node: TSESTreeClass) => {
    if (!isClassComponent(node, context)) {
      return;
    }

    const id = O.fromNullable(getClassIdentifier(node));
    const key = uid.rnd();
    const flag = isPureComponent(node, context)
      ? ExRClassComponentFlag.Pure
      : ExRClassComponentFlag.None;
    components.set(
      key,
      {
        _: key,
        id,
        kind: "class",
        name: O.flatMapNullable(id, n => n.name),
        // TODO: get displayName of class component
        displayName: O.none(),
        flag,
        node,
      },
    );
  };

  const listeners = {
    ClassDeclaration: collect,
    ClassExpression: collect,
  } as const satisfies ESLintUtils.RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
