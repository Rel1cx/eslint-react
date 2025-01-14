import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { getId } from "../utils";
import { isReactHookName } from "./hook-name";
import type { ERHook } from "./hook-semantic-node";
import { isReactHookCall } from "./is";

export function useHookCollector() {
  const hooks = new Map<string, ERHook>();
  const fEntries: { key: string | _; node: AST.TSESTreeFunction }[] = [];
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const id = AST.getFunctionIdentifier(node);
    const name = id?.name;
    if (name != null && isReactHookName(name)) {
      const key = getId();
      fEntries.push({ key, node });
      hooks.set(key, {
        id,
        key,
        kind: "function",
        name,
        node,
        flag: 0n,
        hint: 0n,
        hookCalls: [],
      });
      return;
    }
    fEntries.push({ key: _, node });
  };
  const onFunctionExit = () => {
    fEntries.pop();
  };
  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllHooks(node: TSESTree.Program): typeof hooks {
      return hooks;
    },
    getCurrentHooks() {
      return new Map(hooks);
    },
  } as const;
  const listeners = {
    ":function[type]": onFunctionEnter,
    ":function[type]:exit": onFunctionExit,
    "CallExpression[type]"(node) {
      if (!isReactHookCall(node)) {
        return;
      }
      const fEntry = fEntries.at(-1);
      if (fEntry?.key == null) {
        return;
      }
      const hook = hooks.get(fEntry.key);
      if (hook == null) {
        return;
      }
      hook.hookCalls.push(node);
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}
