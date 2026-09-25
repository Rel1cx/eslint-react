import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Known impure functions
 */
export const IMPURE_FUNCS: ReadonlyMap<string, ReadonlySet<string>> = new Map([
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
    "globalThis",
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
      "reportError",
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
      "structuredClone",
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
      "reportError",
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
      "structuredClone",
    ]),
  ],
]);

/**
 * Known impure global constructors used with `new`
 */
export const IMPURE_CTORS: ReadonlySet<string> = new Set([
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

/**
 * Known pure functions
 */
export const PURE_FUNCS: ReadonlyMap<string, ReadonlySet<string>> = new Map([
  [
    "Array",
    new Set([
      "from",
      "isArray",
      "of",
    ]),
  ],
  [
    "Atomics",
    new Set([
      "isLockFree",
    ]),
  ],
  [
    "BigInt",
    new Set([
      "asIntN",
      "asUintN",
    ]),
  ],
  [
    "Date",
    new Set([
      "parse",
      "UTC",
    ]),
  ],
  [
    "globalThis",
    new Set([
      "atob",
      "Boolean",
      "btoa",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "escape",
      "isFinite",
      "isNaN",
      "Number",
      "parseFloat",
      "parseInt",
      "String",
      "unescape",
    ]),
  ],
  [
    "JSON",
    new Set([
      "parse",
      "stringify",
    ]),
  ],
  [
    "Math",
    new Set([
      "abs",
      "acos",
      "acosh",
      "asin",
      "asinh",
      "atan",
      "atan2",
      "atanh",
      "cbrt",
      "ceil",
      "clz32",
      "cos",
      "cosh",
      "exp",
      "expm1",
      "floor",
      "fround",
      "hypot",
      "imul",
      "log",
      "log1p",
      "log2",
      "log10",
      "max",
      "min",
      "pow",
      "round",
      "sign",
      "sin",
      "sinh",
      "sqrt",
      "tan",
      "tanh",
      "trunc",
    ]),
  ],
  [
    "Number",
    new Set([
      "isFinite",
      "isInteger",
      "isNaN",
      "isSafeInteger",
      "parseFloat",
      "parseInt",
    ]),
  ],
  [
    "Object",
    new Set([
      "entries",
      "fromEntries",
      "getOwnPropertyDescriptor",
      "getOwnPropertyDescriptors",
      "getOwnPropertyNames",
      "getOwnPropertySymbols",
      "getPrototypeOf",
      "groupBy",
      "hasOwn",
      "is",
      "isExtensible",
      "isFrozen",
      "isSealed",
      "keys",
      "values",
    ]),
  ],
  [
    "Reflect",
    new Set([
      "apply",
      "construct",
      "get",
      "getOwnPropertyDescriptor",
      "getPrototypeOf",
      "has",
      "isExtensible",
      "ownKeys",
    ]),
  ],
  [
    "String",
    new Set([
      "fromCharCode",
      "fromCodePoint",
      "raw",
    ]),
  ],
]);

/**
  Known pure global constructors used with `new`
 */
export const PURE_CTORS: ReadonlySet<string> = new Set([
  "Array",
  "ArrayBuffer",
  "BigInt64Array",
  "BigUint64Array",
  "DataView",
  "Error",
  "EvalError",
  "FinalizationRegistry",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Map",
  "RangeError",
  "ReferenceError",
  "RegExp",
  "Set",
  "SyntaxError",
  "TypeError",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "URIError",
  "URL",
  "URLSearchParams",
  "WeakMap",
  "WeakRef",
  "WeakSet",
]);

/**
 * The result of resolving an identifier or member expression to a builtin
 * global: the catalog object name plus an optional property path segment, e.g.
 * `Math.random` resolves to `{ object: "Math", property: "random" }` while
 * `Math` alone resolves to `{ object: "Math", property: null }`.
 */
export type BuiltinResolution = {
  object: string;
  property: string | null;
};

export function isCatalogObject(name: string): boolean {
  return IMPURE_FUNCS.has(name) || PURE_FUNCS.has(name);
}

/**
 * Find the property key under which `name` is bound in an object destructuring
 * pattern, e.g. `"random"` for `random` in `const { random } = Math` or for
 * `r` in `const { random: r } = Math`.
 */
function getDestructuredPropertyName(pattern: TSESTree.ObjectPattern, name: TSESTree.Identifier): string | null {
  for (const property of pattern.properties) {
    if (property.type !== AST.Property) continue;
    const target = property.value.type === AST.AssignmentPattern ? property.value.left : property.value;
    if (target !== name) continue;
    return Extract.getPropertyName(property, "max");
  }
  return null;
}

/**
 * Resolve a member expression to a builtin object name and property, e.g.
 * `window.Math.random` resolves to `{ object: "Math", property: "random" }`.
 * Intermediate segments are followed only while they name known catalog
 * objects (`window`, `Math`, ...), so unknown-global chains like
 * `foo.Math.random` do not resolve.
 */
export function resolveBuiltinMember(
  context: RuleContext,
  node: TSESTree.MemberExpression,
  seen = new Set<string>(),
): BuiltinResolution | null {
  const chain = Extract.getMemberChain(node);
  const rootId = chain.at(0);
  if (rootId == null || !Check.isIdentifier(rootId)) return null;
  const segments = chain.slice(1);
  if (segments.length === 0 || !segments.every((segment) => Check.isIdentifier(segment))) return null;
  const resolved = resolveBuiltinObjectName(context, rootId, seen);
  if (resolved == null) return null;
  let object = resolved.property ?? resolved.object;
  const names = segments.map((segment) => segment.name);
  if (isCatalogObject(object)) {
    for (const name of names.slice(0, -1)) {
      if (!isCatalogObject(name)) break;
      object = name;
    }
  }
  return { object, property: names.at(-1) ?? null };
}

/**
 * Recursively resolve an identifier to a builtin global object name and
 * optional property. Follows simple assignment chains like `const M = Math`,
 * member-function aliases like `const random = Math.random`, and destructured
 * aliases like `const { random } = Math`.
 * Returns `null` if the identifier is locally defined (parameter, import, function declaration, etc.)
 * or resolves to a non-builtin source.
 * @param context - The rule context.
 * @param node - The identifier node to resolve.
 * @param seen - A set of already visited identifier names to prevent infinite loops.
 */
export function resolveBuiltinObjectName(context: RuleContext, node: TSESTree.Identifier, seen = new Set<string>()): BuiltinResolution | null {
  if (seen.has(node.name)) return null;
  seen.add(node.name);

  const scope = context.sourceCode.getScope(node);
  const variable = findVariable(scope, node);

  // No variable found -> treat as global
  if (variable == null) return { object: node.name, property: null };

  const def = variable.defs[0];
  if (def == null) return { object: node.name, property: null }; // implicit global

  if (def.type === DefinitionType.ImplicitGlobalVariable) {
    return { object: node.name, property: null };
  }

  if (def.type === DefinitionType.Variable && def.node.init != null) {
    const init = Extract.unwrap(def.node.init);
    const resolved = Check.isIdentifier(init)
      ? resolveBuiltinObjectName(context, init, seen)
      : init.type === AST.MemberExpression
      ? resolveBuiltinMember(context, init, seen)
      : null;
    if (resolved == null) return null;
    // Destructured declarations (`const { random } = Math`) bind the pattern
    // key's property of the source object, not the source object itself.
    if (def.node.id.type === AST.ObjectPattern) {
      const key = getDestructuredPropertyName(def.node.id, def.name);
      if (key == null) return null;
      return { object: resolved.property ?? resolved.object, property: key };
    }
    // Array-pattern bindings (`const [x] = source`) are elements, not the source.
    if (def.node.id.type === AST.ArrayPattern) return null;
    return resolved;
  }

  // Other definitions (Parameter, FunctionName, ImportBinding, etc.) are not builtins
  return null;
}
