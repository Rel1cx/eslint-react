// #region Meta

/**
 * The NPM scope for this project.
 */
export const NPM_SCOPE = "@eslint-react";

/**
 * The GitHub repository for this project.
 */
export const GITHUB_URL = "https://github.com/Rel1cx/eslint-react";

/**
 * The URL to the project's website.
 */
export const WEBSITE_URL = "https://eslint-react.xyz";

// #endregion

// #region RegExps

/**
 * Regular expression for matching a PascalCase string.
 */
export const RE_PASCAL_CASE = /^[A-Z][\dA-Za-z]*$/u;

/**
 * Regular expression for matching a camelCase string.
 */
export const RE_CAMEL_CASE = /^[a-z][\dA-Za-z]*$/u;

/**
 * Regular expression for matching a kebab-case string.
 */
export const RE_KEBAB_CASE = /^[a-z][\d\-a-z]*$/u;

/**
 * Regular expression for matching a snake_case string.
 */
export const RE_SNAKE_CASE = /^[a-z][\d_a-z]*$/u;

/**
 * Regular expression for matching a CONSTANT_CASE string.
 */
export const RE_CONSTANT_CASE = /^[A-Z][\d_A-Z]*$/u;

// @see https://github.com/facebook/react/blob/6db7f4209e6f32ebde298a0b7451710dd6aa3e19/packages/react-dom-bindings/src/shared/sanitizeURL.js#L22
// dprint-ignore
// eslint-disable-next-line no-control-regex
export const RE_JAVASCRIPT_PROTOCOL = /^[\u0000-\u001F ]*j[\t\n\r]*a[\t\n\r]*v[\t\n\r]*a[\t\n\r]*s[\t\n\r]*c[\t\n\r]*r[\t\n\r]*i[\t\n\r]*p[\t\n\r]*t[\t\n\r]*:/iu;

// #endregion

// #region Build-in Hooks

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

// #endregion
