// Vendored from the effect library (MIT), packages/effect/src/Inspectable.ts
// with its Formatter.ts dependency inlined as internal helpers; upstream
// idioms intentionally kept verbatim. Redaction support (Redactable.ts) is
// deliberately omitted: this package never inspects secret-bearing values.

/* tsl-ignore core/dotNotation */
/* tsl-ignore core/noBaseToString */
/* tsl-ignore core/noMisusedSpread */
/* tsl-ignore core/noUnnecessaryCondition */
/* tsl-ignore core/strictBooleanExpressions */
/* tsl-ignore dx/no-unsafe-as */
/* tsl-ignore dx/nullish */
/* eslint-disable
  @typescript-eslint/no-base-to-string,
  @typescript-eslint/no-explicit-any,
  @typescript-eslint/no-misused-spread,
  @typescript-eslint/no-unnecessary-condition,
  @typescript-eslint/no-unsafe-argument,
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-call,
  @typescript-eslint/no-unsafe-member-access,
  @typescript-eslint/strict-boolean-expressions,
  perfectionist/sort-classes,
  perfectionist/sort-interfaces,
  perfectionist/sort-object-types,
  perfectionist/sort-objects
*/

import { hasProperty, isFunction } from "@local/eff";

// #region Formatter (internal)

/**
 * Converts any JavaScript value into a human-readable string.
 *
 * - Output is **not** valid JSON; use `formatJson` when you need parseable JSON.
 * - Handles `BigInt`, `Symbol`, `Set`, `Map`, `Date`, `RegExp`, and class
 *   instances that `JSON.stringify` cannot represent.
 * - Circular references are shown as `"[Circular]"` instead of throwing.
 * - Failures while inspecting a value are rendered as diagnostic placeholders instead of throwing.
 * - Objects with a custom `toString` (not `Object.prototype.toString`):
 *   `toString()` is called unless `ignoreToString` is `true`.
 * - `space` — indentation unit (number of spaces, or a string like `"\t"`). Defaults to `0`.
 * - `ignoreToString` — skip calling `toString()`. Defaults to `false`.
 */
function format(input: unknown, options?: { readonly space?: number | string | undefined; readonly ignoreToString?: boolean | undefined }): string {
  const space = options?.space ?? 0;
  const ancestors = new WeakSet<object>();
  const gap = !space ? "" : (typeof space === "number" ? " ".repeat(space) : space);
  const ind = (d: number) => gap.repeat(d);

  const wrap = (v: unknown, body: string): string => {
    const ctor = (v as any)?.constructor;
    return ctor && ctor !== Object.prototype.constructor && ctor.name ? `${String(ctor.name)}(${body})` : body;
  };

  const ownKeys = (o: object): Array<PropertyKey> => {
    try {
      return Reflect.ownKeys(o);
    } catch {
      return ["[ownKeys threw]"];
    }
  };

  function recur(v: unknown, d = 0): string {
    try {
      return recurUnsafe(v, d);
    } catch {
      if ((typeof v === "object" && v !== null) || typeof v === "function") ancestors.delete(v);
      return "[inspection threw]";
    }
  }

  function recurUnsafe(v: unknown, d = 0): string {
    if (typeof v === "string") return JSON.stringify(v);

    if (typeof v === "number" || v == null || typeof v === "boolean" || typeof v === "symbol") return String(v);

    if (typeof v === "bigint") return String(v) + "n";

    if (typeof v === "object" || typeof v === "function") {
      if (ancestors.has(v)) return CIRCULAR;
      ancestors.add(v);

      let output: string;
      if (Array.isArray(v)) {
        output = !gap || v.length <= 1
          ? `[${v.map((x) => recur(x, d)).join(",")}]`
          : `[\n${ind(d + 1)}${v.map((x) => recur(x, d + 1)).join(",\n" + ind(d + 1))}\n${ind(d)}]`;
      } else if (v instanceof Date) {
        output = formatDate(v);
      } else if (
        !options?.ignoreToString
        && hasProperty(v, "toString")
        && typeof v["toString"] === "function"
        && v["toString"] !== Object.prototype.toString
        && v["toString"] !== Array.prototype.toString
      ) {
        const s = safeToString(v);
        output = v instanceof Error && v.cause !== undefined ? `${s} (cause: ${recur(v.cause, d)})` : s;
      } else if (Symbol.iterator in v) {
        output = `${v.constructor.name}(${recur(Array.from(v as any), d)})`;
      } else {
        const keys = ownKeys(v);
        if (!gap || keys.length <= 1) {
          const body = `{${keys.map((k) => `${formatPropertyKey(k)}:${recur(safeGet(v, k), d)}`).join(",")}}`;
          output = wrap(v, body);
        } else {
          const body = `{\n${keys.map((k) => `${ind(d + 1)}${formatPropertyKey(k)}: ${recur(safeGet(v, k), d + 1)}`).join(",\n")}\n${ind(d)}}`;
          output = wrap(v, body);
        }
      }
      ancestors.delete(v);
      return output;
    }

    return String(v);
  }

  return recur(input, 0);
}

const CIRCULAR = "[Circular]";

function formatPropertyKey(name: PropertyKey): string {
  return typeof name === "string" ? JSON.stringify(name) : String(name);
}

function formatDate(date: Date): string {
  try {
    return date.toISOString();
  } catch {
    return "Invalid Date";
  }
}

function safeToString(input: any): string {
  try {
    const s = input.toString();
    return typeof s === "string" ? s : String(s);
  } catch {
    return "[toString threw]";
  }
}

