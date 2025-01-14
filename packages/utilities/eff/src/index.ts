export * from "./collection";
export * from "./function";
export * from "./predicate";
export type * from "./ts";

/**
 * 1-byte version undefined, produces fewer bytes than `undefined` or `void 0` in the minified output dts.
 */
export type _ = undefined; // eslint-disable-line local/no-shadow-underscore

/**
 * 1-byte version undefined, produces fewer bytes than `undefined` or `void 0` in the minified output js.
 */
export const _ = undefined; // eslint-disable-line local/no-shadow-underscore
