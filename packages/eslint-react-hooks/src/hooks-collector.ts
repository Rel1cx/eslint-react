import { getFunctionIdentifier, NodeType, type TSESTreeFunction } from "@eslint-react/ast";
import { E, MutRef, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { unsafeIsReactHookCall } from "./is-inside-react-hook-call";
import { isValidReactHookName } from "./is-valid-react-hook-name";

export function hooksCollector(context: RuleContext): {
    // manually specify the return type here to avoid @typescript-eslint/utils's TS2742 error
    ctx: {
        getAllHooks(): E.Either<Error, TSESTreeFunction[]>;
        getRedundantHooks(): E.Either<Error, TSESTreeFunction[]>;
        getCurrentHooks(): TSESTreeFunction[];
        getCurrentFunction(): O.Option<TSESTreeFunction>;
        getCurrentFunctionStack(): TSESTreeFunction[];
    };
    listeners: RuleListener;
} {
    const hooks: TSESTreeFunction[] = [];
    const functionStack: TSESTreeFunction[] = [];

    // hooks that are not call other hooks are redundant
    // hooks are like coloured functions in React world, defining a custom hook that doesn't call other hooks is like defining a generator function that doesn't yield or an async function that doesn't await.
    // "Custom Hooks may call other Hooks (that’s their whole purpose)." from https://react.dev/warnings/invalid-hook-call-warning
    // further reading: https://react.dev/learn/reusing-logic-with-custom-hooks#should-all-functions-called-during-rendering-start-with-the-use-prefix
    const redundantHooks: TSESTreeFunction[] = [];
    const isCurrentHookRedundant = MutRef.make(true);

    const getCurrentFunction = () => O.fromNullable(functionStack[functionStack.length - 1]);
    const onFunctionEnter = (node: TSESTreeFunction) => {
        functionStack.push(node);

        const maybeCurrentFn = getCurrentFunction();
        if (O.isNone(maybeCurrentFn)) {
            console.warn("Unexpected empty function stack");

            return;
        }

        const currentFn = maybeCurrentFn.value;
        const maybeCurrentFnId = getFunctionIdentifier(currentFn);
        const isInvalidName = !isValidReactHookName(maybeCurrentFnId?.name);
        if (isInvalidName) {
            return;
        }

        hooks.push(currentFn);
    };

    const onFunctionExit = () => {
        O.map(O.fromNullable(hooks[hooks.length - 1]), (currentHook) => {
            if (MutRef.get(isCurrentHookRedundant)) {
                redundantHooks.push(currentHook);
            }
        });

        functionStack.pop();
        MutRef.set(isCurrentHookRedundant, true);
    };

    const ctx = {
        getAllHooks(): E.Either<Error, TSESTreeFunction[]> {
            if (context.getScope().block.type !== NodeType.Program) {
                return E.left(new Error("getAllHooks should only be called in Program:exit"));
            }

            return E.right(hooks);
        },
        getRedundantHooks(): E.Either<Error, TSESTreeFunction[]> {
            if (context.getScope().block.type !== NodeType.Program) {
                return E.left(new Error("getRedundantHooks should only be called in Program:exit"));
            }

            return E.right(redundantHooks);
        },
        // eslint-disable-next-line perfectionist/sort-objects
        getCurrentHooks() {
            return [...hooks];
        },
        // eslint-disable-next-line perfectionist/sort-objects
        getCurrentFunction,
        getCurrentFunctionStack() {
            return [...functionStack];
        },
    } as const;

    const listeners = {
        ":function": onFunctionEnter,
        ":function:exit": onFunctionExit,
        CallExpression(node) {
            if (unsafeIsReactHookCall(node)) {
                MutRef.set(isCurrentHookRedundant, false);
            }
        },
    } as const satisfies RuleListener;

    return {
        ctx,
        listeners,
    } as const;
}
