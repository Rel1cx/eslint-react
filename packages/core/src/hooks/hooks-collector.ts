import { getFunctionIdentifier, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { E } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { unsafeIsReactHookCall } from "./is-inside-react-hook-call";
import { isValidReactHookName } from "./is-valid-react-hook-name";

export function hooksCollector(context: RuleContext): {
  // manually specify the return type here to avoid @typescript-eslint/utils's TS2742 error
  ctx: {
    getAllHooks(): E.Either<Error, TSESTreeFunction[]>;
    getAllRedundantHooks(): E.Either<Error, TSESTreeFunction[]>;
    getCurrentHooks(): TSESTreeFunction[];
    getCurrentRedundantHooks(): TSESTreeFunction[];
  };
  listeners: RuleListener;
} {
  const hooks: TSESTreeFunction[] = [];

  // Hooks that are not call other hooks are redundant
  // In the realm of React, hooks are like colored functions, and defining a custom hook that doesn't call other hooks is like defining a generator function that doesn't yield or an async function that doesn't await.
  // "Custom Hooks may call other Hooks (that’s their whole purpose)." from https://react.dev/warnings/invalid-hook-call-warning
  // Further Reading: https://react.dev/learn/reusing-logic-with-custom-hooks#should-all-functions-called-during-rendering-start-with-the-use-prefix
  const redundantHooks: TSESTreeFunction[] = [];

  const functionStack: [TSESTreeFunction, boolean, boolean][] = [];
  const getCurrentFunction = () => functionStack[functionStack.length - 1];
  const onFunctionEnter = (node: TSESTreeFunction) => {
    functionStack.push([node, false, false]);
    const currentFn = getCurrentFunction();
    if (!currentFn) {
      return;
    }
    const [fn] = currentFn;
    if (isValidReactHookName(getFunctionIdentifier(fn)?.name)) {
      functionStack[functionStack.length - 1] = [fn, true, false];
    }
  };

  const onFunctionExit = () => {
    const exitedFn = functionStack.pop();
    if (!exitedFn) {
      return;
    }
    const [fn, isHook, isNotRedundant] = exitedFn;
    if (!isHook) {
      return;
    }
    hooks.push(fn);
    if (!isNotRedundant) {
      redundantHooks.push(fn);
    }
  };

  const ctx = {
    getAllHooks(): E.Either<Error, TSESTreeFunction[]> {
      if (context.getScope().block.type !== NodeType.Program) {
        return E.left(new Error("getAllHooks should only be called in Program:exit"));
      }

      return E.right(hooks);
    },
    getAllRedundantHooks(): E.Either<Error, TSESTreeFunction[]> {
      if (context.getScope().block.type !== NodeType.Program) {
        return E.left(new Error("getRedundantHooks should only be called in Program:exit"));
      }

      return E.right(redundantHooks);
    },
    getCurrentHooks() {
      return [...hooks];
    },
    getCurrentRedundantHooks() {
      return [...redundantHooks];
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

      const [fn, isHook, isNotRedundant] = currentFn;

      if (!isHook || isNotRedundant) {
        return;
      }

      if (unsafeIsReactHookCall(node)) {
        functionStack[functionStack.length - 1] = [fn, true, true];
      }
    },
  } as const satisfies RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
