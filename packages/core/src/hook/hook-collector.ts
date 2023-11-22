import { getFunctionIdentifier, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { E } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { uid } from "../helper";
import type { ExRHook } from "../types";
import { unsafeIsReactHookCall } from "./hook-call";
import { isValidReactHookName } from "./hook-name";

export function hookCollector(context: RuleContext): {
  // manually specify the return type here to avoid @typescript-eslint/utils's TS2742 error
  ctx: {
    getAllHooks(): E.Either<Error, Map<string, ExRHook>>;
    getCurrentHooks(): Map<string, ExRHook>;
  };
  listeners: ESLintUtils.RuleListener;
} {
  const hooks = new Map<string, ExRHook>();
  const functionStack: TSESTreeFunction[] = [];
  const getCurrentFunction = () => functionStack[functionStack.length - 1];
  const onFunctionEnter = (node: TSESTreeFunction) => {
    functionStack.push(node);
    const currentFn = getCurrentFunction();
    if (!currentFn) {
      return;
    }
    const id = getFunctionIdentifier(currentFn);
    const name = id?.name;
    if (name && isValidReactHookName(name)) {
      const key = uid.rnd();
      hooks.set(key, {
        _: key,
        id,
        name,
        cost: 1,
        node: currentFn,
      });
    }
  };

  const onFunctionExit = () => {
    functionStack.pop();
  };

  const ctx = {
    getAllHooks(): E.Either<Error, typeof hooks> {
      if (context.getScope().block.type !== NodeType.Program) {
        return E.left(new Error("getAllHooks should only be called in Program:exit"));
      }

      return E.right(hooks);
    },
    getCurrentHooks() {
      return new Map(hooks);
    },
  } as const;

  const listeners = {
    ":function": onFunctionEnter,
    ":function:exit": onFunctionExit,
    CallExpression(node) {
      const currentFn = getCurrentFunction();
      if (!currentFn) {
        return;
      }

      // Detect the number of other hooks called inside the current hook
      // Hooks that are not call other hooks are redundant
      // In the realm of React, hooks are like colored functions, and defining a custom hook that doesn't call other hooks is like defining a generator function that doesn't yield or an async function that doesn't await.
      // "Custom Hooks may call other Hooks (that’s their whole purpose)." from https://react.dev/warnings/invalid-hook-call-warning
      // Further Reading: https://react.dev/learn/reusing-logic-with-custom-hooks#should-all-functions-called-during-rendering-start-with-the-use-prefix
      if (unsafeIsReactHookCall(node)) {
        const hook = Array.from(hooks.values()).find((hook) => hook.node === currentFn);
        if (!hook) {
          return;
        }
        hooks.set(hook._, {
          ...hook,
          cost: hook.cost + 1,
        });
      }
    },
  } as const satisfies ESLintUtils.RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
