import type { TSESTreeFunction } from "@eslint-react/ast";
import { getFunctionIdentifier } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import ShortUniqueId from "short-unique-id";

import type { ERHook } from "./hook";
import { isReactHookName } from "./hook-name";
import { isReactHookCall } from "./is";

const uid = new ShortUniqueId({ length: 10 });

export function useHookCollector(): {
  // manually specify the return type here to avoid @typescript-eslint/utils's TS2742 error
  ctx: {
    getAllHooks(_: TSESTree.Program): Map<string, ERHook>;
    getCurrentHooks(): Map<string, ERHook>;
  };
  listeners: ESLintUtils.RuleListener;
} {
  const hooks = new Map<string, ERHook>();
  const functionStack: TSESTreeFunction[] = [];
  const onFunctionEnter = (node: TSESTreeFunction) => {
    functionStack.push(node);
    const currentFn = functionStack.at(-1);
    if (!currentFn) return;
    const id = getFunctionIdentifier(currentFn);
    const name = O.flatMapNullable(id, (id) => id.name);
    if (O.isSome(id) && O.isSome(name) && isReactHookName(name.value)) {
      const key = uid.rnd();
      hooks.set(key, {
        _: key,
        id,
        kind: "function",
        name,
        flag: 0n,
        hint: 0n,
        hookCalls: [],
        node: currentFn,
      });
    }
  };
  const onFunctionExit = () => {
    functionStack.pop();
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
      const currentFn = functionStack.at(-1);
      if (!currentFn) return;
      // Detect the number of other hooks called inside the current hook
      // Hooks that are not call other hooks are redundant
      // In the realm of React, hooks are like colored functions, and defining a custom hook that doesn't call other hooks is like defining a generator function that doesn't yield or an async function that doesn't await.
      // "Custom Hooks may call other Hooks (that’s their whole purpose)." from https://react.dev/warnings/invalid-hook-call-warning
      // Further Reading: https://react.dev/learn/reusing-logic-with-custom-hooks#should-all-functions-called-during-rendering-start-with-the-use-prefix
      if (isReactHookCall(node)) {
        const hook = Array
          .from(hooks.values())
          .find((hook) => hook.node === currentFn);
        if (!hook) return;
        hooks.set(hook._, {
          ...hook,
          hookCalls: [
            ...hook.hookCalls,
            node,
          ],
        });
      }
    },
  } as const satisfies ESLintUtils.RuleListener;
  return {
    ctx,
    listeners,
  } as const;
}
