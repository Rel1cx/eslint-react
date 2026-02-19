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

// #region RegExp

/**
 * Regular expressions for matching a HTML tag name
 */
export const RE_HTML_TAG = /^[a-z][^-]*$/u;

/**
 * Regular expression for matching a TypeScript file extension.
 */
export const RE_TS_EXT = /^[cm]?tsx?$/u;

/**
 * Regular expression for matching a JavaScript file extension.
 */
export const RE_JS_EXT = /^[cm]?jsx?$/u;

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

/**
 * Regular expression for matching a valid JavaScript identifier.
 */
export const RE_JS_IDENTIFIER = /^[_$a-z][\w$]*$/i;

/**
 * Regular expression for matching a RegExp string.
 */
export const RE_REGEXP_STR = /^\/(.+)\/([A-Za-z]*)$/u;

/**
 * Regular expression for matching a `@jsx` annotation comment.
 */
export const RE_ANNOTATION_JSX = /@jsx\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxFrag` annotation comment.
 */
export const RE_ANNOTATION_JSX_FRAG = /@jsxFrag\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxRuntime` annotation comment.
 */
export const RE_ANNOTATION_JSX_RUNTIME = /@jsxRuntime\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxImportSource` annotation comment.
 */
export const RE_ANNOTATION_JSX_IMPORT_SOURCE = /@jsxImportSource\s+(\S+)/u;

/**
 * Regular expression for matching a React component name.
 */
export const RE_COMPONENT_NAME = /^[A-Z]/u;

/**
 * Regular expression for matching a React component name (loose).
 */
export const RE_COMPONENT_NAME_LOOSE = /^_?[A-Z]/u;

/**
 * Regular expression for matching a React Hook name.
 */
export const RE_HOOK_NAME = /^use/u;

// #endregion

// #region Impurity Detection

/**
 * Known impure functions
 */
export const IMPURE_FUNCTIONS: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  [
    "Atomics",
    new Set([
      "add",
      "and",
      "compareExchange",
      "exchange",
      "load",
      "notify",
      "or",
      "store",
      "sub",
      "wait",
      "waitAsync",
      "xor",
    ]),
  ],
  [
    "caches",
    new Set([
      "delete",
      "has",
      "keys",
      "match",
      "open",
    ]),
  ],
  [
    "clipboard",
    new Set([
      "read",
      "readText",
      "write",
      "writeText",
    ]),
  ],
  [
    "console",
    new Set([
      "assert",
      "clear",
      "count",
      "countReset",
      "debug",
      "dir",
      "dirxml",
      "error",
      "group",
      "groupCollapsed",
      "groupEnd",
      "info",
      "log",
      "profile",
      "profileEnd",
      "table",
      "time",
      "timeEnd",
      "timeLog",
      "timeStamp",
      "trace",
      "warn",
    ]),
  ],
  [
    "cookieStore",
    new Set([
      "delete",
      "get",
      "getAll",
      "set",
    ]),
  ],
  [
    "crypto",
    new Set([
      "getRandomValues",
      "randomUUID",
    ]),
  ],
  ["Date", new Set(["now"])],
  [
    "document",
    new Set([
      "adoptNode",
      "append",
      "close",
      "createAttribute",
      "createAttributeNS",
      "createCDATASection",
      "createComment",
      "createDocumentFragment",
      "createDocumentType",
      "createElement",
      "createElementNS",
      "createEvent",
      "createNodeIterator",
      "createProcessingInstruction",
      "createRange",
      "createTextNode",
      "createTreeWalker",
      "elementFromPoint",
      "elementsFromPoint",
      "execCommand",
      "exitFullscreen",
      "exitPictureInPicture",
      "exitPointerLock",
      "getAnimations",
      "getElementById",
      "getElementsByClassName",
      "getElementsByName",
      "getElementsByTagName",
      "getElementsByTagNameNS",
      "getSelection",
      "hasFocus",
      "importNode",
      "open",
      "prepend",
      "querySelector",
      "querySelectorAll",
      "replaceChildren",
      "requestStorageAccess",
      "startViewTransition",
      "write",
      "writeln",
    ]),
  ],
  [
    "history",
    new Set([
      "back",
      "forward",
      "go",
      "pushState",
      "replaceState",
    ]),
  ],
  [
    "indexedDB",
    new Set([
      "databases",
      "deleteDatabase",
      "open",
    ]),
  ],
  [
    "localStorage",
    new Set([
      "clear",
      "getItem",
      "key",
      "removeItem",
      "setItem",
    ]),
  ],
  [
    "location",
    new Set([
      "assign",
      "reload",
      "replace",
    ]),
  ],
  [
    "Math",
    new Set([
      "random",
    ]),
  ],
  [
    "navigation",
    new Set([
      "back",
      "forward",
      "navigate",
      "reload",
      "traverseTo",
      "updateCurrentEntry",
    ]),
  ],
  [
    "navigator",
    new Set([
      "canShare",
      "getBattery",
      "getGamepads",
      "getUserMedia",
      "javaEnabled",
      "registerProtocolHandler",
      "requestMediaKeySystemAccess",
      "requestMIDIAccess",
      "sendBeacon",
      "share",
      "vibrate",
    ]),
  ],
  [
    "Notification",
    new Set([
      "requestPermission",
    ]),
  ],
  [
    "Object",
    new Set([
      "assign",
      "defineProperties",
      "defineProperty",
      "freeze",
      "preventExtensions",
      "seal",
      "setPrototypeOf",
    ]),
  ],
  [
    "performance",
    new Set([
      "clearMarks",
      "clearMeasures",
      "getEntries",
      "getEntriesByName",
      "getEntriesByType",
      "mark",
      "measure",
      "now",
    ]),
  ],
  [
    "process",
    new Set([
      "abort",
      "chdir",
      "cpuUsage",
      "emitWarning",
      "exit",
      "hrtime",
      "kill",
      "memoryUsage",
      "nextTick",
      "send",
      "stderr",
      "stdout",
    ]),
  ],
  [
    "Reflect",
    new Set([
      "defineProperty",
      "deleteProperty",
      "preventExtensions",
      "set",
      "setPrototypeOf",
    ]),
  ],
  [
    "scheduler",
    new Set([
      "postTask",
      "yield",
    ]),
  ],
  [
    "sessionStorage",
    new Set([
      "clear",
      "getItem",
      "key",
      "removeItem",
      "setItem",
    ]),
  ],
  [
    "URL",
    new Set([
      "createObjectURL",
      "revokeObjectURL",
    ]),
  ],
  [
    "window",
    new Set([
      "addEventListener",
      "alert",
      "blur",
      "cancelAnimationFrame",
      "cancelIdleCallback",
      "clearInterval",
      "clearTimeout",
      "close",
      "confirm",
      "dispatchEvent",
      "fetch",
      "focus",
      "getComputedStyle",
      "getSelection",
      "matchMedia",
      "moveBy",
      "moveTo",
      "open",
      "postMessage",
      "print",
      "prompt",
      "queueMicrotask",
      "removeEventListener",
      "requestAnimationFrame",
      "requestIdleCallback",
      "resizeBy",
      "resizeTo",
      "scroll",
      "scrollBy",
      "scrollTo",
      "setInterval",
      "setTimeout",
      "stop",
    ]),
  ],
]);

/**
 * Known impure global constructors used with `new`
 */
export const IMPURE_CONSTRUCTORS: ReadonlySet<string> = new Set([
  "AbortController",
  "Audio",
  "AudioContext",
  "BroadcastChannel",
  "Date",
  "EventSource",
  "FileReader",
  "Image",
  "IntersectionObserver",
  "MediaRecorder",
  "MediaSource",
  "MediaStream",
  "MessageChannel",
  "MutationObserver",
  "Notification",
  "OfflineAudioContext",
  "PerformanceObserver",
  "ReportingObserver",
  "ResizeObserver",
  "RTCPeerConnection",
  "SharedWorker",
  "WebSocket",
  "Worker",
  "XMLHttpRequest",
]);

// #endregion
