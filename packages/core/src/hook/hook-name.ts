export const REACT_BUILTIN_HOOK_NAMES = [
  "use",
  "useActionState",
  "useCallback",
  "useContext",
  "useDebugValue",
  "useDeferredValue",
  "useEffect",
  "useFormStatus",
  "useId",
  "useImperativeHandle",
  "useInsertionEffect",
  "useLayoutEffect",
  "useMemo",
  "useOptimistic",
  "useReducer",
  "useRef",
  "useState",
  "useSyncExternalStore",
  "useTransition",
] as const;

/**
 * Catch all identifiers that begin with "use" followed by an uppercase Latin
 * character to exclude identifiers like "user".
 * @param name The name of the identifier to check.
 * @see https://github.com/facebook/react/blob/1d6c8168db1d82713202e842df3167787ffa00ed/packages/eslint-plugin-react-hooks/src/rules/RulesOfHooks.ts#L16
 */
export function isReactHookName(name: string) {
  return name === "use" || /^use[A-Z0-9]/.test(name);
}
