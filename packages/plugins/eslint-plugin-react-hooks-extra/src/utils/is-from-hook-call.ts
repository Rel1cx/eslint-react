import * as ER from "@eslint-react/core";
import { constTrue } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/kit";
import type { ESLintReactSettingsNormalized } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export const REACT_BUILD_IN_HOOKS = [
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

export function isFromHookCall(
  context: RuleContext,
  name: (typeof REACT_BUILD_IN_HOOKS)[number],
  settings: ESLintReactSettingsNormalized,
  predicate: (topLevelId: TSESTree.Identifier, call: TSESTree.CallExpression) => boolean = constTrue,
) {
  const hookAlias = settings.additionalHooks[name] ?? [];
  // eslint-disable-next-line function/function-return-boolean
  return (topLevelId: TSESTree.Identifier) => {
    const variable = VAR.findVariable(topLevelId, context.sourceCode.getScope(topLevelId));
    const variableNode = VAR.getVariableInitNode(variable, 0);
    if (variableNode == null) return false;
    if (variableNode.type !== T.CallExpression) return false;
    if (!ER.isReactHookCallWithNameAlias(context, name, hookAlias)(variableNode)) return false;
    return predicate(topLevelId, variableNode);
  };
}
