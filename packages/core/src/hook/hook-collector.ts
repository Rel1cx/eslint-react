/* eslint-disable better-mutation/no-mutating-methods */
import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import ShortUniqueId from "short-unique-id";

import type { ERHook } from "./hook";
import { isReactHookName } from "./hook-name";
import { isReactHookCall } from "./is";

const uid = new ShortUniqueId({ length: 10 });

export function useHookCollector() {
  const hooks = new Map<string, ERHook>();
  const fStack: [node: AST.TSESTreeFunction, id: O.Option<string>][] = [];
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const id = AST.getFunctionIdentifier(node);
    const name = O.flatMapNullable(id, (id) => id.name);
    const isHook = O.isSome(id) && O.isSome(name) && isReactHookName(name.value);
    if (!isHook) {
      fStack.push([node, O.none()]);
      return;
    }
    const key = uid.rnd();
    fStack.push([node, O.some(key)]);
    hooks.set(key, {
      _: key,
      id,
      kind: "function",
      name,
      node,
      flag: 0n,
      hint: 0n,
      hookCalls: [],
    });
  };
  const onFunctionExit = () => {
    fStack.pop();
  };
  const ctx = {
    getAllHooks(_: TSESTree.Program): typeof hooks {
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
      if (!isReactHookCall(node)) return;
      const [fNode, hookId] = fStack.at(-1) ?? [];
      if (!fNode || !hookId) return;
      F.pipe(
        O.Do,
        O.bind("id", () => hookId),
        O.bind("hook", ({ id }) => O.fromNullable(hooks.get(id))),
        O.map(({ id, hook }) => {
          hooks.set(id, {
            ...hook,
            hookCalls: [
              ...hook.hookCalls,
              node,
            ],
          });
        }),
      );
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}