function safeGet(input: object, key: PropertyKey): unknown {
  try {
    return (input as any)[key];
  } catch {
    return "[property access threw]";
  }
}

/**
 * Stringifies a value to JSON safely, silently dropping circular references.
 *
 * Uses `JSON.stringify` internally with a replacer that tracks the current
 * object ancestry. Circular references are replaced with `undefined`, which
 * omits them from object output. `BigInt` values are stringified with an `n`
 * suffix. `Error` instances without a `toJSON` property include their
 * enumerable properties plus `name` and `message`.
 *
 * When the root input is `undefined`, a symbol, or a function, `formatJson`
 * returns `"null"` instead of the `undefined` returned by `JSON.stringify`.
 */
function formatJson(input: unknown, options?: { readonly space?: number | string | undefined }): string {
  const ancestors: Array<object> = [];
  return JSON.stringify(
    input,
    function(this: object, _: string, value: unknown) {
      if (typeof value === "bigint") {
        return format(value);
      }
      if (typeof value !== "object" || value === null) {
        return value;
      }
      const current = value instanceof Error && !hasProperty(value, "toJSON")
        ? { ...value, name: value.name, message: value.message }
        : value;
      while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this) {
        ancestors.pop();
      }
      if (ancestors.includes(value)) {
        return undefined; // circular reference
      }
      ancestors.push(value);
      if (current !== value) {
        ancestors.push(current);
      }
      return current;
    },
    options?.space,
  ) ?? "null";
}

// #endregion

// #region Inspectable

/**
 * Defines the symbol used by Node.js for custom object inspection.
 *
 * **Details**
 *
 * This symbol is recognized by Node.js's `util.inspect()` function and the REPL
 * for custom object representation. When an object has a method with this symbol,
 * it will be called to determine how the object should be displayed.
 *
 * @category symbols
 * @since 2.0.0
 */
export const NodeInspectSymbol = Symbol.for("nodejs.util.inspect.custom");

/**
 * The type of the Node.js inspection symbol used for custom object inspection.
 *
 * @category symbols
 * @since 2.0.0
 */
export type NodeInspectSymbol = typeof NodeInspectSymbol;

/**
 * Interface for objects that can be inspected and provide custom string representations.
 *
 * **Details**
 *
 * Objects implementing this interface can control how they appear in debugging contexts,
 * JSON serialization, and Node.js inspection. This is particularly useful for creating
 * custom data types that display meaningful information during development.
 *
 * @category models
 * @since 2.0.0
 */
export interface Inspectable {
  toString(): string;
  toJSON(): unknown;
  [NodeInspectSymbol](): unknown;
}

/**
 * Converts a value to its structured inspection representation.
 *
 * **Details**
 *
 * This function extracts data from objects that implement `toJSON`,
 * recursively processes arrays, and handles errors gracefully. Plain objects
 * are returned unchanged, so the result is not guaranteed to be accepted by
 * `JSON.stringify`; it may still contain values such as `BigInt`, functions,
 * or circular references.
 *
 * @category converting
 * @since 4.0.0
 */
export const toJson = (input: unknown): unknown => {
  try {
    if (
      hasProperty(input, "toJSON")
      && isFunction(input["toJSON"])
      && input["toJSON"].length === 0
    ) {
      return input.toJSON();
    } else if (Array.isArray(input)) {
      return input.map(toJson);
    }
    return input;
  } catch {
    return "[toJSON threw]";
  }
};

/**
 * Converts an unknown value to a string for diagnostics.
 *
 * **Details**
 *
 * Strings are returned unchanged. Objects are formatted as JSON using the
 * provided whitespace setting when possible, and values that cannot be
 * formatted are converted with `String`.
 *
 * @category converting
 * @since 2.0.0
 */
export const toStringUnknown = (u: unknown, whitespace: number | string | undefined = 2): string => {
  if (typeof u === "string") {
    return u;
  }
  try {
    return typeof u === "object" ? formatJson(u, { space: whitespace }) : format(u, { space: whitespace });
  } catch {
    return String(u);
  }
};

/**
 * A base prototype object that implements the {@link Inspectable} interface.
 *
 * **Details**
 *
 * This object provides default implementations for the {@link Inspectable} methods.
 * It can be used as a prototype for objects that want to be inspectable,
 * or as a mixin to add inspection capabilities to existing objects.
 *
 * @category prototypes
 * @since 2.0.0
 */
export const BaseProto: Inspectable = {
  toJSON() {
    return toJson(this);
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format(this.toJSON());
  },
};

/**
 * Provides an abstract base class that implements the Inspectable interface.
 *
 * **Details**
 *
 * This class provides a convenient way to create inspectable objects by extending it.
 * Subclasses only need to implement the `toJSON()` method, and they automatically
 * get proper `toString()` and Node.js inspection support.
 *
 * @category models
 * @since 2.0.0
 */
export abstract class Class {
  /**
   * Returns a JSON representation of this object.
   *
   * **Details**
   *
   * Subclasses must implement this method to define how the object
   * should be serialized for debugging and inspection purposes.
   *
   * @since 2.0.0
   */
  abstract toJSON(): unknown;
  /**
   * Node.js custom inspection method.
   *
   * @since 2.0.0
   */
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  /**
   * Returns a formatted string representation of this object.
   *
   * @since 2.0.0
   */
  toString() {
    return format(this.toJSON());
  }
}

// #endregion
